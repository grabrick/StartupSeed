import Footer from "../../components/UI/Blocks/Footer/Footer";
import Settings from "../../components/Settings/Settings";
import './MainSettingsRoute.css'

function MainSettings({isAdmin}) {
  return (
    <div className="content">
      <div className="wrapper">
        <Settings isAdmin={isAdmin} />
      </div>
      <Footer />
    </div>
  );
}

export default MainSettings;
