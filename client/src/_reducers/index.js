import { combineReducers } from 'redux';
import user from './user_reducer';
import chat from './chat_reducer';
import story from "./story_reducer"
const rootReducer = combineReducers({
    user,
    chat,
    story
});

export default rootReducer;