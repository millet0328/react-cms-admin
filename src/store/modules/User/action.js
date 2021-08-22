import { Admin } from '../../../api/';

//更新用户资料
function update_profile(profile) {
    return {
        type: "UPDATE_PROFILE",
        profile,
    }
}

// 加载用户资料--thunk
function load_profile(id) {
    return async function (dispatch, getState) {
        let { status, data } = await Admin.info({ id });
        if (status) {
            // 储存至store中
            dispatch(update_profile(data));
        }
        return { status, data }
    }
}

//更新用户资料--thunk
function edit_profile(profile) {
    return async function (dispatch, getState) {
        let { status, msg } = await Admin.edit(profile);
        if (status) {
            // 更新store中数据
            dispatch(update_profile(profile));
        }
        return { status, msg }
    }
}

export {
    update_profile,
    load_profile,
    edit_profile,
}