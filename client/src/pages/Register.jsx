import { useNavigate, Link } from "react-router-dom";

//layout
import { Button } from "../layout/Button";
import { Input } from "../layout/Input";
import { Icon } from "../layout/Icon";

/* STORE */
import { useSelector, useDispatch } from "react-redux";
import { registerAsync } from "../state/reducers/user";

/* FONT AWESOME */
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";

function Register() {
  //user state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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

    if (data.success && isAuthenticated) {
      navigate("/");
    }
  }, [data.success, error, isAuthenticated, isLoading, navigate]);

  return (
    <section className="register">
      <div className="back-img">
        <div className="effect"></div>
      </div>
      <div className="register-details">
        <h1>
          we are <span>GO-SHOP</span>
        </h1>
        <p className="details">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum!
        </p>

        <h2> Register now!</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.set("name", name);
            formData.set("email", email);
            formData.set("password", password);
            formData.set("passwordConfirm", passwordConfirm);

            dispatch(registerAsync(formData));
          }}
          encType="multipart/form-data"
        >
          <div>
            <Icon icon={faUser} />
            <Input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="username"
            />
          </div>
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
          <div>
            <Icon icon={faLock} />
            <Input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              placeholder="confirm"
            />
          </div>
          <Button content="Register" type="submit" />
        </form>
      </div>
      <p className="to-login">
        already a user?
        <Link to="/login">
          <>Login now!</>
        </Link>
      </p>
    </section>
  );
}

export default Register;
