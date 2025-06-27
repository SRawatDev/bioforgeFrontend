import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import InputField from "../../form/InputField";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
interface RegisterInterface {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const Register: React.FC = () => {
    const [loader, setLoader] = useState<boolean>(false)
    const navigate = useNavigate()
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
                setLoader(true)
                navigate("/login")
                SuccessMessage(response?.data?.message)
            }
        } catch (err: any) {
            setLoader(false)
            ErrorMessage(err.message || "Something went wrong");
        }
    };
    return (
        <> {loader && <LoadScreen />}
            <div className="container-parent">
                <div className="container-register">
                    <div className="icon-box">
                        <img src="/src/assets/logo.png" alt="Logo" height={150} />
                    </div>
                    <h2>Sign Up to Your Account</h2>
                    <p>Access your account to continue</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <InputField label="Username" name="username" value={register.username} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <InputField label="Email" name="email" value={register.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <InputField label="Password" name="password" value={register.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <InputField label="Confirm Password" name="confirmPassword" value={register.confirmPassword} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary button">
                            Sign Up
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
