export const SET_USER = 'SET_USER';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.user };
    default:
      return state;
  }
};
