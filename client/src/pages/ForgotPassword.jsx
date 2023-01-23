import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { forgotPasswordAsync } from "../state/reducers/user";

/* FONT AWESOME */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, data } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoading) {
      console.log("loading");
    }

    if (error) {
      console.log(error);
    }

    if (data.message) {
      navigate(`/reset-password/${data.message}`);
    }
  }, [data, error, isLoading, navigate]);

  return (
    <section className="forgot-password">
      <div>
        <FontAwesomeIcon icon={faEnvelope} />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
      </div>
      <button
        onClick={() => {
          dispatch(forgotPasswordAsync({ email }));
        }}
      >
        Reset Password <FontAwesomeIcon icon={faRightToBracket} />
      </button>
    </section>
  );
};
