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
        <div className="parent-register-container">
            <div className="logo-image">
                <img src="/src/assets/logo.png" alt="Logo" height={150} />
            </div>
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <InputField label="email" name="email" value={register.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <InputField label="password" name="password" value={register.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="register-button"> login</button>
                    <br /><br />
                    <button type="submit" className="register-button" onClick={() => navigate("/register")}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
