import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  uuid: null,
  name: null,
  error: null,
  loading: false,
  clientId: "",
  form: []
};

const exerciseUpdateForm = (state, action) => {
  const tempform = state.form.push(action.data)
  return updateObject(state, {
    form: tempform
  });
}

const exerciseStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const exerciseSuccess = (state, action) => {
  return updateObject(state, {
    form: action.data,
    error: null,
    loading: false
  });
};

const exerciseSuccessFetch = (state, action) => {
  return updateObject(state, {
    name: action.name,
    form: action.form,
    error: null,
    loading: false
  });
};

const exerciseFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const exerciseClear = (state, action) => {
  return updateObject(state, {
    name: "",
    uuid: ""
  });
};

const exerciseSetGAClientId = (state, action) => {
  return updateObject(state, {
    clientId: action.clientId
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EXERCISE_UPDATE_FORM:
      return exerciseUpdateForm(state, action);
    case actionTypes.EXERCISE_START:
      return exerciseStart(state, action);
    case actionTypes.EXERCISE_SUCCESS:
      return exerciseSuccess(state, action);
    case actionTypes.EXERCISE_SUCCESS_FETCH:
      return exerciseSuccessFetch(state, action);
    case actionTypes.EXERCISE_FAIL:
      return exerciseFail(state, action);
    case actionTypes.EXERCISE_CLEARED:
      return exerciseClear(state, action);
    case actionTypes.EXERCISE_SET_CLIENTID:
      return exerciseSetGAClientId(state, action);
    default:
      return state;
  }
};

export default reducer;
