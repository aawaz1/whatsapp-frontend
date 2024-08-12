import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import createFilter from 'redux-persist-transform-filter';
import  {persistReducer, persistStore}  from "redux-persist";
import { getDefaultNormalizer } from "@testing-library/react";

// saveuseronlyfilter
const saveUserOnlyFilter = createFilter("user" , ["user"]);


// persist Config
const persistConfig = {
    key : "user",
    storage,
    whitelist : ["user"],
    trasnform : [saveUserOnlyFilter],

}

const rootReducer = combineReducers({
    user : userSlice
})

const persistedReducer = persistReducer(persistConfig , rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true,

})


export const persist = persistStore(store);