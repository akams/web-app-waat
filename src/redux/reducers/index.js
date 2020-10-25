import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';

// import user from './user/user';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
  });

export default rootReducer;
