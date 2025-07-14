import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import InputField from "../../form/InputField";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { addData } from "../../../redux/Slice";
interface RegisterInterface {
  email: string;
  password: string;
}
const Register: React.FC = () => {
  const [passwordhide, setpasswordHide] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState<RegisterInterface>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.login,
        {},
        "POST",
        login
      );
      setLoader(false);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        localStorage.setItem("_id", response?.data?.data?.id);
        localStorage.setItem("accessToken", response?.data?.data?.token);
        localStorage.setItem("type", response?.data?.data?.type);
        localStorage.setItem("username", response?.data?.data?.username);
        localStorage.setItem("profile_img", response?.data?.data?.profile_img);
        if (response?.data?.data?.type === "user") {
          navigate(`/dashboard/profile/${localStorage.getItem("_id")}`);
        } else {
          navigate("/admin/DashBoard");
        }
        SuccessMessage(response?.data?.message);
      }
    } catch (err: any) {
      ErrorMessage(err.message || "Something went wrong");
      setLoader(true);
    }
  };
  return (
    <>
      {loader && <LoadScreen />}
      <div className="container-parent">
        <Link to={"/"}>
          <IoMdArrowRoundBack className="backbutton" />
        </Link>
        <div className="container-register">
          <div className="container-inner">
            <div className="icon-box">
              <img src="/src/assets/logo.png" alt="Logo" height={50} />
            </div>
            <h2>Sign In to Your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group position-relative">
                <InputField
                  label="Password"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                  required
                  type={passwordhide ? "password" : "text"}
                />
                {passwordhide ? (
                  <FaEyeLowVision
                    onClick={() => setpasswordHide(false)}
                    className="position-absolute"
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#999",
                    }}
                  />
                ) : (
                  <FaEye
                    className="position-absolute"
                    onClick={() => setpasswordHide(true)}
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
                Sign In
              </button>
            </form>
            <br />
            <button
              type="submit"
              className="button"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
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
  );
};

export default Register;
