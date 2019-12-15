import axios from "axios";
import * as actionType from "./actionTypes";
//==================================================== Statistics

export const generalSetLanguage = language => {
  return {
    type: actionType.GENERAL_LANGUAGE_SET,
    language: language
  };
};

export const setLanguage = language => {
  return dispatch => {
    dispatch(generalSetLanguage(language));
  };
};
