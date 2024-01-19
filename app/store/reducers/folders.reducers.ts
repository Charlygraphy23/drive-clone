import { createReducer, createAction, current } from '@reduxjs/toolkit'

const initialState = {
    loading : false,
    data: [],
    error : ""
}

export default createReducer(initialState, (builder) => {
    builder.addCase(addTodo, (state, action) => {
      state.push(action.payload)
      console.log(current(state))
    })
  })