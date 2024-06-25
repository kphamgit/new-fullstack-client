import {configureStore} from "@reduxjs/toolkit"
import quizAttemptIdReducer from './quiz_att_id.js'
import rootpathReducer from './rootpath.js'
import subcategoryReducer from "./subcategory.js"
import userReducer from "./user.js"
import livescoreReducer from "./livescores.js"
import livequestionReducer from "./livequestion.js"
import livequizflagReducer from "./livequizflag.js"
import livequizidReducer from "./livequizid.js"
import showlivequestionReducer from "./showlivequestion.js"
import nextbuttonflagReducer from "./nextbuttonflag.js"
//redux persist
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedUserReducer = persistReducer(persistConfig, userReducer)
  const persistedRootpathReducer = persistReducer(persistConfig, rootpathReducer)

  //export default configureStore({
    //rootpath: rootpathReducer,
export const store = configureStore({
    reducer: {
        quiz_attempt_id: quizAttemptIdReducer,
        livequizid: livequizidReducer,
        rootpath: persistedRootpathReducer,
        subcategory: subcategoryReducer,
        user: persistedUserReducer,
        livescore: livescoreReducer,
        livequestion: livequestionReducer,
        nextbuttonflag: nextbuttonflagReducer,
        showlivequestion: showlivequestionReducer,
        livequizflag: livequizflagReducer,
    }
})

export const persistor = persistStore(store)