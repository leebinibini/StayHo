import {Container, FormControl, FormFloating, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

import RoomDescription from "./RoomDescription"
import {useLocation, useParams} from "react-router-dom";
import DatePicker from "react-date-picker";

let ListForUser = () => {

    let [rooms, setRooms] = useState({roomList: []})
    let [roomD, setRoomD] = useState()
    let [description, setDescription] = useState({})
    let [images, setImages] = useState([])
    let [modalOpen, setModalOpen] = useState(false)
    let [startDate, setStartDate] = useState(new Date())
    let [endDate, setEndDate] = useState(new Date())
    let params = useParams()
    let id = parseInt(params.id)
    let [condition, setCondition]= useState({
        sido: '',
        sigungu: '',
        people: 2,
        rooms: 1,
        checkinDate: new Date(),
        checkoutDate: new Date(), //endDate.setDate(startDate.getDate()+1)
        hotelId: id
    })

    useEffect(() => {
        let onLoad = async () => {
            let response = await axios.post("http://localhost:8080/room/selectList", condition, {withCredentials: true})
            if (response.status === 200) {
                setRooms(response.data)
            }
        }
        onLoad()
    }, [condition]);
    

    let selectDate = (date, type) => {
        if (type === 'start') {
            console.log(type, date)
            setStartDate(date)
            setCondition({
                ...condition,
                checkinDate: date
            })
            setEndDate(new Date(endDate.setDate(date.getDate()+1)))
        } else {
            console.log(type, date)
            setEndDate(date)
            setCondition({
                ...condition,
                checkoutDate: date
            })
        }
    }
    let onChange = (e) => {
        let {name, value} = e.target
        setCondition({
            ...condition,
            [name]: value
        })
    }
    let onClick = async (id) => {
        let response = await axios.get("http://localhost:8080/room/description/" + id)
        if (response.status === 200) {
            console.log(response.data)
            setDescription(response.data.description)
            setImages(response.data.image)
            setRoomD(response.data.room)
        }

        setModalOpen(true)
    }
    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <th>객실 목록</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <DatePicker onChange={(date) => selectDate(date, 'start')} value={startDate}
                                    minDate={new Date()} required={true}/>
                    </td>
                    <td>
                        <DatePicker onChange={(date) => selectDate(date, 'end')} value={endDate}
                                    minDate={condition.checkinDate} required={true}/>
                    </td>
                    <td>
                        <FormFloating>
                            <FormControl type={'number'} value={condition.people} name={'people'}
                                         placeholder="people" id='people' onChange={onChange}/>
                            <label htmlFor='people'>숙박인원</label>
                        </FormFloating>
                    </td>
                </tr>
                <tr>
                    <td>객실 타입</td>
                    <td>최대 입실 인원</td>
                    <td> 금액</td>
                </tr>
                {rooms.roomList.map(room => (
                    <Room room={room} onClick={onClick}  key={room.id}/>

                ))}
                </tbody>
            </Table>
            <RoomDescription description={description} modalOpen={modalOpen} setModalOpen={setModalOpen} room={roomD}
                             images={images} reservation={false}/>
        </Container>
    )
}

let Room = ({room, onClick}) => {
    return (
        <tr onClick={() => onClick(room.id)}>
            <td> {room.type}</td>
            <td> {room.limitPeople}명</td>
            <td> {room.price}원</td>
        </tr>
    )
}

export default ListForUser