import Footer from "../../components/Blocks/Footer/Footer";
import Specialists from "../../components/Specialists/Specialists";
import "./HomeSpecialists.css";

function HomeSpecialists() {
  return (
    <div className="content">
      <div className="wrapper">
        <Specialists />
      </div>
      <Footer />
    </div>
  );
}

export default HomeSpecialists;