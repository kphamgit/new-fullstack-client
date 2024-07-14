import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: ''
}

export const mySlice = createSlice({
  name: 'livequizidreducer',
  initialState,
  reducers: {
    clearLiveQuizId: (state) => {
      state.value = ''
    },
    setLiveQuizId: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clearLiveQuizId, setLiveQuizId } = mySlice.actions

export default mySlice.reducer