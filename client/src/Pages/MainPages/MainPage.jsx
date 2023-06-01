import About from "../../components/Blocks/About/About";
import AboutInfo from "../../components/Blocks/AboutInfo/AboutInfo";
import AboutProject from "../../components/Blocks/AboutProject/AboutProject";
import AboutWork from "../../components/Blocks/AboutWork/AboutWork";
import Footer from "../../components/Blocks/Footer/Footer";
import Intro from "../../components/Blocks/Intro/Intro";
import Registration from "../../components/Blocks/Registration/Registration";
import Slider from "../../components/Blocks/Slider/Slider";
import Submit from "../../components/Blocks/Submit/Submit";

function MainPage() {
    return (
        <>
            <Intro />
            <About /> 
            <AboutWork />
            <AboutInfo />
            <AboutProject />
            <Registration />
            {/*<Slider />
            <Submit />
            <Footer /> */}
        </>
    );
}

export default MainPage;