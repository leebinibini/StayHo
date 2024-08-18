import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Form, FormCheck, Table} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router-dom";

let RoomForProvider = ({hotelId}) => {
    let [rooms, setRooms] = useState({roomList: []})
    let [checkInputs, setCheckInputs] = useState([])
    let navigate = useNavigate()
    let location = useLocation()
    let memberInfo = location.state.memberInfo

    useEffect(() => {
        let onLoad = async () => {
            let response = await axios.get("http://localhost:8080/room/selectList/" + hotelId, {})
            if (response.status === 200) {
                setRooms(response.data)
            }
        }
        onLoad()
    }, []);

    let MoveToUpdate = (id) => {
        navigate("/room/update/" + id , {state: {memberInfo: memberInfo}})
    }
    let moveToInsert = () => {
        navigate("/room/insert/" + hotelId, {state: {memberInfo: memberInfo}})
    }

    let onChecked = (checked, id) => {
        if (checked) {
            setCheckInputs([
                ...checkInputs,
                id
            ])
        } else {
            setCheckInputs(
                checkInputs.filter((e) => e !== id)
            )
        }
    }
    let onDelete = async () => {
        let isDelete = window.confirm("정말 삭제하시겠습니까?")
        if (isDelete) {
            let response = await axios.post("http://localhost:8080/room/delete", checkInputs, {})
            if (response.status === 200) {
                window.alert("삭제되었습니다.")
            }
        }
    }

    return (
        <Container>
            <Form onSubmit={onDelete}>

                <Table>
                    <thead>
                    <tr>
                        <th>객실 목록</th>
                        <td><Button onClick={moveToInsert}>추가하기</Button></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td>객실 타입</td>
                        <td>최대 입실 인원</td>
                        <td> 금액</td>
                        <td>침대 수</td>
                        <td>욕실 여부</td>
                        <td>뷰</td>
                        <td>할증 비율</td>
                        <td></td>
                    </tr>
                    {rooms.roomList.map(room => (
                        <tr key={room.id}>
                            <td><FormCheck name="deleteRooms" type='checkbox'
                                           onClick={(event) => onChecked(event.target.checked, room.id)}/></td>
                            <td> {room.type}</td>
                            <td> {room.limitPeople}명</td>
                            <td> {room.price}원</td>
                            <td>{room.bed}개</td>
                            <td>{room.bath ? "O" : "X"}</td>
                            <td>{room.view}</td>
                            <td>{room.surcharge}%</td>
                            <td><Button onClick={() => MoveToUpdate(room.id)}>수정하기</Button></td>
                        </tr>

                    ))}
                    <tr>
                        <td><Button type={'submit'} className={'btn-danger'}>객실 삭제하기</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </Form>
        </Container>
    )
}
export default RoomForProvider