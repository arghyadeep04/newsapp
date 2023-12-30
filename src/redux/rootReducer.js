import { combineReducers } from "redux";
import { newsReducer } from "./news/news.reducer";
import { userReducer } from "./user/user.reducer";
import storage from 'redux-persist/lib/storage'; //localstorage
import persistReducer from "redux-persist/es/persistReducer";
import { alertReducer } from "./alert/alert.reducer";
const persistConfig={
    key:'root',
    storage,
    whitelist:["user"] //who will be stored
}

const rootReducer=combineReducers({
    news:newsReducer,
    user:userReducer,
    alerts:alertReducer
})

export default persistReducer(persistConfig,rootReducer);