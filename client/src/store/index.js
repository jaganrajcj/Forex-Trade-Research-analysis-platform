import { configureStore } from "@reduxjs/toolkit";
import globalReducer from './global'

export default configureStore({
    reducer: {
        global: globalReducer,
        // [api.reducerPath]: api.reducer,
    },
    // middleware: (getDefault) => getDefault().concat(api.middleware)
})