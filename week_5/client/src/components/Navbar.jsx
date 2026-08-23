import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ShopSphere
      </Link>
      <div className="developer-name">Abdul Samad</div>
    </nav>
  );
}

export default Navbar;
