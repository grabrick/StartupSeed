import m from "./EditProject.module.css";
import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { onAdd } from "../../redux/slices/userSlice";
import { getProject } from "../../redux/slices/userSlice";
import EditPositionForm from "../UI/Form/EditPositionForm/EditPositionForm";

function EditProject({ isAdmin }) {
  const currentLink = window.location.href;
  const findProjectID = currentLink.toString().slice(38, 62);
  const normalInput = `${m.input}`;
  const errorInput = `${m.inputError}`;
  const normalInputArea = `${m.inputArea}`;
  const errorInputArea = `${m.inputErrorArea}`;
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const [image, setImage] = useState();
  const [visualImage, setVisualImage] = useState();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.users.myProject);
  const addForm = () => {
    dispatch(onAdd(findProjectID));
  };

  const Project = (items) => {
    dispatch(getProject(items));
  };

  useEffect(() => {
    axios
      .get(`/api/${userId}/project`)
      .then((items) => {
        Project(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findCurrentObject = project?.find(
    (object) => object._id === findProjectID
  );

  const converter = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("upload", file);
    setImage(formData);

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const uploadImage = async () => {
        setVisualImage({ ...visualImage, image: reader.result });
      };
      uploadImage();
    };
    setTimeout(() => {
      reader.onerror = (error) => {
        console.log({ message: error });
      };
    }, 1000);
  };

  useEffect(() => {
    if (image?.has("upload")) {
      axios.put(`/api/${findProjectID}/projectImage/upload`, image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const validate = (e) => {
    const errors = {};

    if (e.aboutMe && e.aboutMe.length < 50) {
      errors.aboutMe = "Напишите больше о своих достижениях";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    axios
      .put(`/api/${findProjectID}/project/edit`, {
        ...value,
        projectPost: findCurrentObject.projectPost,
      })
      .then((response) => {
        if (response.status === 201) {
          // setTimeout(() => {
          //   window.location.replace("/profile/project");
          // }, 500);
        }
      });
  };

  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader isAdmin={isAdmin} />
        <div className={m.wrapper}>
          <h1 className={m.title}>Редактирование</h1>

          <div className={m.content}>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              initialValues={{
                projectName: findCurrentObject?.projectName || "",
                projectDesc: findCurrentObject?.projectDesc || "",
              }}
              render={({ handleSubmit }) => (
                <form className={m.form} onSubmit={handleSubmit}>
                  <div className={m.formWrapper}>
                    <div className={m.avatar1}>
                      <img
                        className={m.profilePic}
                        src={
                          findCurrentObject
                            ? visualImage?.image
                            : `http://localHost:3000/${findCurrentObject?.projectImage}`
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
                                className={
                                  meta.error ? errorInput : normalInput
                                }
                                {...input}
                              />
                              {meta.touched && meta.error && (
                                <span className="error-text1">
                                  {meta.error}
                                </span>
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
                                <span className="error-text3">
                                  {meta.error}
                                </span>
                              )}
                            </>
                          )}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className={m.wrap}>
                    <p className={m.text}>Команда проекта</p>
                    {findCurrentObject?.projectPost.map((form, index) => (
                      <EditPositionForm
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
    </div>
  );
}

export default EditProject;
