import logo from "../assets/images/logo.png";

import { useNavigate, Link } from "react-router-dom";
import { faAngleDown, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";

import { logoutAsync } from "../state/reducers/user";

import { Icon } from "./Icon";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  return (
    <nav>
      <img onClick={() => navigate("/")} alt="logo" src={logo} width="150px" />

      <ul>
        <Link to="/">home</Link>
        <Link to="/featured">featured</Link>
        <Link to="/goods">goods</Link>
        <Link to="/contact">contact</Link>
      </ul>

      <div className="nav-right">
        <div className="shoping-cart">
          <Icon
            onClick={() => navigate("/shopping-card")}
            cursor="pointer"
            icon={faCartShopping}
          />
          <p>2</p>
        </div>

        <div className="drop-down">
          <Icon className="drop-down-btn" icon={faAngleDown} />

          <div className="drop-down-content">
            {isAuthenticated ? (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/orders">Orders</Link>
                {currentUser.user.role === "admin" && (
                  <Link to="/dashboard">Dashboard</Link>
                )}
                <Link onClick={() => dispatch(logoutAsync())}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
