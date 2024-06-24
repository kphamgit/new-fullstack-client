import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null
}

export const mySlice = createSlice({
  name: 'nextbuttonflagrreducer',
  initialState,
  reducers: {
    clearNextButtonFlag: (state) => {
      state.value = null
    },
    setNextButtonFlag: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clearNextButtonFlag, setNextButtonFlag } = mySlice.actions

export default mySlice.reducer