import { createSlice } from "@reduxjs/toolkit";
import { getUUID } from "../../components/utils/getUUID";

const initialState = {
  user: [],
  myProject: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, actions) {
      state.user = actions.payload
    },
    getProject(state, actions) {
      state.myProject = actions.payload
    },

    addText(state, actions) {
      const { value, id } = actions.payload;
      const findPosition = state.myProject.find((item) => item)

      const updatedProjectPosition = findPosition.projectPost.map(item => {
        if (item.id === id) {
          return {   
            ...item,
            jobPost: value.jobPost !== undefined ? value.jobPost : item.jobPost,
            postLevel: value.postLevel !== undefined ? value.postLevel : item.postLevel,
            jobTask: value.jobTask !== undefined ? value.jobTask : item.jobTask,
          };
        }
        return item;
      });
      return {
        ...state,
        myProject: state.myProject.map(project => {
          if (project.id === findPosition.id) {
            return {
              ...project,
              projectPost: updatedProjectPosition,
            };
          }
          return project;
        }),
      };
    },

    addTag(state, actions) {
      const { value, id } = actions.payload;
      const findPosition = state.myProject.find((item) => item)
      const updatedProjectPosition = state.myProject.map((project) => {
        if (project.id === findPosition.id) {
          const updatedProjectPost = project.projectPost.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                skills: item.skills ? [...item.skills, value] : [value],
              };
            }
            return item;
          });
          return {
            ...project,
            projectPost: updatedProjectPost,
          };
        }
        return project;
      });

      return {
        ...state,
        myProject: updatedProjectPosition,
      };
    },

    onAdd(state, actions) {
      const id = actions.payload
      const createPosition = state.myProject.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            projectPost: [
              ...item.projectPost,
              { id: getUUID(), jobPost: '', postLevel: 'Любой', jobTask: '', skills: [] }
            ]
          };
        }
        return item;
      });

      return {
        ...state,
        myProject: createPosition,
      };
    },

    deletePosition(state, actions) {
      const id = actions.payload
      const updatedProjects = state.myProject.map((project) => {
        const updatedPositions = project.projectPost.filter((position) => position.id !== id.formID);
        return {
          ...project,
          projectPost: updatedPositions,
        };
      });

      return {
        ...state,
        myProject: updatedProjects,
      };
    },

    removeTag(state, actions) {
      const { index, formID } = actions.payload;
      console.log(index, formID);

      const findPositionIndex = state.myProject.findIndex((item) => {
        return item.projectPost.some((post) => post.id === formID);
      });

      if (findPositionIndex !== -1) {
        const findPosition = state.myProject[findPositionIndex];
        const positionIndex = findPosition.projectPost.findIndex((post) => post.id === formID);
        console.log(positionIndex);

        if (positionIndex !== -1) {
          findPosition.projectPost[positionIndex].skills.splice(index, 1);
        }
      }
    }
  }
})

export const { getUser, getProject, addText, addTag, removeTag, onAdd, deletePosition } = userSlice.actions;

export default userSlice.reducer;