import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import InputField from "../../form/InputField";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
import { FaEyeLowVision, FaEye } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
interface changepasswordInterface {
  oldPassword: string,
  newPassword: string
}
const Index = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate()
  const [changepasswordData, setchangepasswordData] = useState<changepasswordInterface>({ oldPassword: '', newPassword: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setchangepasswordData((pre) => ({ ...pre, [name]: value }))

  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true)
    try {
      const response = await callAPI(apiUrls.changePassword, {}, 'POST', changepasswordData);
      setLoader(false)
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message)
      } else {
        navigate(`/profile/${localStorage.getItem("_id")}`)
        SuccessMessage(response?.data?.message)
      }
    } catch (err: any) {
      ErrorMessage(err.message || "Something went wrong");
      setLoader(true)
    }
  };
  return (
    <>
      {loader && <LoadScreen />}
      <div className="container-parent" style={{ minHeight: "unset" }}>
        <Link to={`/dashboard/profile/${localStorage.getItem("_id")}`}>
          <IoMdArrowRoundBack className="backbutton" />
        </Link>
        <div className="container-register">
          <div className="container-inner">
            <div className="icon-box">
              <img src="/src/assets/logo.png" alt="Logo" height={50} />
            </div>
            <h2>Change you password</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group position-relative">
                <InputField label="Old Password" name="oldPassword" value={changepasswordData.oldPassword} onChange={handleChange} required type={showPassword.password ? "text" : "password"} />
                {showPassword.password ? (
                  <FaEye
                    className="position-absolute"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        password: false,
                      }))
                    }
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#999",
                    }}
                  />
                ) : (
                  <FaEyeLowVision
                    className="position-absolute"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        password: true,
                      }))
                    }
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#999",
                    }}
                  />
                )}
              </div>
              <div className="form-group position-relative">
                <InputField label="New Password" name="newPassword" value={changepasswordData.newPassword} onChange={handleChange} required type={showPassword.confirmPassword ? "text" : "password"} />
                {showPassword.confirmPassword ? (
                  <FaEye
                    className="position-absolute"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmPassword: false,
                      }))
                    }
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#999",
                    }}
                  />
                ) : (
                  <FaEyeLowVision
                    className="position-absolute"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmPassword: true,
                      }))
                    }
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#999",
                    }}
                  />
                )}
              </div>
              <button type="submit" className="button">
                Submit
              </button>

            </form>
          </div>
        </div>
        <div className="container-image">
          <img
            src="/src/assets/original-a6dd915f7cf81ea73976dfc1bb4ecd50.webp"
            className="blurimage"
            alt="Side Visual"
          />
        </div>
      </div>
    </>
  )
}

export default Index