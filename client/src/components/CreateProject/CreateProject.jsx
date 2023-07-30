import m from "./CreateProject.module.css";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { onAdd } from "../../redux/slices/createProjectSlice";
import PositionForm from "../Form/PositionForm/PositionForm";

function CreateProject() {
  const normalInput = `${m.input}`;
  const errorInput = `${m.inputError}`;
  const normalInputArea = `${m.inputArea}`;
  const errorInputArea = `${m.inputErrorArea}`;
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const [visualImage, setVisualImage] = useState();
  const [image, setImage] = useState();
  const dispath = useDispatch();
  const data = useSelector((state) => state.createProject.projectPosition);

  const addForm = () => {
    dispath(onAdd());
  };

  const validate = (e) => {
    const errors = {};

    if (e.aboutMe && e.aboutMe.length < 50) {
      errors.aboutMe = "Напишите больше о своих достижениях";
    }

    return errors;
  };
  const onSubmit = async (value) => {
    axios.post(`/api/${userId}/project/create`, image)
    .then((response => {
      const projectID = response.data._id
      if(response.status === 201) {
        axios.put(`/api/${userId}/project/${projectID}/preCreate`, { ...value, projectPost: data })
        .then((response) => {
            if (response.status === 201) {
              setTimeout(() => {
                window.location.replace("/profile/project");
              }, 500);
            }
          });
      }
    }))
  };

  const converter = (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    let reader = new FileReader();
    formData.append("upload", file);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const uploadImage = async () => {
        setVisualImage({ ...visualImage, image: reader.result });
        setImage(formData);
      };
      uploadImage();
    };
  };

  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader />
        <h1 className={m.title}>Создать проект</h1>
        <div className={m.wrapper}>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
              <form
                className={m.form}
                onSubmit={handleSubmit}
                action={`/api/${userId}/project/create`}
                encType="multipart/form-data"
              >
                <div className={m.formWrapper}>
                  <div className={m.avatar1}>
                    <img
                      className={m.profilePic}
                      src={
                        data ? visualImage?.image : data.more?.pers?.profilePic
                      }
                      alt=""
                    />
                    <input type="button" className={m.cameraBtn} />
                    <input
                      className={m.camera}
                      name="projectImage"
                      onChange={converter}
                      type="file"
                    />
                  </div>

                  <div className={m.formContent}>
                    <div className={m.inputWraper}>
                      <Field name="projectName">
                        {({ input, meta }) => (
                          <>
                            <input
                              type="text"
                              placeholder="Название"
                              className={meta.error ? errorInput : normalInput}
                              {...input}
                            />
                            {meta.touched && meta.error && (
                              <span className="error-text1">{meta.error}</span>
                            )}
                          </>
                        )}
                      </Field>
                    </div>

                    <div className={m.inputWraper}>
                      <Field name="projectDesc">
                        {({ input, meta }) => (
                          <>
                            <textarea
                              type="text"
                              placeholder="Описание"
                              className={
                                meta.error ? errorInputArea : normalInputArea
                              }
                              {...input}
                            />
                            {meta.touched && meta.error && (
                              <span className="error-text3">{meta.error}</span>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
                <div className={m.wrap}>
                  <p className={m.text}>Команда проекта</p>
                  {data.map((form, index) => (
                    <PositionForm
                      items={form}
                      key={form.id}
                      formIndex={index + 1}
                    />
                  ))}
                  <div className={m.buttonWrapper}>
                    <button
                      type="button"
                      onClick={() => addForm()}
                      className={m.addJobPost}
                    >
                      Добавить должность
                    </button>
                    <button type="submit" className={m.buttonSave}>
                      Сохранить
                    </button>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
