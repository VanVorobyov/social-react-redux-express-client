import { User } from "../utils/types"
import { createSlice } from "@reduxjs/toolkit"
import { UserApi } from "../services/userApi"

interface IInitialState {
  user: User | null
  isAuthenticated: boolean
  users: User[]
  current: User | null
  token?: string
}

const initialState: IInitialState = {
  user: null,
  isAuthenticated: false,
  users: [],
  current: null,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null
      state.isAuthenticated = false
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        UserApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token
          state.isAuthenticated = true
        },
      )
      .addMatcher(
        UserApi.endpoints.current.matchFulfilled,
        (state, { payload }) => {
          state.isAuthenticated = true
          state.current = payload
        },
      )
      .addMatcher(
        UserApi.endpoints.getUserById.matchFulfilled,
        (state, { payload }) => {
          state.user = payload
        },
      )
  },
})

export const { logout, resetUser } = slice.actions
export default slice.reducer
