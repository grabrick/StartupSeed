import m from "./EditPositionForm.module.css";
import addIcn from "../../../../assets/images/add-line.svg";
import closeIcn from "../../../../assets/images/close-line.svg";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import { useEffect, useState } from "react";
import {
  addTag,
  addText,
  deletePosition,
  removeTag,
} from "../../../../redux/slices/userSlice";

function EditPositionForm(items) {
  const normalInputTeam = `${m.inputTeam}`;
  const errorInputTeam = `${m.inputErrorTeam}`;
  const normalInputAreaTeam = `${m.inputAreaTeam}`;
  const errorInputAreaTeam = `${m.inputErrorAreaTeam}`;
  const dispatch = useDispatch();
  const [skills, setSkills] = useState();
  const [inputForm, setinputForm] = useState();
  const formID = items.items.id;
  const addTags = (TagValue) => dispatch(addTag(TagValue));
  const addFormText = (formValue) => dispatch(addText(formValue));
  const removeTags = (index, formID) => dispatch(removeTag({ index, formID }));
  const clickDelete = (formID) => dispatch(deletePosition({formID}))

  const handleKeyDown = (e, input) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    let value = e.target.value;
    if (!value.trim()) return;
    addTags({ value: skills, id: items.items.id });
    input.onChange("");
  };

  const clickAddTag = (input) => {
    if (!skills?.trim()) return;
    addTags({ value: skills, id: items.items.id });
    input.onChange("");
  };

  const updateFormValue = (formValue) => {
    setinputForm(formValue);
  };

  const deleteProjectPosition = (id) => {
    clickDelete(id)
  }

  useEffect(() => {
    updateFormValue(inputForm);
  }, [inputForm]);

  const validate = (e) => {
    setSkills(e.skills);
    const formValue = {
      jobPost: e.jobPost,
      postLevel: e.postLevel,
      jobTask: e.jobTask,
    };
    if (
      formValue.jobPost &&
      formValue.jobTask &&
      formValue.postLevel !== undefined
    ) {
      updateFormValue(formValue);
    }
    const errors = {};

    // if (e.jobTask && e.jobTask.length < 50) {
    //   errors.jobTask = "Напишите больше о своих достижениях";
    // }

    return errors;
  };

  const uploadData = () => {
    addFormText({ value: inputForm, id: items.items.id });
    console.log({ value: inputForm });
  };

  const onSubmit = async (value) => {};

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className={m.form} onSubmit={handleSubmit}>
            <div className={m.formWrapper}>
              <div className={m.jobPostWrapper}>
                <Field name="jobPost">
                  {({ input, meta }) => (
                    <>
                      <input
                        type="text"
                        placeholder="Должность"
                        className={
                          meta.error ? errorInputTeam : normalInputTeam
                        }
                        {...input}
                      />
                      {meta.touched && meta.error && (
                        <span className="error-text1">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
                <Field name="postLevel">
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
              <Field name="jobTask">
                {({ input, meta }) => (
                  <>
                    <textarea
                      type="text"
                      placeholder="Опешите ваши задачи и достижения"
                      className={
                        meta.error ? errorInputAreaTeam : normalInputAreaTeam
                      }
                      {...input}
                    />
                    {meta.touched && meta.error && (
                      <span className="error-text3">{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
              <div className={m.skillsWrapper}>
                <Field name="skills">
                  {({ input, meta }) => (
                    <>
                      <input
                        type="text"
                        placeholder="Навыки"
                        name="skills"
                        className={m.skillsInput}
                        {...input}
                        onKeyDown={(e) => handleKeyDown(e, input)}
                      />
                      <img
                        src={addIcn}
                        className={m.buttonAdd}
                        onClick={() => clickAddTag(input)}
                        alt=""
                      />
                    </>
                  )}
                </Field>
              </div>
              <div className={m.tagsWrapper}>
                {items.items?.skills?.map((tag, index) => (
                  <div key={index} className={m.tags}>
                    <span className={m.tag}>{tag}</span>
                    <img
                      className={m.tagBtn}
                      onClick={() => removeTags(index, formID)}
                      src={closeIcn}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <div className={m.buttonWrapper}>
                <button
                  type="button"
                  onClick={() => deleteProjectPosition(formID)}
                  className={m.deleteButton}
                >
                  Удалить
                </button>
                <button
                  type="button"
                  onClick={() => uploadData()}
                  className={m.saveButton}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </>
  );
}

export default EditPositionForm;
