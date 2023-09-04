import About from "../../components/UI/Blocks/About/About";
import AboutInfo from "../../components/UI/Blocks/AboutInfo/AboutInfo";
import AboutProject from "../../components/UI/Blocks/AboutProject/AboutProject";
import AboutWork from "../../components/UI/Blocks/AboutWork/AboutWork";
import Footer from "../../components/UI/Blocks/Footer/Footer";
import Intro from "../../components/UI/Blocks/Intro/Intro";
import Registration from "../../components/UI/Blocks/Registration/Registration";
// import Slider from "../../components/UI/Blocks/Slider/Slider";
// import Submit from "../../components/UI/Blocks/Submit/Submit";

function MainPage() {
    return (
        <>
            <Intro />
            <About /> 
            <AboutWork />
            <AboutInfo />
            <AboutProject />
            <Registration />
            <Footer />
        </>
    );
}

export default MainPage;