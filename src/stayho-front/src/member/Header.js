import {useLocation} from "react-router-dom";
import Menu from "../admin/Menu";
import MemberMenu from "./MemberMenu";

let Header = () => {
    let location = useLocation();
    let { state } = location;

    let adminInfo = state?.adminInfo;
    let memberInfo = state?.memberInfo;

    return(
        <header>
            {adminInfo ? <Menu/> : memberInfo ? <MemberMenu/> : <MemberMenu/>}
        </header>
    )
}

export default Header