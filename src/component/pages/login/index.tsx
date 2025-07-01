import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import InputField from "../../form/InputField";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
interface RegisterInterface {
    email: string;
    password: string;
}
const Register: React.FC = () => {
    const [loader, setLoader] = useState<boolean>(false)
    const navigate = useNavigate()
    const [login, setLogin] = useState<RegisterInterface>({ email: '', password: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true)
        try {
            const response = await callAPIWithoutAuth(apiUrls.login, {}, 'POST', login);
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message)
                setLoader(true)
            } else {
                localStorage.setItem("_id", response?.data?.data?.id)
                localStorage.setItem("accessToken", response?.data?.data?.token)
                navigate("/")
                setLoader(false)
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
            <div className="container-parent">
                <div className="container-register">
                    <div className="icon-box">
                        <img src="/src/assets/logo.png" alt="Logo" height={50} />
                    </div>
                    <h2>Sign In to Your Account</h2>
                    <p>Access your account to continue</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <InputField label="Email" name="email" value={login.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <InputField label="Password" name="password" value={login.password} onChange={handleChange} required type="password" />
                        </div>
                        <button type="submit" className="button">
                            Sign In
                        </button>
       
                        <button type="submit" className="button" onClick={() => navigate("/register")}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
