//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const mySlice = createSlice({
  name: 'quizattemptidreducer',
  initialState,
  reducers: {
    setQuizAttemptId: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setQuizAttemptId } = mySlice.actions

export default mySlice.reducer