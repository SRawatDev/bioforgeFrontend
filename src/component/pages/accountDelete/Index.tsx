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
      ErrorMessage(err.message || "Something went wrong");
      setLoader(true);
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
              <img src="/assets/logo.png" alt="Logo" height={50} />
            </div>
            <h2>Account Delete</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group position-relative">
                <InputField
                  label="Password"
                  name="password"
                  value={changepasswordData.password}
                  onChange={handleChange}
                  required
                  type={showPassword.password ? "text" : "password"}
                />
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

              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="container-image">
          <img
            src="/assets/original-a6dd915f7cf81ea73976dfc1bb4ecd50.webp"
            className="blurimage"
            alt="Side Visual"
          />
        </div>
      </div>
    </>
  );
};

export default Index;
