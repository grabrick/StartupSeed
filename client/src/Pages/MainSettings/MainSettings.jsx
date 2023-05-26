import Footer from "../../components/Blocks/Footer/Footer";
import Settings from "../../components/Settings/Settings";
import './MainSettingsRoute.css'

function MainSettings() {
  return (
    <div className="content">
      <div className="wrapper">
        <Settings />
      </div>
      <Footer />
    </div>
  );
}

export default MainSettings;
