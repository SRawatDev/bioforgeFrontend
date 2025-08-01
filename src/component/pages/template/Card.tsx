import type { ThemeData } from "./landingPage";
import { defaultConfig } from "../../../config";
const Card = ({
  themeName,
  themeImg,
  themeDiscription,
  isloginCheck,
}: ThemeData) => {
  return (
    <>
      <div className={`card card`}>
        <div className="card-image-container">
          <img
            src={defaultConfig.baseAPIUrl + "images/" + themeImg}
            alt={themeName}
            className="card-image"
          />
        </div>
        <div className="card-content">
          <h3 className="card-title">{themeName}</h3>
          <p className="card-description">{themeDiscription}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
