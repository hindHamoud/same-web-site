const USER_ACTION_TYPE = {
    USER_LOGIN: "USER_LOGIN",
    USER_LOGOUT: "USER_LOGOUT",
    USER_REGISTER: "USER_REGISTER"
}

const INIT_STATE = {
    name: "",
    email: "",
    id: "",
    password: "",
    role: ""
}

const userLogin = (data) => {
    return {
        type: USER_ACTION_TYPE.USER_LOGIN,
        payload: data
    }
}

const userLogout = (data) => {
    return {
        type: USER_ACTION_TYPE.USER_LOGOUT,
        payload: data
    }
}

const userReigster = (data) => {
    return {
        type: USER_ACTION_TYPE.USER_LOGIN,
        payload: data
    }
}

const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_ACTION_TYPE.USER_LOGIN:
            return {...state, ...action.payload };
        default:
            return state;
    }
}

export {
    userReducer,
    userLogin,
    userLogout,
    userReigster
};