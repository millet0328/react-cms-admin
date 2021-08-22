import { connect } from "react-redux";
import Framework from "./Framework";

// 将store中的state映射到Framework组件的props中
const mapStateToProps = (state) => {
    return {
        isCollapsed: state.menu.isCollapsed,
    }
}
// Framework展示组件  ==>  包裹一层容器组件
let Index = connect(mapStateToProps)(Framework)
export default Index;