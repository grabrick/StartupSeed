import m from "./CreateProject.module.css";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import closeIcn from "../../assets/images/close-line.svg";
import addIcn from "../../assets/images/add-line.svg";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { addTag, removeTag } from "../../redux/slices/projectSkillsSlice";

function CreateProject() {
  const normalInput = `${m.input}`;
  const errorInput = `${m.inputError}`;
  const normalInputTeam = `${m.inputTeam}`;
  const errorInputTeam = `${m.inputErrorTeam}`;
  const normalInputArea = `${m.inputArea}`;
  const errorInputArea = `${m.inputErrorArea}`;
  const normalInputAreaTeam = `${m.inputAreaTeam}`;
  const errorInputAreaTeam = `${m.inputErrorAreaTeam}`;
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const [image, setImage] = useState();
  const [form, setForm] = useState({
    skills: [],
  });
  const [skills, setSkills] = useState([]);
  const data = useSelector((state) => state.project.projectSkills);
  const dispatch = useDispatch();
  const addTags = (items) => {
    dispatch(addTag(items));
  };
  const removeTags = (i, formId) => {
    dispatch(removeTag(i, formId));
  };
  // const changeHandler = (event) => {
  //   setForm({ ...form, [event.target.name]: event.target.value });
  // };

  const handleKeyDown = (e, index) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    let value = e.target.value;
    if (!value.trim()) return;
    setSkills([...skills, value]);
    // addTags({...skills, skills: form.skills}, formID);
    // addTags([...skills], formID);
    addTags(...skills, form.skills);
    setSkills([]);
    setForm({ skills: "" });
  };

  const clickAddTag = () => {
    if (!form.skills.toString().trim()) return;
    setSkills([...skills, form.skills]);
    addTags([...skills, form.skills]);
    setSkills([]);
    setForm({ skills: "" });
  };

  const converter = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const uploadImage = async () => {
        setImage({ ...image, image: reader.result });
      };
      uploadImage();
    };
    setTimeout(() => {
      reader.onerror = (error) => {
        console.log({ message: error });
      };
    }, 1000);
  };

  const validate = (e) => {
    let value = e
    setSkills(value.projectPost)
    const errors = {};

    if (e.aboutMe && e.aboutMe.length < 50) {
      errors.aboutMe = "Напишите больше о своих достижениях";
    }

    return errors;
  };
  const onSubmit = async (value) => {
    console.log(value);
    axios
      .post(`/api/${userId}/create`, {
        ...value,
        skills: data,
        projectImage: image?.image,
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
        <ModifiedHeader />
        <h1 className={m.title}>Создать проект</h1>
        <div className={m.wrapper}>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            mutators={{
              ...arrayMutators,
            }}
            render={({
              handleSubmit,
              form: {
                mutators: { push, pop },
              },
            }) => (
              <form className={m.form} onSubmit={handleSubmit}>
                <div className={m.formWrapper}>
                  <div className={m.avatar1}>
                    {/* <img
                      className={m.profilePic}
                      src={data ? image?.image : data.more?.pers?.profilePic}
                      alt=""
                    /> */}
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
                  <FieldArray name="projectPost">
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <div key={index} className={m.formWrapper}>
                          <div className={m.jobPostWrapper}>
                            <Field name={`${name}.jobPost`}>
                              {({ input, meta }) => (
                                <>
                                  <input
                                    type="text"
                                    placeholder="Должность"
                                    className={
                                      meta.error
                                        ? errorInputTeam
                                        : normalInputTeam
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
                            <Field name={`${name}.postLevel`}>
                              {({ input, meta }) => (
                                <>
                                  <span className="span">Уровень</span>
                                  <select
                                    className={m.selector}
                                    {...input}
                                    name="postLevel"
                                  >
                                    <option value="Любой">Любой</option>
                                    <option value="Junior">Junior</option>
                                    <option value="Middle">Middle</option>
                                    <option value="Senior">Senior</option>
                                    <option value="Lead">Lead</option>
                                  </select>
                                </>
                              )}
                            </Field>
                          </div>
                          <Field name={`${name}.jobTask`}>
                            {({ input, meta }) => (
                              <>
                                <textarea
                                  type="text"
                                  placeholder="Опешите ваши задачи и достижения"
                                  className={
                                    meta.error
                                      ? errorInputAreaTeam
                                      : normalInputAreaTeam
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
                          <div className={m.skillsWrapper}>
                            <Field name={`${name}.skills`}>
                              {({ input, meta }) => (
                                <>
                                  <input
                                    type="text"
                                    placeholder="Навыки"
                                    name="skills"
                                    className={m.skillsInput}
                                    {...input}
                                    onKeyDown={handleKeyDown}
                                  />
                                  <img
                                    src={addIcn}
                                    className={m.buttonAdd}
                                    onClick={() => clickAddTag()}
                                    alt=""
                                  />
                                </>
                              )}
                            </Field>
                          </div>
                          <div className={m.tagsWrapper}>
                            {data.map((tag, i) => (
                              <div key={i} className={m.tags}>
                                {/* <span className={m.tag}>{tag.skills}</span> */}
                                {/* <span className={m.tag}>{tag[1].skills}</span> */}
                                {
                                  // tag[1].skills
                                  console.log(tag)
                                  // console.log(index === tag[0].id)
                                }
                                <img
                                  className={m.tagBtn}
                                  onClick={() => removeTags(i)}
                                  src={closeIcn}
                                  alt=""
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    }
                  </FieldArray>
                  <div className={m.buttonWrapper}>
                    <button
                      type="button"
                      onClick={() => push("projectPost", undefined)}
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
