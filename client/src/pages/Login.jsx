import { useState, useEffect } from "react";

//layout
import { Button } from "../layout/Button";
import { Input } from "../layout/Input";
import { Icon } from "../layout/Icon";

import { Link, useNavigate } from "react-router-dom";

/* STORE */
import { useSelector, useDispatch } from "react-redux";
import { loginAsync } from "../state/reducers/user";

/* FONT AWESOME */
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, isAuthenticated, data } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isLoading) {
      console.log("loading");
    }

    if (error) {
      console.log(error);
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [data, error, isAuthenticated, isLoading, navigate]);

  return (
    <div className="login">
      <div className="back-img">
        <div className="effect"></div>
      </div>
      <div className="login-details">
        <h1>
          we are <span>GO-SHOP</span>
        </h1>
        <p className="details">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum!
        </p>
        <h2> Login now!</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.set("email", email);
            formData.set("password", password);

            dispatch(loginAsync(formData));
          }}
          encType="multipart/form-data"
        >
          <div>
            <Icon icon={faEnvelope} />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
          </div>
          <div>
            <Icon icon={faLock} />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </div>
          <p
            onClick={() => navigate("/forgot-password")}
            className="forgot-password-btn"
          >
            Forgot Password?
          </p>
          <Button content="Login" type="submit" />
        </form>
      </div>

      <p className="to-register">
        not a user yet?
        <Link to="/register">
          <>Register now!</>
        </Link>
      </p>
    </div>
  );
}

export default Login;
