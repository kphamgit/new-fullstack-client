import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false
}

export const mySlice = createSlice({
  name: 'livequestionreducer',
  initialState,
  reducers: {
    setShowLiveQuestion: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setShowLiveQuestion } = mySlice.actions

export default mySlice.reducer