import Header from '../Header/Header';
import m from './Intro.module.css'

function Intro() {
    return (
      <>
        <div className={m.container}>
            <Header />
        </div>
      </>
    );
}

export default Intro;