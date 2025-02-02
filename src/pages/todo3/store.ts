import { configureStore } from "@reduxjs/toolkit";
import Todo3Reducer from "./todo3Slice";

export const store = configureStore({
  reducer: {
    todo: Todo3Reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
