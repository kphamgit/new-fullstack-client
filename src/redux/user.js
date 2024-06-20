//import { faL } from '@fortawesome/free-solid-svg-icons'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {username:'', role: '', level: ''},
}

export const mySlice = createSlice({
  name: 'userreducer',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { clear, setUser } = mySlice.actions

export default mySlice.reducer