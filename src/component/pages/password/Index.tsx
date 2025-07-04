import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callAPI, callAPIWithoutAuth } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import InputField from "../../form/InputField";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
interface changepasswordInterface {
  oldPassword: string,
  newPassword: string
}
const Index = () => {
  const [loader, setLoader] = useState<boolean>(false)
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
        <div className="container-register">
          <div className="icon-box">
            <img src="/src/assets/logo.png" alt="Logo" height={50} />
          </div>
          <h2>Change you password</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <InputField label="Old Password" name="oldPassword" value={changepasswordData.oldPassword} onChange={handleChange} required type="password" />
            </div>
            <div className="form-group">
              <InputField label="New Password" name="newPassword" value={changepasswordData.newPassword} onChange={handleChange} required type="password" />
            </div>
            <button type="submit" className="button">
              Submit
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default Index