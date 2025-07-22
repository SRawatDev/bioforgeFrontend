import React, { useEffect, useState } from "react";
import { API, callAPI, callAPIWithoutAuth } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import { FaEdit } from "react-icons/fa";
import {  useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { defaultConfig } from "../../../config";
import LoadScreen from "../../loaderScreen";
import SuccessMessage from "../../../helpers/Success";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
const fontOptions = [
  "Times New Roman",
  "Georgia",
  "Verdana",
  "math",
  "monospace",
  "Montserrat",
  "Playfair Display",
  "Source Sans Pro",
  "cursive",
];
interface Theme {
  themeType: string;
  fontFamily: string;
  is_colorImage: string;
  fontColor: string;
}
interface UserInfo {
  _id: string;
  username: string;
  email: string;
  bio: string;
  banner_img: string;
  profile_img: string;
  theme: Theme;
}
interface Props {
  getUserDetails: () => void;
}

const Main: React.FC<Props> = ({ getUserDetails }) => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      if (!prev) return prev;
      if (
        ["themeType", "fontFamily", "is_colorImage", "fontColor"].includes(name)
      ) {
        return {
          ...prev,
          theme: {
            ...prev.theme,
            [name]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const getUserDetail = async () => {
    setLoader(true);
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getUserInfo,
        { _id: id },
        "GET",
        {}
      );
      setLoader(false);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        const user = response?.data?.data[0];
        setUserInfo(user);

        setPreviewProfile(user.profile_img || null);
        setPreviewBanner(user.banner_img || null);
      }
    } catch (err: any) {
      setLoader(true);
      ErrorMessage(err.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (id) {
      getUserDetail();

    }
  }, [id]);
  const UploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await getUserDetails()
    try {
      setLoader(true);
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];
      const formData = new FormData();
      formData.append("tempImage", file);
      const apiResponse = await API(apiUrls.upload, {}, "POST", formData);
      setLoader(false);
      if (apiResponse.data.status) {
        const uploadedUrl = apiResponse.data.data;
        setUserInfo((prev) => ({ ...prev!, profile_img: uploadedUrl }));
        setPreviewProfile(uploadedUrl);
        e.target.value = "";
      } else {
        ErrorMessage(apiResponse?.data?.message);
      }
    } catch (err) {
      setLoader(true);
      ErrorMessage("Profile image upload failed");
    }
  };
  const UploadBannerImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoader(true);
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];
      const formData = new FormData();
      formData.append("tempImage", file);
      const apiResponse = await API(apiUrls.upload, {}, "POST", formData);
      setLoader(false);
      if (apiResponse.data.status) {
        const uploadedUrl = apiResponse.data.data;
        setUserInfo((prev) => ({ ...prev!, banner_img: uploadedUrl }));
        setPreviewBanner(uploadedUrl);
        e.target.value = "";
      } else {
        ErrorMessage(apiResponse?.data?.message);
      }
    } catch (err) {
      console.error("Error uploading banner image:", err);
      ErrorMessage("Banner image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.updateProfile,
        {},
        "POST",
        userInfo || {}
      );
      setLoader(false);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        localStorage.setItem("profile_img", userInfo?.profile_img || "");
        SuccessMessage(response?.data?.message);
      }
    } catch (err: any) {
      setLoader(true);
      ErrorMessage(err.message || "Something went wrong");
    }
  };
  return (
    <>
      {loader && <LoadScreen />}
      <main id="main-content" className="d-flex flex-column">
        <header id="top-bar" role="banner" aria-label="Page header">
          <h2>My Bioforge</h2>
          <div className="d-flex gap-2">
            <i className="bi bi-share" />
            <Link
              type="button"
              className="btn btn-share"
              aria-label="Share button"
              to={`/profile/${localStorage.getItem(
                "_id"
              )}`}
              
            >
              Share
            </Link>

            <button
              type="button"
              className="btn btn-link"
              aria-label="Settings"
            >
              <i className="bi bi-gear" />
            </button>
          </div>
        </header>
        <section id="profile-section" aria-label="User profile">
          <div id="profile-left" className="w-100">
            <div className="profile-picture1">
              <div className="profile-width">
                {previewProfile && (
                  <img
                    id="profileImageedit"
                    src={defaultConfig.imagePath + previewProfile}
                    alt="Profile Photo"
                  />
                )}
                <input
                  id="profileUploadInput"
                  type="file"
                  name="profile_img"
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={UploadProfileImage}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="emailuserName">
              <span className="username" tabIndex={0}>
                {userInfo?.username}
              </span>
              <span tabIndex={0}>{userInfo?.email}</span>
            </div>
            <div className="user-details">
              <div className="profile-icons">
                <i
                  className="bi bi-patch-check-fill"
                  title="Verified or special icon"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-circle"
                  aria-label="Add new"
                >
                  <i className="bi bi-plus-lg" />
                </button>
              </div>
            </div>
          </div>
          <div id="profile-right">
            <div className="dropdown three-dotss">
              <BsThreeDotsVertical
                className="dropdown-toggle three-dotss"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2 position-relative">
                    <MdOutlineEdit className="position-relative z-1" />
                    <input
                      id="profileUploadInput"
                      type="file"
                      name="profile_img"
                      accept="image/png,image/jpg,image/jpeg"
                      onChange={UploadProfileImage}
                      className="file-input-overlay"
                    />
                    Update Image
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className="form-container">
          <form className="form-box" onSubmit={handleSubmit}>
            <div className="cover-photo">
              {previewBanner && (
                <img
                  id="coverImage"
                  src={defaultConfig.imagePath + previewBanner}
                  alt="Cover Photo"
                />
              )}
              <input
                id="bannerUploadInput"
                type="file"
                name="banner_img"
                accept="image/png,image/jpg,image/jpeg"
                onChange={UploadBannerImage}
                style={{ display: "none" }}
              />
              <label htmlFor="bannerUploadInput" className="edit-icon-label">
                <FaEdit className="edit-icon" />
              </label>
            </div>

            <label>Bio</label>
            <textarea
              name="bio"
              value={userInfo?.bio || ""}
              onChange={handleChange}
              placeholder="Enter your bio"
            />
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <label>Font Family</label>

                <select
                  name="fontFamily"
                  value={userInfo?.theme?.fontFamily || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Font</option>
                  {fontOptions.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Font Color</label>
                <input
                  type="color"
                  id="favcolor"
                  name="fontColor"
                  value={userInfo?.theme?.fontColor || ""}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <label>Color Theme</label>
                <input
                  type="color"
                  id="favcolor"
                  name="is_colorImage"
                  value={userInfo?.theme?.is_colorImage || ""}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Main;



// import React, { useEffect, useState } from "react";
// import { API, callAPI, callAPIWithoutAuth } from "../../../utils/apicall.utils";
// import { apiUrls } from "../../../utils/api.utils";
// import { FaEdit, FaCamera, FaShare, FaCog, FaCheck, FaUser, FaEye, FaLink } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import ErrorMessage from "../../../helpers/ErrorMessage";
// import { defaultConfig } from "../../../config";
// import LoadScreen from "../../loaderScreen";
// import SuccessMessage from "../../../helpers/Success";
// import { BsThreeDotsVertical, BsPalette, BsType } from "react-icons/bs";
// import { MdOutlineEdit, MdColorLens, MdTextFields, MdSave, MdCancel } from "react-icons/md";
// import { BiUser, BiPalette } from "react-icons/bi";

// const fontOptions = [
//   "Inter",
//   "Roboto",
//   "Open Sans",
//   "Montserrat",
//   "Playfair Display",
//   "Source Sans Pro",
//   "Times New Roman",
//   "Georgia",
//   "Verdana",
// ];

// const themePresets = [
//   { name: "Ocean", primary: "#0ea5e9", secondary: "#0284c7", gradient: "linear-gradient(135deg, #0ea5e9, #0284c7)" },
//   { name: "Sunset", primary: "#f97316", secondary: "#ea580c", gradient: "linear-gradient(135deg, #f97316, #ea580c)" },
//   { name: "Forest", primary: "#10b981", secondary: "#059669", gradient: "linear-gradient(135deg, #10b981, #059669)" },
//   { name: "Purple", primary: "#8b5cf6", secondary: "#7c3aed", gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)" },
//   { name: "Rose", primary: "#f43f5e", secondary: "#e11d48", gradient: "linear-gradient(135deg, #f43f5e, #e11d48)" },
//   { name: "Dark", primary: "#374151", secondary: "#1f2937", gradient: "linear-gradient(135deg, #374151, #1f2937)" },
// ];

// interface Theme {
//   themeType: string;
//   fontFamily: string;
//   is_colorImage: string;
//   fontColor: string;
// }

// interface UserInfo {
//   _id: string;
//   username: string;
//   email: string;
//   bio: string;
//   banner_img: string;
//   profile_img: string;
//   theme: Theme;
// }

// interface Props {
//   getUserDetails: () => void;
// }

// const Main: React.FC<Props> = ({ getUserDetails }) => {
//   const { id } = useParams();
//   const [loader, setLoader] = useState(false);
//   const [previewProfile, setPreviewProfile] = useState<string | null>(null);
//   const [previewBanner, setPreviewBanner] = useState<string | null>(null);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeSection, setActiveSection] = useState<'profile' | 'theme'>('profile');
//   const [unsavedChanges, setUnsavedChanges] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setUnsavedChanges(true);
    
//     setUserInfo((prev) => {
//       if (!prev) return prev;
//       if (["themeType", "fontFamily", "is_colorImage", "fontColor"].includes(name)) {
//         return {
//           ...prev,
//           theme: {
//             ...prev.theme,
//             [name]: value,
//           },
//         };
//       }
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const getUserDetail = async () => {
//     setLoader(true);
//     try {
//       const response = await callAPIWithoutAuth(
//         apiUrls.getUserInfo,
//         { _id: id },
//         "GET",
//         {}
//       );
//       setLoader(false);
//       if (!response?.data?.status) {
//         ErrorMessage(response?.data?.message);
//       } else {
//         const user = response?.data?.data[0];
//         setUserInfo(user);
//         setPreviewProfile(user.profile_img || null);
//         setPreviewBanner(user.banner_img || null);
//       }
//     } catch (err: any) {
//       setLoader(false);
//       ErrorMessage(err.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getUserDetail();
//     }
//   }, [id]);

//   const validateFile = (file: File, maxSize: number, type: string) => {
//     if (file.size > maxSize) {
//       ErrorMessage(`${type} size should be less than ${maxSize / (1024 * 1024)}MB`);
//       return false;
//     }
    
//     const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       ErrorMessage('Please select a valid image file (PNG, JPG, JPEG, WebP)');
//       return false;
//     }
    
//     return true;
//   };

//   const UploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//       const files = e.target.files;
//       if (!files || files.length === 0) return;

//       const file = files[0];
//       if (!validateFile(file, 5 * 1024 * 1024, 'Profile image')) return;

//       setLoader(true);
//       const formData = new FormData();
//       formData.append("tempImage", file);

//       const apiResponse = await API(apiUrls.upload, {}, "POST", formData);
//       setLoader(false);

//       if (apiResponse.data.status) {
//         const uploadedUrl = apiResponse.data.data;
//         setUserInfo((prev) => ({ ...prev!, profile_img: uploadedUrl }));
//         setPreviewProfile(uploadedUrl);
//         setUnsavedChanges(true);
//         e.target.value = "";
//       } else {
//         ErrorMessage(apiResponse?.data?.message);
//       }
//     } catch (err) {
//       setLoader(false);
//       ErrorMessage("Profile image upload failed");
//     }
//   };

//   const UploadBannerImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//       const files = e.target.files;
//       if (!files || files.length === 0) return;

//       const file = files[0];
//       if (!validateFile(file, 10 * 1024 * 1024, 'Banner image')) return;

//       setLoader(true);
//       const formData = new FormData();
//       formData.append("tempImage", file);

//       const apiResponse = await API(apiUrls.upload, {}, "POST", formData);
//       setLoader(false);

//       if (apiResponse.data.status) {
//         const uploadedUrl = apiResponse.data.data;
//         setUserInfo((prev) => ({ ...prev!, banner_img: uploadedUrl }));
//         setPreviewBanner(uploadedUrl);
//         setUnsavedChanges(true);
//         e.target.value = "";
//       } else {
//         ErrorMessage(apiResponse?.data?.message);
//       }
//     } catch (err) {
//       setLoader(false);
//       ErrorMessage("Banner image upload failed");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoader(true);
//     try {
//       const response = await callAPI(
//         apiUrls.updateProfile,
//         {},
//         "POST",
//         userInfo || {}
//       );
//       setLoader(false);
//       if (!response?.data?.status) {
//         ErrorMessage(response?.data?.message);
//       } else {
//         localStorage.setItem("profile_img", userInfo?.profile_img || "");
//         SuccessMessage(response?.data?.message);
//         setIsEditing(false);
//         setUnsavedChanges(false);
//         await getUserDetails();
//       }
//     } catch (err: any) {
//       setLoader(false);
//       ErrorMessage(err.message || "Something went wrong");
//     }
//   };

//   const handleThemePreset = (preset: typeof themePresets[0]) => {
//     setUserInfo((prev) => ({
//       ...prev!,
//       theme: {
//         ...prev!.theme,
//         is_colorImage: preset.primary,
//         themeType: preset.name.toLowerCase(),
//       },
//     }));
//     setUnsavedChanges(true);
//   };

//   const handleCancel = () => {
//     if (unsavedChanges) {
//       if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
//         setIsEditing(false);
//         setUnsavedChanges(false);
//         getUserDetail(); // Reload original data
//       }
//     } else {
//       setIsEditing(false);
//     }
//   };

//   return (
//     <>
//       {loader && <LoadScreen />}
//       <div className="main-dashboard">
//         {/* Header */}
//         <header className="dashboard-header">
//           <div className="header-content">
//             <div className="header-left">
//               <h1 className="dashboard-title">
//                 <FaUser className="title-icon" />
//                 My Bioforge Profile
//               </h1>
//               <p className="dashboard-subtitle">Customize your profile and manage your links</p>
//             </div>
//             <div className="header-actions">
//               <Link
//                 to={`/profile/${localStorage.getItem("_id")}`}
//                 className="action-button share-button"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaShare />
//                 <span>Preview</span>
//               </Link>
//               <button
//                 className={`action-button edit-button ${isEditing ? 'active' : ''}`}
//                 onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
//               >
//                 {isEditing ? <MdCancel /> : <FaCog />}
//                 <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Profile Preview Card */}
//         <div className="profile-preview-card">
//           {/* Banner Section */}
//           <div className="banner-section">
//             <div className="banner-container">
//               {previewBanner ? (
//                 <img
//                   src={defaultConfig.imagePath + previewBanner}
//                   alt="Banner"
//                   className="banner-image"
//                 />
//               ) : (
//                 <div className="banner-placeholder">
//                   <FaCamera className="placeholder-icon" />
//                   <span>Add a banner image</span>
//                 </div>
//               )}
//               {isEditing && (
//                 <>
//                   <input
//                     id="bannerUploadInput"
//                     type="file"
//                     accept="image/png,image/jpg,image/jpeg,image/webp"
//                     onChange={UploadBannerImage}
//                     style={{ display: "none" }}
//                   />
//                   <label htmlFor="bannerUploadInput" className="banner-edit-button">
//                     <FaEdit />
//                   </label>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Profile Info Section */}
//           <div className="profile-info-section">
//             <div className="profile-avatar-container">
//               <div className="avatar-wrapper">
//                 {previewProfile ? (
//                   <img
//                     src={defaultConfig.imagePath + previewProfile}
//                     alt="Profile"
//                     className="profile-avatar"
//                   />
//                 ) : (
//                   <div className="avatar-placeholder">
//                     <FaUser />
//                   </div>
//                 )}
//                 {isEditing && (
//                   <div className="avatar-edit-overlay">
//                     <input
//                       id="profileUploadInput"
//                       type="file"
//                       accept="image/png,image/jpg,image/jpeg,image/webp"
//                       onChange={UploadProfileImage}
//                       style={{ display: "none" }}
//                     />
//                     <label htmlFor="profileUploadInput" className="avatar-edit-button">
//                       <FaCamera />
//                     </label>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="profile-details">
//               <div className="profile-header">
//                 <h2 className="profile-name">
//                   {userInfo?.username}
//                   <FaCheck className="verified-badge" />
//                 </h2>
//                 <p className="profile-email">{userInfo?.email}</p>
//               </div>

//               <div className="profile-bio">
//                 <p>{userInfo?.bio || "No bio added yet. Click edit to add one!"}</p>
//               </div>

//               <div className="profile-stats">
//                 <div className="stat-item">
//                   <FaLink className="stat-icon" />
//                   <span className="stat-number">12</span>
//                   <span className="stat-label">Links</span>
//                 </div>
//                 <div className="stat-item">
//                   <FaEye className="stat-icon" />
//                   <span className="stat-number">1.2k</span>
//                   <span className="stat-label">Views</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Edit Form */}
//         {isEditing && (
//           <div className="edit-form-container">
//             <div className="edit-tabs">
//               <button
//                 className={`tab-button ${activeSection === 'profile' ? 'active' : ''}`}
//                 onClick={() => setActiveSection('profile')}
//               >
//                 <BiUser />
//                 Profile Info
//               </button>
//               <button
//                 className={`tab-button ${activeSection === 'theme' ? 'active' : ''}`}
//                 onClick={() => setActiveSection('theme')}
//               >
//                 <BiPalette />
//                 Theme & Style
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="edit-form">
//               {activeSection === 'profile' && (
//                 <div className="form-section">
//                   <div className="form-group">
//                     <label className="form-label">
//                       <MdTextFields />
//                       Bio
//                     </label>
//                     <textarea
//                       name="bio"
//                       value={userInfo?.bio || ""}
//                       onChange={handleChange}
//                       placeholder="Tell people about yourself..."
//                       className="form-textarea"
//                       rows={4}
//                       maxLength={500}
//                     />
//                     <div className="character-count">
//                       {(userInfo?.bio || "").length}/500
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeSection === 'theme' && (
//                 <div className="form-section">
//                   <div className="theme-controls">
//                     <div className="form-group">
//                       <label className="form-label">
//                         <BsType />
//                         Font Family
//                       </label>
//                       <select
//                         name="fontFamily"
//                         value={userInfo?.theme?.fontFamily || ""}
//                         onChange={handleChange}
//                         className="form-select"
//                       >
//                         <option value="">Select Font</option>
//                         {fontOptions.map((font) => (
//                           <option key={font} value={font} style={{ fontFamily: font }}>
//                             {font}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">
//                         <MdColorLens />
//                         Text Color
//                       </label>
//                       <div className="color-picker-wrapper">
//                         <input
//                           type="color"
//                           name="fontColor"
//                           value={userInfo?.theme?.fontColor || "#000000"}
//                           onChange={handleChange}
//                           className="color-picker"
//                         />
//                         <span className="color-value">
//                           {userInfo?.theme?.fontColor || "#000000"}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">
//                         <BsPalette />
//                         Theme Color
//                       </label>
//                       <div className="color-picker-wrapper">
//                         <input
//                           type="color"
//                           name="is_colorImage"
//                           value={userInfo?.theme?.is_colorImage || "#0ea5e9"}
//                           onChange={handleChange}
//                           className="color-picker"
//                         />
//                         <span className="color-value">
//                           {userInfo?.theme?.is_colorImage || "#0ea5e9"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="theme-presets-section">
//                     <label className="form-label">Quick Theme Presets</label>
//                     <div className="theme-presets-grid">
//                       {themePresets.map((preset) => (
//                         <button
//                           key={preset.name}
//                           type="button"
//                           className={`preset-button ${
//                             userInfo?.theme?.themeType === preset.name.toLowerCase() ? 'active' : ''
//                           }`}
//                           onClick={() => handleThemePreset(preset)}
//                           style={{ background: preset.gradient }}
//                         >
//                           <span className="preset-name">{preset.name}</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="theme-preview">
//                     <label className="form-label">Preview</label>
//                     <div 
//                       className="preview-card"
//                       style={{
//                         fontFamily: userInfo?.theme?.fontFamily || 'Inter',
//                         color: userInfo?.theme?.fontColor || '#000000',
//                         borderColor: userInfo?.theme?.is_colorImage || '#0ea5e9'
//                       }}
//                     >
//                       <div 
//                         className="preview-header"
//                         style={{ backgroundColor: userInfo?.theme?.is_colorImage || '#0ea5e9' }}
//                       >
//                         <div className="preview-avatar"></div>
//                       </div>
//                       <div className="preview-content">
//                         <h4>{userInfo?.username || 'Your Name'}</h4>
//                         <p>This is how your profile will look</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="form-actions">
//                 {unsavedChanges && (
//                   <div className="unsaved-indicator">
//                     <span>You have unsaved changes</span>
//                   </div>
//                 )}
//                 <button
//                   type="button"
//                   className="cancel-button"
//                   onClick={handleCancel}
//                 >
//                   <MdCancel />
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="save-button"
//                   disabled={!unsavedChanges}
//                 >
//                   <MdSave />
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       <style >{`
//         .main-dashboard {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 2rem;
//           background: #f8fafc;
//           min-height: 100vh;
//         }

//         /* Header Styles */
//         .dashboard-header {
//           background: white;
//           border-radius: 20px;
//           padding: 2rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: 1px solid #e2e8f0;
//         }

//         .header-content {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//         }

//         .header-left {
//           flex: 1;
//         }

//         .dashboard-title {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           font-size: 2rem;
//           font-weight: 700;
//           color: #1a202c;
//           margin: 0 0 0.5rem 0;
//         }

//         .title-icon {
//           color: #0ea5e9;
//           font-size: 2.25rem;
//         }

//         .dashboard-subtitle {
//           color: #64748b;
//           font-size: 1.1rem;
//           margin: 0;
//         }

//         .header-actions {
//           display: flex;
//           gap: 1rem;
//           align-items: center;
//         }

//         .action-button {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.875rem 1.5rem;
//           border-radius: 12px;
//           font-weight: 600;
//           text-decoration: none;
//           border: 2px solid transparent;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-size: 0.95rem;
//         }

//         .share-button {
//           background: linear-gradient(135deg, #10b981, #059669);
//           color: white;
//         }

//         .share-button:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
//         }

//         .edit-button {
//           background: #f8fafc;
//           color: #475569;
//           border-color: #e2e8f0;
//         }

//         .edit-button:hover {
//           background: #e2e8f0;
//           border-color: #cbd5e1;
//         }

//         .edit-button.active {
//           background: #fee2e2;
//           color: #dc2626;
//           border-color: #fecaca;
//         }

//         /* Profile Preview Card */
//         .profile-preview-card {
//           background: white;
//           border-radius: 20px;
//           overflow: hidden;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: 1px solid #e2e8f0;
//         }

//         .banner-section {
//           position: relative;
//         }

//         .banner-container {
//           position: relative;
//           height: 200px;
//           background: linear-gradient(135deg, #0ea5e9, #0284c7);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .banner-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .banner-placeholder {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 1rem;
//           color: white;
//           font-size: 1.1rem;
//           opacity: 0.9;
//         }

//         .placeholder-icon {
//           font-size: 3rem;
//         }

//         .banner-edit-button {
//           position: absolute;
//           top: 1rem;
//           right: 1rem;
//           background: rgba(0, 0, 0, 0.6);
//           color: white;
//           border: none;
//           border-radius: 50%;
//           width: 48px;
//           height: 48px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           backdrop-filter: blur(10px);
//         }

//         .banner-edit-button:hover {
//           background: rgba(0, 0, 0, 0.8);
//           transform: scale(1.1);
//         }

//         .profile-info-section {
//           padding: 2rem;
//           position: relative;
//         }

//         .profile-avatar-container {
//           display: flex;
//           justify-content: center;
//           margin-bottom: 1.5rem;
//         }

//         .avatar-wrapper {
//           position: relative;
//           margin-top: -80px;
//         }

//         .profile-avatar {
//           width: 140px;
//           height: 140px;
//           border-radius: 50%;
//           border: 6px solid white;
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
//           object-fit: cover;
//         }

//         .avatar-placeholder {
//           width: 140px;
//           height: 140px;
//           border-radius: 50%;
//           border: 6px solid white;
//           background: #f1f5f9;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 4rem;
//           color: #94a3b8;
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
//         }

//         .avatar-edit-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.6);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           opacity: 0;
//           transition: opacity 0.3s ease;
//           backdrop-filter: blur(5px);
//         }

//         .avatar-wrapper:hover .avatar-edit-overlay {
//           opacity: 1;
//         }

//         .avatar-edit-button {
//           background: none;
//           border: none;
//           color: white;
//           font-size: 1.5rem;
//           cursor: pointer;
//         }

//         .profile-details {
//           text-align: center;
//         }

//         .profile-header {
//           margin-bottom: 1.5rem;
//         }

//         .profile-name {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.75rem;
//           font-size: 2rem;
//           font-weight: 700;
//           color: #1a202c;
//           margin: 0 0 0.5rem 0;
//         }

//         .verified-badge {
//           color: #10b981;
//           font-size: 1.25rem;
//         }

//         .profile-email {
//           color: #64748b;
//           font-size: 1.1rem;
//           margin: 0;
//         }

//         .profile-bio {
//           margin-bottom: 2rem;
//         }

//         .profile-bio p {
//           color: #475569;
//           font-size: 1rem;
//           line-height: 1.6;
//           margin: 0;
//           max-width: 600px;
//           margin: 0 auto;
//         }

//         .profile-stats {
//           display: flex;
//           justify-content: center;
//           gap: 3rem;
//         }

//         .stat-item {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .stat-icon {
//           color: #0ea5e9;
//           font-size: 1.25rem;
//         }

//         .stat-number {
//           font-size: 1.75rem;
//           font-weight: 700;
//           color: #1a202c;
//         }

//         .stat-label {
//           font-size: 0.875rem;
//           color: #64748b;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//           font-weight: 500;
//         }

//         /* Edit Form Styles */
//         .edit-form-container {
//           background: white;
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: 1px solid #e2e8f0;
//         }

//         .edit-tabs {
//           display: flex;
//           border-bottom: 1px solid #e2e8f0;
//           background: #f8fafc;
//         }

//         .tab-button {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           padding: 1.25rem 2rem;
//           background: none;
//           border: none;
//           font-weight: 600;
//           color: #64748b;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           border-bottom: 3px solid transparent;
//           flex: 1;
//           justify-content: center;
//         }

//         .tab-button.active {
//           color: #0ea5e9;
//           border-bottom-color: #0ea5e9;
//           background: white;
//         }

//         .tab-button:hover:not(.active) {
//           color: #475569;
//           background: #f1f5f9;
//         }

//         .edit-form {
//           padding: 2rem;
//         }

//         .form-section {
//           margin-bottom: 2rem;
//         }

//         .theme-controls {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }

//         .form-group {
//           margin-bottom: 1.5rem;
//         }

//         .form-label {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 600;
//           color: #374151;
//           margin-bottom: 0.75rem;
//           font-size: 0.95rem;
//         }

//         .form-textarea {
//           width: 100%;
//           padding: 1rem;
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           font-size: 1rem;
//           resize: vertical;
//           transition: all 0.3s ease;
//           font-family: inherit;
//         }
//           .form-textarea:focus {
//           outline: none;
//           border-color: #0ea5e9;
//           box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
//         }

//         .character-count {
//           text-align: right;
//           font-size: 0.875rem;
//           color: #64748b;
//           margin-top: 0.5rem;
//         }

//         .form-select {
//           width: 100%;
//           padding: 1rem;
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           font-size: 1rem;
//           background: white;
//           transition: all 0.3s ease;
//         }

//         .form-select:focus {
//           outline: none;
//           border-color: #0ea5e9;
//           box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
//         }

//         .color-picker-wrapper {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           padding: 0.75rem;
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           transition: all 0.3s ease;
//         }

//         .color-picker-wrapper:focus-within {
//           border-color: #0ea5e9;
//           box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
//         }

//         .color-picker {
//           width: 50px;
//           height: 50px;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: transform 0.2s ease;
//         }

//         .color-picker:hover {
//           transform: scale(1.05);
//         }

//         .color-value {
//           font-family: 'Monaco', 'Menlo', monospace;
//           font-size: 0.875rem;
//           color: #64748b;
//           text-transform: uppercase;
//           font-weight: 500;
//         }

//         .theme-presets-section {
//           margin-top: 2rem;
//           padding-top: 2rem;
//           border-top: 1px solid #e2e8f0;
//         }

//         .theme-presets-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
//           gap: 1rem;
//           margin-top: 1rem;
//         }

//         .preset-button {
//           padding: 1.25rem;
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           background: white;
//           color: white;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           position: relative;
//           overflow: hidden;
//         }

//         .preset-button::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.2);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .preset-button:hover::before {
//           opacity: 1;
//         }

//         .preset-button.active {
//           border-color: #0ea5e9;
//           box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
//           transform: scale(1.02);
//         }

//         .preset-name {
//           position: relative;
//           z-index: 1;
//           text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
//         }

//         .theme-preview {
//           margin-top: 2rem;
//           padding-top: 2rem;
//           border-top: 1px solid #e2e8f0;
//         }

//         .preview-card {
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           overflow: hidden;
//           margin-top: 1rem;
//           transition: all 0.3s ease;
//         }

//         .preview-header {
//           height: 60px;
//           position: relative;
//           display: flex;
//           align-items: flex-end;
//           padding: 1rem;
//         }

//         .preview-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background: white;
//           border: 2px solid white;
//           margin-bottom: -20px;
//         }

//         .preview-content {
//           padding: 1.5rem 1rem 1rem;
//           background: white;
//         }

//         .preview-content h4 {
//           margin: 0 0 0.5rem 0;
//           font-size: 1.1rem;
//           font-weight: 600;
//         }

//         .preview-content p {
//           margin: 0;
//           font-size: 0.9rem;
//           opacity: 0.8;
//         }

//         .form-actions {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding-top: 2rem;
//           border-top: 1px solid #e2e8f0;
//           margin-top: 2rem;
//         }

//         .unsaved-indicator {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: #f59e0b;
//           font-size: 0.875rem;
//           font-weight: 500;
//         }

//         .unsaved-indicator::before {
//           content: '●';
//           animation: pulse 2s infinite;
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }

//         .cancel-button,
//         .save-button {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.875rem 1.5rem;
//           border-radius: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           border: 2px solid transparent;
//         }

//         .cancel-button {
//           background: #f8fafc;
//           color: #64748b;
//           border-color: #e2e8f0;
//         }

//         .cancel-button:hover {
//           background: #f1f5f9;
//           border-color: #cbd5e1;
//         }

//         .save-button {
//           background: linear-gradient(135deg, #0ea5e9, #0284c7);
//           color: white;
//           margin-left: 1rem;
//         }

//         .save-button:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
//         }

//         .save-button:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//           transform: none;
//           box-shadow: none;
//         }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .main-dashboard {
//             padding: 1rem;
//           }

//           .dashboard-header {
//             padding: 1.5rem;
//           }

//           .header-content {
//             flex-direction: column;
//             gap: 1.5rem;
//             text-align: center;
//           }

//           .dashboard-title {
//             font-size: 1.75rem;
//             justify-content: center;
//           }

//           .header-actions {
//             justify-content: center;
//           }

//           .action-button {
//             padding: 0.75rem 1.25rem;
//             font-size: 0.9rem;
//           }

//           .banner-container {
//             height: 150px;
//           }

//           .profile-avatar,
//           .avatar-placeholder {
//             width: 120px;
//             height: 120px;
//             margin-top: -60px;
//           }

//           .profile-name {
//             font-size: 1.75rem;
//           }

//           .profile-stats {
//             gap: 2rem;
//           }

//           .theme-controls {
//             grid-template-columns: 1fr;
//           }

//           .theme-presets-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }

//           .form-actions {
//             flex-direction: column;
//             gap: 1rem;
//           }

//           .save-button {
//             margin-left: 0;
//             width: 100%;
//             justify-content: center;
//           }

//           .cancel-button {
//             width: 100%;
//             justify-content: center;
//           }
//         }

//         @media (max-width: 480px) {
//           .dashboard-title {
//             font-size: 1.5rem;
//           }

//           .banner-container {
//             height: 120px;
//           }

//           .profile-avatar,
//           .avatar-placeholder {
//             width: 100px;
//             height: 100px;
//             margin-top: -50px;
//           }

//           .profile-name {
//             font-size: 1.5rem;
//           }

//           .profile-stats {
//             gap: 1.5rem;
//           }

//           .stat-number {
//             font-size: 1.5rem;
//           }

//           .edit-form {
//             padding: 1.5rem;
//           }

//           .tab-button {
//             padding: 1rem;
//             font-size: 0.9rem;
//           }

//           .theme-presets-grid {
//             grid-template-columns: 1fr;
//           }
//         }

//         /* Loading States */
//         .loading-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(255, 255, 255, 0.8);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 12px;
//           backdrop-filter: blur(2px);
//         }

//         /* Accessibility Improvements */
//         .action-button:focus,
//         .tab-button:focus,
//         .preset-button:focus,
//         .cancel-button:focus,
//         .save-button:focus {
//           outline: 2px solid #0ea5e9;
//           outline-offset: 2px;
//         }

//         .form-textarea:focus,
//         .form-select:focus,
//         .color-picker:focus {
//           outline: none;
//         }

//         /* Smooth transitions for theme changes */
//         * {
//           transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Main;


