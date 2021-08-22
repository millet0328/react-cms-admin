// 引用数据类型的state，每次修改必须return新对象（数组）
let initState = {
    profile: {},
}

function user(state = initState, action) {
    switch (action.type) {
        case "UPDATE_PROFILE":
            state.profile = action.profile;
            return { ...state };
        default:
            return state;
    }
}

export default user;