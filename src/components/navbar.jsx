import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Menu from "../assets/menu.svg";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start md:pl-4 lg:pl-24 xl:pl-72">
        <Link to="/" aria-label="Home">
          <img
            width="210"
            height="70"
            src={Logo}
            alt="Exhibitions"
          />
        </Link>
      </div>
      <div className="navbar-end md:pr-4 lg:pr-24 xl:pr-72">
        <ul className="menu menu-horizontal px-1">
          <div className="hidden lg:flex">
            <li>
              <Link to="/" aria-label="Home" className="text-lg">About</Link>
            </li>
            <li>
              <Link to="/vote" aria-label="Vote" className="text-lg">Vote</Link>
            </li>
            <li>
              <Link to="/faq" aria-label="FAQ" className="text-lg">FAQ</Link>
            </li>
          </div>
          <li>
            <details className="lg:hidden">
              <summary>
                <img src={Menu} />
                <a className="text-lg">Menu</a>
              </summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <Link to="/" aria-label="Home" className="text-lg">About</Link>
                </li>
                <li>
                  <Link to="/vote" aria-label="Vote" className="text-lg">Vote</Link>
                </li>
                <li>
                  <Link to="/faq" aria-label="FAQ" className="text-lg">FAQ</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
