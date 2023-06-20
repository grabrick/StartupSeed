import { NavLink } from 'react-router-dom';
import m from './ProjectComponent.module.css'

function ProjectComponent(items) {
    const data = items.items
    return (
        <div className={m.container}>
            <div className={m.wrapper}>
                <div className={m.avatar}>
                    <img className={m.image} src={data.projectImage} alt="" />
                </div>
                <div className={m.titleWrapper}>
                    <p className={m.title}>{data.projectName}</p>
                    <NavLink className={m.NavLink} to={`/profile/project/${data._id}/edit`}>
                        <button className={m.editButton}>Изменить</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default ProjectComponent;