import m from "./ProjectComponent.module.css"

function ProjectComponent({items}) {
    // console.log(items);
    return (
        <div className={m.container}>
            <div className={m.wrapper}>
                <div className={m.projectContainer}>
                    <div className={m.avatar}>
                        <img className={m.image} src={items?.projectImage} alt="" />
                    </div>
                    <div className={m.infoWrapper}>
                        <h4 className={m.title}>{items?.projectName}</h4>
                        <p className={m.description}>{items?.projectDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectComponent;