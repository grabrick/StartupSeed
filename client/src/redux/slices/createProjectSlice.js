import { createSlice } from "@reduxjs/toolkit";
import { getUUID } from "../../components/utils/getUUID";

const initialState = {
  projectPosition: []
};

const createPojectSlice = createSlice({
  name: "createPoject",
  initialState,
  reducers: {
    getPosition(state, actions) {
      state.projectPosition = actions.payload;
    },

    addText(state, actions) {
      const { value, id } = actions.payload;
      console.log({ value, id });
    
      const updatedProjectPosition = state.projectPosition.map(item => {
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
        projectPosition: updatedProjectPosition,
      };
    },

    addTag(state, actions) {
      const { value, id } = actions.payload;
      console.log({ value, id });

      const updatedProjectPosition = state.projectPosition.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            skills: item.skills ? [...item.skills, value] : [value],
          };
        }
        return item;
      });

      return {
        ...state,
        projectPosition: updatedProjectPosition,
      };
    },
    
    onAdd(state, actions) {
      state.projectPosition.push({ id: getUUID(), jobPost: '', postLevel: 'Любой', jobTask: '', skills: [] })
    },

    deletePosition(state, actions) {
      const id = actions.payload
      const findObject = state.projectPosition.find((object) => object.id === id.formID)
      if(findObject) {
        const updatedPositions = state.projectPosition.filter((object) => object.id !== id.formID);
        return {
          ...state,
          projectPosition: updatedPositions,
        }
      }
    },

    removeTag(state, actions) {
      const { index, formID } = actions.payload;
      const currentID = state.projectPosition.find((item) => item.id === formID)
      if (currentID.id === formID) {
        const positionIndex = state.projectPosition.findIndex((item) => item.id === formID);
    
        if (positionIndex !== -1) {
          state.projectPosition[positionIndex].skills.splice(index, 1);
        }
      }
    }
  }
})

export const { getPosition, addText, addTag, removeTag, onAdd, deletePosition } = createPojectSlice.actions;

export default createPojectSlice.reducer;