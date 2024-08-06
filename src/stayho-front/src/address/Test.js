import {Button} from "react-bootstrap";
import InsertAddress from "./InsertAddress";
import {useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
let Test = () => {
    let id = parseInt(useParams().id);
    let [modalState, setModalState] = useState(false)
    let [addressData, setAddressData] = useState({})
    let onPopup = () => {
        setModalState(true)
    }
    let onInsert = async () => {
        let response = await axios.post("http://localhost:8080/hotel/insert", addressData, {})
        if (response.status === 200) {
            window.alert("위치가 추가되었습니다.")
            // window.location.href="/"
        }
    }
    let onUpdate = async () => {
        let response = await axios.post("http://localhost:8080/hotel/update", addressData, {})
        if (response.status === 200) {
            window.alert("수정되었습니다.")
        }
    }
    let onDelete = async () => {
        let response = await axios.get("http://localhost:8080/hotel/delete/" + id)
        if (response.status === 200){
            window.alert("삭제되었습니다.")
        }
    }

    return (
        <div>
            <Button onClick={onPopup}>
                주소찾기
                <InsertAddress setModalState={setModalState} modalState={modalState} hotelId={id}
                               setAddressData={setAddressData}/>
            </Button>
            <div>{addressData.address}</div>
            <Button onClick={onInsert}>추가하기</Button>
            <Button onClick={onUpdate}>수정하기</Button>
            <Button onClick={onDelete}>삭제하기</Button>
        </div>
    )
}
export default Test