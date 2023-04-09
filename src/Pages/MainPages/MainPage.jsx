import About from "../../components/About/About";
import AboutInfo from "../../components/AboutInfo/AboutInfo";
import AboutProject from "../../components/AboutProject/AboutProject";
import AboutWork from "../../components/AboutWork/AboutWork";
import Intro from "../../components/Intro/Intro";
import Registration from "../../components/Registration/Registration";

function MainPage() {
    return (
        <>
            <Intro />
            <About />
            <AboutWork />
            <AboutInfo />
            <AboutProject />
            <Registration />
        </>
    );
}

export default MainPage;