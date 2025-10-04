import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@/redux/services/authServices'
import authTokenReducer from '@/redux/features/authTokenSlice'
import { blogsApi } from '@/redux/services/blogServices'

export const store = configureStore({
  reducer: {
    auth: authTokenReducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, blogsApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
