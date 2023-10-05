import m from './Skills.module.css'

function Skills({skills}) {
    return (
        <div className={m.skills}>
            <h4 className={m.skillsTag}>{skills}</h4>
        </div>
    );
}

export default Skills;