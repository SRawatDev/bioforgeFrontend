import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
import { FaLowVision, FaEye } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import Formbutton from "../../form/Formbutton";
interface changepasswordInterface {
  password: string;
}
const Index = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
  });
  const navigate = useNavigate();
  const [changepasswordData, setchangepasswordData] =
    useState<changepasswordInterface>({ password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setchangepasswordData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.accountDelete,
        {},
        "POST",
        changepasswordData
      );
      setLoader(false);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        navigate(`/`);
        localStorage.clear();
        SuccessMessage(response?.data?.message);
      }
    } catch (err: any) {
      setLoader(true);
    }
  };

  return (
    <>
      {loader && <LoadScreen />}
      <div className="register-container gradient-form">
       

        <div className="register-row">
          <div className="register-col-left">
            <div className="register-form-wrapper">
              <div className="register-header">
                <h4 className="register-title">Delete You Bioforge Account</h4>
              </div>
              <form onSubmit={handleSubmit} className="register-form">

                <div className="register-input-wrapper">
                  <input
                    name="password"
                    value={changepasswordData.password}
                    onChange={handleChange}
                    required
                    type={showPassword.password ? "text" : "password"}
                    placeholder=""
                    className={`register-input`}
                    id="password"

                  />
                  <label htmlFor="password" className="register-label">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                    className="password-toggle"
                  >
                    {showPassword.password ? <FaEye /> : <FaLowVision />}
                  </button>
                </div>
                <div className="register-actions">
                  <Formbutton text={"Submit"} />
                </div>

                <div className="register-signin-section">
                  <div className="signin-text-wrapper">
                    <button
                      type="button"
                      onClick={() => navigate(`/dashboard/updateProfile/${localStorage.getItem("_id")}`)}
                      className="register-btn-outline"
                    >
                      Back to DashBoard
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
