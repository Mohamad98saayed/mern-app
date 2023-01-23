import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../layout/Button";
import { Input } from "../layout/Input";

import {
  updateAvatarAsync,
  updateDetailsAsync,
  updatePasswordAsync,
  deactivateAccountAsync,
} from "../state/reducers/user";

const Profile = () => {
  const { error, errorMessage, isLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user.currentUser);

  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();

  const userDetailsForm = document.querySelector(".userDetailsModal");
  const userPasswordForm = document.querySelector(".userPasswordModal");
  const overlay = document.querySelector(".overlay");

  // add modal
  const showModal = (className) => {
    document.querySelector(className).classList.remove("hide-modal");
    document.querySelector(className).classList.add("show-modal");
    document.querySelector(".overlay").classList.add("show-overlay");
  };

  const hideModal = (className) => {
    document.querySelector(className).classList.add("hide-modal");
    document.querySelector(className).classList.remove("show-modal");
    document.querySelector(".overlay").classList.remove("show-overlay");
  };

  useEffect(() => {
    if (isLoading) {
      console.log("Loading");
    }

    if (error) {
      console.log(errorMessage);
    }

    if (img) {
      dispatch(updateAvatarAsync({ avatar: img }));
      setImg("");
    }
  }, [dispatch, error, errorMessage, img, isLoading]);

  return (
    <section className="profile">
      <div className="overlay"></div>
      <div className="profile-container">
        {user && (
          <>
            <div className="user-avatar">
              <img alt="user profile" src={user.avatar.url} />
              <div>
                Change Profile?
                <input
                  accept="image/png, image/jpeg, image/jpg"
                  type="file"
                  onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setImg(reader.result);
                      }
                    };
                    reader.onerror = (err) => console.log(err);
                    reader.readAsDataURL(e.target.files[0]);
                  }}
                />
              </div>
            </div>

            <hr />
            <div className="user-details">
              <div>
                <p>
                  <span>name:</span> {user.name}
                </p>
                <p>
                  <span>name:</span> {user.email}
                </p>
              </div>
              <p
                className="update-details-button"
                onClick={() => showModal(".userDetailsModal")}
              >
                Update your details ?
              </p>
            </div>

            <div className="modal hide-modal userDetailsModal">
              <p onClick={() => hideModal(".userDetailsModal")}>X</p>

              <Input
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                content="Save Changes"
                type="button"
                onClick={(e) => {
                  dispatch(
                    updateDetailsAsync({
                      name: name ? name : user.name,
                      email: email ? email : user.email,
                    })
                  );

                  hideModal(".userDetailsModal");
                }}
              />
            </div>

            <hr />

            <div className="change-password-btn">
              <p onClick={() => showModal(".userPasswordModal")}>
                Change your password?
              </p>
            </div>

            <div className="modal hide-modal userPasswordModal">
              <p onClick={() => hideModal(".userPasswordModal")}>X</p>
              <Input
                type="password"
                placeholder="old password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password confirm"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />

              <Button
                content="Save Changes"
                type="button"
                onClick={(e) => {
                  dispatch(
                    updatePasswordAsync({
                      oldPassword,
                      newPassword,
                      passwordConfirm,
                    })
                  );

                  hideModal(".userPasswordModal");
                }}
              />
            </div>
          </>
        )}
      </div>
      <p
        className="deactivation"
        onClick={() => dispatch(deactivateAccountAsync())}
      >
        Deactivate My Account?
      </p>
    </section>
  );
};

export default Profile;
