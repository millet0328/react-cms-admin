import { connect } from "react-redux";
import Setting from './Setting';
import { edit_profile } from "../../../store/modules/User/action";

// 将store中的state映射到Setting组件的props中
const mapStateToProps = (state) => {
    return {
        profile: state.user.profile,
    }
}
// 给Setting组件注入onEdit事件，此事件分发action。
const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: (profile) => {
            return dispatch(edit_profile(profile))
        }
    }
}
let Index = connect(mapStateToProps, mapDispatchToProps)(Setting);
export default Index;