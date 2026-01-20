import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start ml-8">
				<Link to="/" aria-label="Home">
					<img
						width="180"
						height="60"
						src="/src/assets/logo.png"
						alt="Exhibitions"
					/>
				</Link>
			</div>
			<div className="navbar-end mr-8">
				<ul className="menu menu-horizontal px-1">
					<div className="hidden lg:flex">
						<li>
							<a className="text-lg">About</a>
						</li>
						<li>
							<a className="text-lg">Vote</a>
						</li>
					</div>
					<li>
						<details className="lg:hidden">
							<summary>
								<img src="/src/assets/menu.svg" /><a className="text-lg">Menu</a>
							</summary>
							<ul className="bg-base-100 rounded-t-none p-2">
								<li>
									<a>About</a>
								</li>
								<li>
									<a>Vote</a>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</div>
	);
}
