import { Link } from "react-router-dom";

const Navbar = () => (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/others">Others</Link></li>
      </ul>
    </nav>
  );


export default Navbar;