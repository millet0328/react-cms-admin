import { connect } from "react-redux";
import { create_toggle } from "../../store/modules/Menu/action";
import { load_profile } from '../../store/modules/User/action';
import NavBar from "./NavBar";

// 将store中的state映射到NavBar组件的props中
const mapStateToProps = (state) => {
    return {
        isCollapsed: state.menu.isCollapsed,
        profile: state.user.profile,
    }
}
// 给NavBar组件注入onToggle、onLoadProfile事件，此事件分发action。
const mapDispatchToProps = (dispatch) => {
    return {
        onToggle: () => {
            dispatch(create_toggle())
        },
        onLoadProfile: (id) => {
            dispatch(load_profile(id))
        }
    }
}
// NavBar展示组件  ==>  包裹一层容器组件
let Index = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default Index;