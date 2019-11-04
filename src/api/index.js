import newId from '../util/idGenerator';
import axios from 'axios';
import decode from 'jwt-decode';

const fetcher = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    // @ts-ignore
    //'Authorization': 'Bearer '+localStorage.session
  }
});

export const createUser = (params) => {
  return fetcher.post("/users", params).then(res => res.data);
};

export const login = (identifier, password) => {
  return fetcher.post("/auth/local", {
    identifier,
    password
  }).then(res => {
    // @ts-ignore
    localStorage.session = res.data.jwt;
    fetcher.defaults.headers.common['Authorization'] = 'Bearer '+res.data.jwt;
    return decode(res.data.jwt);
  });
};

export const logout = () => {
  // @ts-ignore
  delete localStorage.session;
  return Promise.resolve();
};

export const fetchCurrentUser = () => {
  return fetcher.get("/users/me").then(res => {
    return res.data;
  });
};

export const fetchUserSurveys = (user) => {
  return fetcher.get(`/surveys?user._id=${user.id}`).then(res => res.data);
};

export const fetchResults = (surveyId) => {
  return fetcher.get(`/results?survey=${surveyId}`).then(res => res.data);
};

export const createSurvey = (userId, initSurvey) => {
  initSurvey.user={
    _id:userId
  };
  return fetcher.post(`/surveys`, initSurvey).then(res => res.data);
};

export const saveResult = (surveyId, result) => {
  let body = {
    survey: surveyId,
    result: result
  }
  return fetcher.post(`/results`, body);
};


export const fetchSurvey = (surveyId) => {
  return fetcher.get(`/surveys/${surveyId}`).then(res => res.data);
};

export const deleteSurvey = surveyId => {};

export const updateSurvey = (survey) => {
  return fetcher.put(`/surveys/${survey.id}`, survey).then(res => res.data);
};

export const deleteResults = (surveyId, results) => {
  return Promise.all(results.map(result => fetcher.delete(`/surveys/${surveyId}/results/${result.id}`)));
};
