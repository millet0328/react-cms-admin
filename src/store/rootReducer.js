import { combineReducers } from "redux";

// 导入子级reducer
import menu from './modules/Menu/reducer';
import user from './modules/User/reducer';

let rootReducer = combineReducers({
    menu,
    user,
});

export default rootReducer;