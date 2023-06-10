import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./Specialists.module.css"

function Specialists() {
    return (
        <div className={m.container}>
            <div className={m.containerwrapper}>
                <ModifiedHeader />

                <div className={m.SpecialistsContainer}>
                    <h1 className={m.title}>Специалисты</h1>
                    <p className={m.text}>Для доступа к специалистам, пожалуйста, создайте свой проект в личном кабинете и добавьте минимум одну позицию специалиста.</p>
                </div>
            </div>
        </div>
    );
}

export default Specialists;