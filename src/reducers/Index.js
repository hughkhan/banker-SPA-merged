/**
 * Created by Hugh on 10/13/2018.
 */
import * as types from "types/ActionTypes";

const initialState = {
  userInfo: {
    user_id: 1036,
    user_name: "Jane",
    banker_name: "Jane",
    role: "CUSTOMER",
    loggedIn: false
  },
  entity_id: 1033,
  template_id: 1104,
  mainTitle: "Dashboard",
  //URL: "http://172.16.1.62:3000"
  //URL: "http://192.168.7.169:3000"
  //URL: "localhost:3000"
  //URL: "http://10.10.10.25:3000"
  URL: "http://192.168.7.142:3000"
  //URL: "http://api.giveplums.com"
};

const postReducer = function(state = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_STATE:
      return Object.assign({}, state, { current_state: action.current_state });

    case types.SET_MAIN_TITLE:
      return Object.assign({}, state, { mainTitle: action.mainTitle });

    case types.SET_USER_INFO:
      return Object.assign({}, state, { userInfo: action.userInfo });

    default:
      return state;
  }
};

export default postReducer;
