import React, { useState } from "react";
import "./Popup.css"

const Popup = ({ close }) => {
  const [popup] = useState(false);
  const inactive = "popup__register";
  const active = "popup__register_opened";

  return (
    <>
      <div className={popup ? active : inactive}>
        <div
          className="auth__popup_register_container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup__register_container-wrapper">
            <div className="auth__popup_register-wrapp_fixed">
              <div className="auth__popup_register-wrapper">
                <div className="auth__popup_wrapp-wrapper">
                  <button
                    type="button"
                    className="popup__button-close"
                    onClick={() => close(false)}
                  />
                </div>
                <h3>В данный момент, оплата не доступна</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;