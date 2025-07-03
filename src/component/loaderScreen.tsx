import React from "react";
const LoadScreen: React.FC = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center  z-50 loading">
    <img src="/src/assets/loader.gif" alt="logo" />
  </div>
);
export default LoadScreen;
