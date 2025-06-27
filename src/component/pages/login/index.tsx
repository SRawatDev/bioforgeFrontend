import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import InputField from "../../form/InputField";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
interface RegisterInterface {
    email: string;
    password: string;
}
const Register: React.FC = () => {
    const navigate = useNavigate()
    const [register, setRegister] = useState<RegisterInterface>({ email: '', password: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegister((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await callAPI(apiUrls.login, {}, 'POST', register);
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message)
            } else {
                navigate("/login")
                SuccessMessage(response?.data?.message)
            }
        } catch (err: any) {
            ErrorMessage(err.message || "Something went wrong");
        }
    };
    return (
        <div className="container">
            <div className="icon-box">
                <img src="/src/assets/logo.png" alt="Logo" height={150} />
            </div>
            <h2>Sign In to Your Account</h2>
            <p>Access your account to continue</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <InputField label="email" name="email" value={register.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <InputField label="password" name="password" value={register.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="button">
                    Sign In
                </button>
                <br /><br />
                <button type="submit" className="button" onClick={() => navigate("/register")}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;
