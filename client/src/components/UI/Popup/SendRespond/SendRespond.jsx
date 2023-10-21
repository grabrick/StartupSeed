import { useState } from 'react';
import Skills from '../../Skills/Skills';
import m from './SendRespond.module.css'
import moment from "moment-timezone";
import axios from 'axios';

function SendRespond({isActive, setIsActive, submitValue, projectOwner, setSubmitValue }) {
    const ID = JSON.parse(localStorage.getItem("userData"));
    const userId = ID?.userID;
    const [limiter, setLimiter] = useState({
        config: 0,
        height: '100px'
    })
    const [errorMsg, setErrorMsg] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const changer = (e) => {
        const value = e.target.value;
        setInputValue(value)
        if (value.length > 200) {
            setLimiter({
                config: 2,
                height: '300px'
            });
        } else if (value.length === 0) {
            setLimiter({
                config: 0,
                height: '100px'
            });
        }
    };

    const Send = () => {
        const momentNow = moment();
        const formattedTime = momentNow.format("YYYY-MM-DD HH:mm");
        const value = {
            jobPost: submitValue?.jobPost, 
            jobTask: submitValue?.jobTask, 
            postLevel: submitValue?.postLevel, 
            skills: submitValue?.skills,
            interlocutorID: projectOwner,
            respondMessage: inputValue,
            sendTime: formattedTime,
        }
        axios.post(`/api/${userId}/sendRespond`, {...value})
        .then(res => {
            if(res.status === 200) {
                console.log(res.data);
                setIsActive(false)
            }
        }).catch(error => {
            setErrorMsg(error.response?.data?.message)
        })
    }

    return (  
        <div className={isActive ? m.isActive : m.notActive} onClick={() => setIsActive(false)}>
            <div className={m.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={m.respondPos}>
                    <div className={m.jobWrapper}>
                        <h4 className={m.jobPost}>{submitValue?.jobPost}</h4>
                        <h5 className={m.postLevel}>{submitValue?.postLevel}</h5>
                    </div>
                    <p className={m.jobTask}>{submitValue?.jobTask}</p>

                    <div className={m.skillsWrapper}>
                        {submitValue?.skills.map((skills, i) => (
                           <Skills key={i} skills={skills} />
                        ))}
                    </div>
                </div>
                <div className={m.inputWrapper}>
                    <textarea 
                        placeholder='Напишите письмо' 
                        onChange={(e) => changer(e)} 
                        style={limiter.config > 0 ? {height: limiter.height} : {height: limiter.height}} 
                        className={m.textarea}
                    />
                    {errorMsg !== null && <h4 className={m.error}>{errorMsg}</h4>}
                    <div className={m.btnWrapper}>
                        <button className={m.button} onClick={() => setIsActive(false)}>Отмена</button>
                        <button className={errorMsg !== null ? m.disabled : m.button} disabled={errorMsg !== null && true} onClick={() => Send()}>Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SendRespond;