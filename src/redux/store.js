import {configureStore} from "@reduxjs/toolkit"
import quizAttemptIdReducer from './quiz_att_id.js'
import rootpathReducer from './rootpath.js'
import subcategoryReducer from "./subcategory.js"
import userReducer from "./user.js"
import livescoreReducer from "./livescores.js"
import livequestionReducer from "./livequestion.js"
import livequizflagReducer from "./livequizflag.js"
import showlivequestionReducer from "./showlivequestion.js"

export default configureStore({
    reducer: {
        quiz_attempt_id: quizAttemptIdReducer,
        rootpath: rootpathReducer,
        subcategory: subcategoryReducer,
        user: userReducer,
        livescore: livescoreReducer,
        livequestion: livequestionReducer,
        showlivequestion: showlivequestionReducer,
        livequizflag: livequizflagReducer,
    }
})