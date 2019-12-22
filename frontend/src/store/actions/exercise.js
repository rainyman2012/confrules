import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOSTNAME } from "../../static";

export const exerciseUpdateForm = (data) => {
  console.log("this is data in action:", data);

  return {
    type: actionTypes.EXERCISE_UPDATE_FORM,
    data: data
  };
};

export const exerciseStart = () => {
  return {
    type: actionTypes.EXERCISE_START
  };
};

export const exerciseSuccess = data => {
  return {
    type: actionTypes.EXERCISE_SUCCESS,
    form: data
  };
};

export const exerciseFetched = data => {
  return {
    type: actionTypes.EXERCISE_SUCCESS_FETCH,
    form: data,
  };
};

export const exerciseFail = error => {
  return {
    type: actionTypes.EXERCISE_FAIL,
    error: error
  };
};

export const dataClear = () => {
  return {
    type: actionTypes.EXERCISE_CLEARED
  };
};

export const setGAClientId = clientId => {
  return {
    type: actionTypes.EXERCISE_SET_CLIENTID,
    clientId: clientId
  };
};

export const exerciseCreate = (token) => {
  return dispatch => {
    dispatch(exerciseStart());
    axios
      .post(`${HOSTNAME}/api/program/`, {}, {
        headers: {
          Authorization: "Token " + token
        }
      })
      .then(res => {
        const data = res.data;
        dispatch(exerciseSuccess(data));
      })
      .catch(err => {
        dispatch(exerciseFail(err));
      });
  };
};

export const fetchAllExerciseTable = (token, pk) => {
  return dispatch => {
    dispatch(exerciseStart());
    axios
      .get(`${HOSTNAME}/api/program/${pk}/`, {
        headers: {
          Authorization: "Token " + token
        }
      })
      .then(res => {
        const data = res.data;
        console.log("whole pile of form data", data);
        dispatch(exerciseFetched(data));
      })
      .catch(err => {
        dispatch(exerciseFail(err));
      });
  };
};

export const updateUserExerciseTable = (data, token, pk) => {
  return dispatch => {
    dispatch(exerciseStart());
    console.log("this is my pk", pk);

    axios
      .patch(
        `${HOSTNAME}/api/program/${pk}/`, data,
        {
          headers: {
            Authorization: "Token " + token
          }
        }
      )
      .then(res => {
        const data = res.data;
        console.log("these data have updated", data);
        dispatch(exerciseUpdateForm(data))
      })
      .catch(err => {
        dispatch(exerciseFail(err));
      });
  };


}
