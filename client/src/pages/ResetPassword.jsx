import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

/* STORE */
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordAsync } from "../state/reducers/user";

/* FONT AWESOME */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export const ResetPassword = () => {
  //user state
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const { data } = useSelector((state) => state.user);

  return (
    <section className="reset-password">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.set("password", password);
          formData.set("passwordConfirm", passwordConfirm);
          try {
            dispatch(resetPasswordAsync(formData, params.token));
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        }}
        encType="multipart/form-data"
      >
        <div>
          <FontAwesomeIcon icon={faLock} />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faLock} />
          <input
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password"
            placeholder="confirm"
          />
        </div>
        <button>
          reset <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      </form>
    </section>
  );
};
