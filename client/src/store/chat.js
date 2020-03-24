const INIT_STATE = {
    messages: [],
}

const CHAT_ACTION_TYPE = {
    NEW_CHAT: 'NEW_CHAT',
    SET_ALL_CHAT: 'SET_ALL_CHAT'
}

const setAllChat = (data) => {
    return {
        type: CHAT_ACTION_TYPE.SET_ALL_CHAT,
        payload: data
    }
}

const setNewChat = (data) => {
    console.log(data);
    return {
        type: CHAT_ACTION_TYPE.NEW_CHAT,
        payload: data
    }
}

const chatReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHAT_ACTION_TYPE.NEW_CHAT:
            return {...state, messages: [...state.messages, action.payload] };
        case CHAT_ACTION_TYPE.SET_ALL_CHAT:
            return {...state, messages: action.payload };
        default:
            return state;
    }
}

export { chatReducer, setAllChat, setNewChat };