import React, { useState } from "react";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import InputField from "../../form/InputField";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
interface RegisterInterface {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const Register: React.FC = () => {
    const [register, setRegister] = useState<RegisterInterface>({ username: '', email: '', password: '', confirmPassword: '', });
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
            ErrorMessage("password and confirmPassword")
            return;
        }
        try {
            const { confirmPassword, ...registerData } = register;
            const response = await callAPI(apiUrls.register, {}, 'POST', registerData);
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message)
            } else {
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
                    <h2>Register</h2>
                    <div className="form-group">
                        <InputField label="username" name="username" value={register.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <InputField label="email" name="email" value={register.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <InputField label="password" name="password" value={register.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <InputField label="confirmPassword" name="confirmPassword" value={register.confirmPassword} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
