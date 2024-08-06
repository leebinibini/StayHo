import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Form, FormCheck, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

let ListForProvider = () => {
    let params = useParams()
    let hotelId = parseInt(params.id);
    let [rooms, setRooms] = useState({roomList: []})
    let [checkInputs, setCheckInputs] = useState([])
    let navigate = useNavigate()

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
        navigate("/room/update/" + id)
    }
    let moveToInsert = () => {
        navigate("/room/insert/" + hotelId)
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
                navigate("/room/management/" + hotelId)
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><Button onClick={moveToInsert}>객실 추가하기</Button></td>
                    </tr>
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
                        <tr>
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
                        <td><Button type={'submit'}>객실 삭제하기</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </Form>
        </Container>
    )
}
export default ListForProvider