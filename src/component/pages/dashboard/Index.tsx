import { useParams } from "react-router-dom";
import "./dashboard.css";
import DashboardSidebar from "./DashboardSidebar";
import Main from "./main";
import { MobileUi } from "./MobileUi";
import ManageLinks from "../links/Index";
const Index = () => {
  const { layout } = useParams();
  return (
    <div className="d-flex">
      <DashboardSidebar />
      {layout === 'profile' ? <Main /> : <ManageLinks />}

      <MobileUi />
    </div>
  );
};

export default Index;
