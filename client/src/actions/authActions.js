export const loginRequest = () => {
    return {
      type: LOGIN_REQUEST
    };
};
  
  

export const login = (username, password) => {
    var reqData = {
      username: username,
      password: password
    };
    return function (dispatch) {
      dispatch(loginRequest());
      axios
        .post('/api/login', reqData)
        .then((res) => {
          localStorage.setItem('jwtheader', res.data.token);
          localStorage.setItem('username', username);
          dispatch({
            type: LOGIN_SUCCESS,
            username: username
          });
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
    };
};