import About from "../../components/About/About";
import AboutInfo from "../../components/AboutInfo/AboutInfo";
import AboutProject from "../../components/AboutProject/AboutProject";
import AboutWork from "../../components/AboutWork/AboutWork";
import Intro from "../../components/Intro/Intro";
import Registration from "../../components/Registration/Registration";
import Slider from "../../components/Slider/Slider";
import Submit from "../../components/Submit/Submit";

function MainPage() {
    return (
        <>
            <Intro />
            <About />
            <AboutWork />
            <AboutInfo />
            <AboutProject />
            <Registration />
            <Slider />
            <Submit />

        </>
    );
}

export default MainPage;