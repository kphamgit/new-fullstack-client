import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false
}

export const mySlice = createSlice({
  name: 'livequizflagreducer',
  initialState,
  reducers: {
    setLiveQuizFlag: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLiveQuizFlag } = mySlice.actions

export default mySlice.reducer