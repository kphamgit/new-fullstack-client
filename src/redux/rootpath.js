//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const mySlice = createSlice({
  name: 'rootpathreducer',
  initialState,
  reducers: {
    clear: (state) => {
      state.value = ''
    },
    setRootPath: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clear, setRootPath } = mySlice.actions

export default mySlice.reducer