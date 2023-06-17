import { createSlice } from "@reduxjs/toolkit";
import { getUUID } from '../../assets/utils/getUUID';

const initialState = {
  projectPosition: []
};

const projectPositionSlice = createSlice({
  name: "projectPosition",
  initialState,
  reducers: {
    getSkills(state, actions) {
      state.projectPosition = actions.payload;
    },

    addText(state, actions) {
      const { value, id } = actions.payload;
      console.log({ value, id });
    
      const updatedProjectPosition = state.projectPosition.map(item => {
        if (item.id === id) {
          return {
            ...item,
            jobPost: value.jobPost,
            postLevel: value.postLevel,
            jobTask: value.jobTask,
          };
        }
        return item;
      });
    
      console.log(updatedProjectPosition);
      console.log(state.projectPosition);
    
      return {
        ...state,
        projectPosition: updatedProjectPosition,
        openPort: false
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
      state.projectPosition.push({ id: getUUID(), jobPost: '', postLevel: '', jobTask: '', skills: [] })
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

export const { getSkills, addText, addTag, removeTag, onAdd, deletePosition } = projectPositionSlice.actions;

export default projectPositionSlice.reducer;