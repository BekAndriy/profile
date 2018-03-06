import { WINDOW_PROPS, PROFILES } from '../constants';
import { combineReducers } from 'redux';

const windowProps = (state = {}, action) => {
    if( action.type === WINDOW_PROPS ) {
        return state.windowProps = action.windowProps
    }
    return state
};

const profiles = (state = {}, action) => {
    if( action.type === PROFILES ) {
        return state = action.profiles
    }
    return state
};


export default combineReducers({
    windowProps,
    profiles
});