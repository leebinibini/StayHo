import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

let Menu = () => {
    let navigate = useNavigate()
    let location = useLocation()
    let adminInfo = location.state.adminInfo

    let onMyPage = () => {
        navigate("/admin/myPage", {state: {adminInfo: adminInfo}})
    }


    return (
        <Button onClick={onMyPage}>마이페이지로</Button>
    )
}
export default Menu