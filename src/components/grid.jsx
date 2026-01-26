import { useCallback, useEffect, useState } from "react";

export default function BoothGrid(
  { boothTypes = [], rows, cols, cellSize = 64 },
) {
  const [selected, setSelected] = useState(null); // Palette selection
  const [rotation, setRotation] = useState(0); // Global rotation mode
  const [placed, setPlaced] = useState([]); // Placed booths
  const [selectedBoothId, setSelectedBoothId] = useState(null); // Selected placed booth
  const [hoverPos, setHoverPos] = useState({ x: null, y: null }); // Ghost preview

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

  // keyboard support for removing using Delete or Backspace key
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedBoothId) {
        deleteSelectedBooth();
      }
    };
    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
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
            className="rounded border px-3 py-1 text-sm hover:bg-base-content/10"
          >
            Rotate ↻ ({rotation}°)
          </button>

          <button
            type="button"
            onClick={deleteSelectedBooth}
            disabled={!selectedBoothId}
            className="rounded border px-3 py-1 text-sm text-secondary disabled:opacity-40 hover:bg-secondary/30"
          >
            Delete
          </button>
        </div>

        {/* Grid */}
        <div
          className="relative grid border border-base-content/30 rounded-md bg-base-content/5"
          onClick={() => setSelectedBoothId(null)}
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
                onClick={() => placeBooth(x, y)}
                onMouseEnter={() => setHoverPos({ x, y })}
                onMouseLeave={() => setHoverPos({ x: null, y: null })}
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
                  isSelected
                    ? "bg-primary ring-2 ring-accent"
                    : "bg-primary/80"
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
          {selected && hoverPos.x !== null && hoverPos.y !== null && (() => {
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
