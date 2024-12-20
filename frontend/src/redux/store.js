// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/adminReducer';
import authReducer from './reducers/authReducer';
import courseReducer from './reducers/courseReducer';
import instructorReducer from './reducers/instructorReducer';
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    course: courseReducer,
    instructor: instructorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;