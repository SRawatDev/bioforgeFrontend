import React from "react";
const LoadScreen:React.FC = () => (
  <div className="loading">
    <img src="/image/logo.svg" alt="logo" />
    <p className="mt-2">Please wait we are fetching your data</p>
  </div>
);

export default LoadScreen;
