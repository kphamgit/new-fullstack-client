import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null
}

export const mySlice = createSlice({
  name: 'livequestionreducer',
  initialState,
  reducers: {
    clearQuestion: (state) => {
      state.value = null
    },
    setQuestion: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clearQuestion, setQuestion } = mySlice.actions

export default mySlice.reducer