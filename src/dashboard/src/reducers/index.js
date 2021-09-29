import {combineReducers} from 'redux-immutable';
import {routerReducer} from 'react-router-redux';
import mainReducer from "./main-reducer";

export default combineReducers({
    routing: routerReducer,
    mainReducer
});
