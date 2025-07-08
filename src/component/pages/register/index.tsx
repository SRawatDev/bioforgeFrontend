import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import InputField from "../../form/InputField";
import { apiUrls } from "../../../utils/api.utils";
import { IoMdArrowRoundBack } from "react-icons/io";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
import { Link } from "react-router-dom";
import { FaEyeLowVision, FaEye } from "react-icons/fa6";

interface RegisterInterface {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(false);

    const [register, setRegister] = useState<RegisterInterface>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegister((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (register.password !== register.confirmPassword) {
            ErrorMessage("Password and Confirm Password do not match");
            return;
        }

        setLoader(true);
        try {
            const { confirmPassword, ...registerData } = register;
            const response = await callAPIWithoutAuth(
                apiUrls.register,
                {},
                "POST",
                registerData
            );
            setLoader(false);
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message);
            } else {
                setRegister({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                SuccessMessage(response?.data?.message);
                navigate("/login");
            }
        } catch (err: any) {
            setLoader(false);
            ErrorMessage(err.message || "Something went wrong");
        }
    };

    return (
        <>
            {loader && <LoadScreen />}
            <div className="container-parent">
                <Link to={"/login"}>
                    <IoMdArrowRoundBack className="backbutton" />
                </Link>
                <div className="container-register">
                    <div className="container-inner">
                        <div className="icon-box">
                            <img src="/src/assets/logo.png" alt="Logo" height={50} />
                        </div>
                        <h2>Sign Up to Your Account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <InputField
                                    label="Username"
                                    name="username"
                                    value={register.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <InputField
                                    label="Email"
                                    name="email"
                                    value={register.email}
                                    type="email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="form-group position-relative">
                                <InputField
                                    label="Password"
                                    name="password"
                                    type={showPassword.password ? "text" : "password"}
                                    value={register.password}
                                    onChange={handleChange}
                                    required
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

                            {/* Confirm Password */}
                            <div className="form-group position-relative">
                                <InputField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={showPassword.confirmPassword ? "text" : "password"}
                                    value={register.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
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

                            <button type="submit" className="btn btn-primary button">
                                Sign Up
                            </button>
                        </form>
                    </div>

                </div>
                <div className="container-image">
                    <img
                        src="/src/assets/original-a6dd915f7cf81ea73976dfc1bb4ecd50.webp"
                        alt="Side Visual"
                    />
                </div>
            </div>
        </>
    );
};

export default Register;
