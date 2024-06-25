import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false
}

export const mySlice = createSlice({
  name: 'livequizidreducer',
  initialState,
  reducers: {
    clearLiveQuizId: (state) => {
      state.value = null
    },
    setLiveQuizId: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clearLiveQuizId, setLiveQuizId } = mySlice.actions

export default mySlice.reducer