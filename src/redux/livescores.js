import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const scoreSlice = createSlice({
  name: 'livescores',
  initialState,
  reducers: {
    addLiveScore: (state, action) => {
      state.value.push(action.payload)
    },
    resetLiveScores: (state) => {
      state.value = []
    },
    clearScores: (state) => {
      state.value =  state.value.map((item, index) => {
          return {
            ...item,  // copy the existing item
            question_number: null,  // replace the email addr
            score: null,
            total_score: null
          }
 
      });
    },
    setQuestionNumber: (state, action ) => {
      state.value =  state.value.map((item, index) => {
        //console.log("XXXXXXXXXXX", action.payload)
        // Find the item with the matching student name
        if(item.student_name === action.payload.student_name) {
          // Return a new object
          return {
            ...item,  // copy the existing item
            question_number: action.payload.question_number,  // replace the email addr
            score: null,
          }
        }
        // Leave every other item unchanged
        return item;
      });
    },
    setScores: (state, action ) => {
      state.value =  state.value.map((item, index) => {
        //console.log("XXXXXXXXXXX", action.payload)
        // Find the item with the matching id
        if(item.student_name === action.payload.student_name) {
          // Return a new object
          return {
            ...item,  // copy the existing item
            score: action.payload.score,  // replace the score
            total_score: action.payload.total_score
          }
        }
        // Leave every other item unchanged
        return item;
      });
    },
  },
})

// Action creators are generated for each case reducer function
export const { addLiveScore, getScore, resetLiveScores, clearScores, setQuestionNumber, setScores} = scoreSlice.actions

export default scoreSlice.reducer