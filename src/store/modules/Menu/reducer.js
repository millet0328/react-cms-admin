// reducer：初始化state；修改state
let initState = {
    isCollapsed: false,
}

function menu(state = initState, action) {
    switch (action.type) {
        case 'TOGGLE':
            state.isCollapsed = !state.isCollapsed;
            return { ...state };
        default:
            return state;
    }
}

export default menu;