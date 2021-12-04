import React from "react";

export const ModalPassword = () => {
  
  return (
          <form className="form-edit-password">

            <div>
                <div className="form-edit-element">
                    <label htmlFor="password">Obecne hasło:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div className="form-edit-element">
                    <label htmlFor="new_password">Nowe hasło:</label>
                    <input type="password" id="new_password" name="new_password" />
                </div>
                <div className="form-edit-element">
                    <label htmlFor="confirm_new_password">Powtórz nowe hasło:</label>
                    <input type="password" id="confirm_new_password" name="confirm_new_password" />
                </div>
            </div>
              
              <button type="submit" className="form-edit-button btn">Zapisz</button>
          </form>
  )
};