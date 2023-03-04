import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../Redux/Thunks/AuthThunk";
import "../Styles/passwordModal.css";

function PasswordModal({ onClose }) {
  const [passwordObj, setPasswordObj] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hasPasswordUpdated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setPasswordObj({ ...passwordObj, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = () => {
    dispatch(updatePassword({
        newPassword: passwordObj.newPassword,
        currentPassword: passwordObj.currentPassword,
      })
    );

  };

  useEffect(() => {
    if (hasPasswordUpdated) {
        console.log('ila')
      navigate('/me');
    }
  }, [hasPasswordUpdated]);

  return createPortal(
    <div className="password-modal-container">
      <h2>Update Password</h2>
      <input
        type="password"
        name="currentPassword"
        className="currentpassword-input"
        value={passwordObj.currentPassword}
        placeholder="Please enter your current password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="newPassword"
        className="newpassword-input"
        value={passwordObj.newPassword}
        placeholder="Please enter new password"
        onChange={handleChange}
      />
      <div className="password-setting-action-bar flex ">
        <button className="updatePassword btn" onClick={handleUpdatePassword}>
          Update Password
        </button>
        <button className="cancel btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById("root-modal")
  );
}
export default PasswordModal;
