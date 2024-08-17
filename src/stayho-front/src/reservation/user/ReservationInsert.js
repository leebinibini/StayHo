import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ko} from "date-fns/locale";
import 'react-datepicker/dist/react-datepicker.css'

let ReservationInsert = () => {
    let location = useLocation();
    let navigate = useNavigate();
    // let memberInfo = location.state.memberInfo;

    // (startDate, endDate, price, roomId)

    let [inputs, setInputs] = useState({

        checkIn: null,
        checkOut: null,
        roomId: 3,
        memberId: 1,
    })

    let [roomDescription, setRoomDescription] = useState({
        room:{
            bath: '',
            bed: '',
            hotelId: '',
            id: '',
            limitPeople: '',
            price: '',
            roomId: '',
            surcharge: '',
            type: '',
            view: ''
        }
    })

    let moveToNext = (id) => {
        navigate(`/reservation/showOne/${id}}`)
        // ,{state: {memberInfo: memberInfo}}
    }

    let onSubmit = async (e) => {
        e.preventDefault()
        try {
            let resp = await axios.post("http://localhost:8080/reservation/insert", inputs)
            if (resp.data.resultId !== undefined) {
                moveToNext(resp.data.resultId)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get("http://localhost:8080/room/select/" + inputs.roomId)
                .catch((e) => {
                    console.log(e)
                })
            if (resp.status === 200) {
                console.log(resp.data)
                setRoomDescription(resp.data)
            }
        }
        selectList()
    }, [])

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <div>
                    <h2>숙박 시설 세부 정보</h2>
                    <div>
                        <h3>숙박 시설 특징</h3>
                        <div>

                        </div>
                    </div>
                    <div>
                        <h3>{roomDescription.room.type}</h3>
                        <div>
                            <span>객실에 포함된 사항: </span>
                            <span className={"me-2"}>{roomDescription.room.bed !==0 ? '침대 ' + roomDescription.room.bed +'개' : ''}</span>
                            <span className={"me-2"}>{roomDescription.room.bath ? '욕조 ○ ' : '욕조 X'}</span>
                            <span className={"me-2"}>뷰 {roomDescription.room.view}</span>
                        </div>
                    </div>
                </div>
            </form>
        </Container>
    )
}

export default ReservationInsert