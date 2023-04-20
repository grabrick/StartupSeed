import m from "./Profile.module.css"

function Profile() {
    return (
        <div className={m.container}>
            <h1>Личный кабинет</h1>

            <div className={m.wrapper}>
                <div className={m.bar}>
                    <button className={m.button}>

                    </button>
                </div>

                <div className={m.infoBar}>
                    
                </div>
            </div>
        </div>
    );
}

export default Profile;