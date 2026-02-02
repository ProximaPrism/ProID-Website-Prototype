import { useCallback, useEffect, useState } from "react";

export default function BoothGrid(
  { boothTypes = [], rows, cols, cellSize = 64 },
) {
  const [selected, setSelected] = useState(null); // booth selection
  const [rotation, setRotation] = useState(0); // global rotation mode
  const [placed, setPlaced] = useState([]); // placed booths
  const [selectedBoothId, setSelectedBoothId] = useState(null); // selected placed booth
  const [hoverPos, setHoverPos] = useState(null); // hover preview

  // global rotation state
  const rotateGlobal = () => setRotation((r) => (r === 0 ? 90 : 0));

  // get size after rotation
  const getSize = (type, rot) => {
    const [w, h] = type.size;
    return rot === 0 ? [w, h] : [h, w];
  };

  const overlaps = (a, b) => {
    return !(
      a.x + a.w <= b.x ||
      a.x >= b.x + b.w ||
      a.y + a.h <= b.y ||
      a.y >= b.y + b.h
    );
  };

  const canPlace = (type, x, y, rot) => {
    const [w, h] = getSize(type, rot);
    if (x < 0 || y < 0 || x + w > cols || y + h > rows) return false;

    return !placed.some((p) => {
      const [pw, ph] = getSize(p.type, p.rotation);
      return overlaps({ x, y, w, h }, { x: p.x, y: p.y, w: pw, h: ph });
    });
  };

  const placeBooth = (x, y) => {
    if (!selected) return;
    if (!canPlace(selected, x, y, rotation)) return;

    setPlaced((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        type: selected,
        x,
        y,
        rotation,
      },
    ]);

    setSelectedBoothId(null); // clear selection after placement
  };

  const deleteSelectedBooth = useCallback(() => {
    if (!selectedBoothId) return;
    setPlaced((p) => p.filter((b) => b.id !== selectedBoothId));
    setSelectedBoothId(null);
  }, [selectedBoothId]);

  // keyboard inputs
  useEffect(() => {
    const onKeyDown = (keyboard) => {
      if ((keyboard.key === "r" || keyboard.key === "R")) {
        rotateGlobal();
      }
      if (
        (keyboard.key === "Delete" || keyboard.key === "Backspace") &&
        selectedBoothId
      ) {
        deleteSelectedBooth();
      }
    };

    self.addEventListener("keydown", onKeyDown);
    return () => self.removeEventListener("keydown", onKeyDown);
  }, [selectedBoothId, deleteSelectedBooth]);

  return (
    <div className="flex gap-6">
      {/* Palette */}
      <div className="flex flex-col w-72">
        <h1 className="text-2xl font-semibold mb-3 pl-3">Booth Types</h1>
        <aside className="space-y-3 h-[50vh] overflow-y-auto border-r border-neutral/30 p-3 pr-5">
          {boothTypes.map((bt) => {
            const [w, h] = bt.size;
            return (
              <button
                type="button"
                key={bt.name}
                onClick={() => setSelected(bt)}
                className={`w-full rounded border p-3 text-left ${
                  selected?.name === bt.name
                    ? "border-accent bg-accent/20"
                    : "border-base-content/30 hover:bg-base-content/10"
                }`}
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <div className="font-medium">{bt.name}</div>
                    <div className="text-sm text-base-content/70">
                      {bt.desc}
                    </div>
                  </div>

                  {/* Size preview */}
                  <div
                    className="grid gap-0.5"
                    style={{
                      gridTemplateColumns: `repeat(${w}, 8px)`,
                      gridTemplateRows: `repeat(${h}, 8px)`,
                    }}
                  >
                    {Array.from({ length: w * h }).map((_, i) => (
                      <div
                        key={i}
                        className="h-2 w-2 rounded-sm bg-primary"
                      />
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </aside>
      </div>
      {/* Main grid area */}
      <div className="flex flex-col">
        {/* Controls */}
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={rotateGlobal}
            aria-pressed={rotation === 90}
            className={`btn px-6 py-1 text-lg transition ${
              rotation === 90
                ? "bg-base-content border-base-100 ring-1 ring-base-content text-base-100 hover:bg-base-content/90 "
                : "border-base-content hover:bg-base-content/10"
            }`}
          >
            {rotation === 90 ? "Rotate  ↻" : "Rotate  ↺"}
          </button>

          <button
            type="button"
            onClick={deleteSelectedBooth}
            disabled={!selectedBoothId}
            className="btn border-secondary text-secondary bg-secondary-content px-6 py-1 text-md text-lg disabled:opacity-40 hover:bg-secondary/30"
          >
            Delete
          </button>
        </div>

        {/* Grid */}
        <div
          className="relative grid border border-base-content/30 rounded-md bg-base-content/5"
          onClick={() => setSelectedBoothId(null)}
          onMouseMove={(pos) => {
            const rect = pos.currentTarget.getBoundingClientRect();
            const x = Math.floor((pos.clientX - rect.left) / cellSize);
            const y = Math.floor((pos.clientY - rect.top) / cellSize);

            if (x >= 0 && x < cols && y >= 0 && y < rows) {
              setHoverPos({ x, y });
            } else {
              setHoverPos(null);
            }
          }}
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          }}
        >
          {/* Grid cells */}
          {Array.from({ length: rows * cols }).map((_, i) => {
            const x = i % cols;
            const y = Math.floor(i / cols);

            return (
              <div
                key={i}
                onClick={(pos) => {
                  pos.stopPropagation();
                  placeBooth(x, y);
                }}
                className="border border-base-content/10 hover:bg-base-content/15 cursor-pointer"
              />
            );
          })}

          {/* Placed booths */}
          {placed.map((b) => {
            const [w, h] = getSize(b.type, b.rotation);
            const isSelected = b.id === selectedBoothId;

            return (
              <div
                key={b.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBoothId(b.id);
                }}
                className={`absolute rounded p-2 text-base-100 shadow cursor-pointer ${
                  isSelected ? "bg-primary ring-2 ring-accent" : "bg-primary/80"
                }`}
                style={{
                  left: b.x * cellSize,
                  top: b.y * cellSize,
                  width: w * cellSize,
                  height: h * cellSize,
                }}
              >
                <div className="text-sm font-semibold leading-tight">
                  {b.type.name}
                </div>
              </div>
            );
          })}

          {/* Ghost preview */}
          {selected && hoverPos && (() => {
            const [w, h] = getSize(selected, rotation);
            const canPlaceHere = canPlace(
              selected,
              hoverPos.x,
              hoverPos.y,
              rotation,
            );

            return (
              <div
                className="absolute rounded pointer-events-none"
                style={{
                  left: hoverPos.x * cellSize,
                  top: hoverPos.y * cellSize,
                  width: w * cellSize,
                  height: h * cellSize,
                  backgroundColor: canPlaceHere
                    ? "rgba(59,130,246,0.25)" // valid placement
                    : "rgba(107,114,128,0.25)", // blocked
                }}
              />
            );
          })()}
        </div>
      </div>
    </div>
  );
}
