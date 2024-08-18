import {Button, Container, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from "dayjs";

let ReservationInsert = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let memberInfo = location.state.memberInfo;

    // 초기 state 설정
    let [inputs, setInputs] = useState({
        checkIn: dayjs(location.state?.checkIn),
        checkOut: dayjs(location.state?.checkOut),
        roomId: location.state.roomId,
        memberId: memberInfo.id,
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

    let [hotelDescription, setHotelDescription] = useState({
        hotelId: '',
        swimmingPool: '',
        parking: '',
        restaurant: '',
        smoking: '',
        laundryFacilities: '',
        fitnessCenter: ''
    })

    let moveToNext = (id) => {
        navigate(`/reservation/showOne/${id}`, {state: {memberInfo: memberInfo}})
    }

    // dateCondition 함수 수정
    let dateCondition = (startDt, endDt) => {
        // dayjs 객체로 변환
        let start = dayjs(startDt).startOf('day');
        let end = dayjs(endDt).startOf('day');

        // start와 end의 날짜 차이를 계산
        let btDay  = end.diff(start, 'day');
        return btDay;
    }

    let onSubmit = async (e) => {
        e.preventDefault();
        try {
            let resp = await axios.post("http://localhost:8080/reservation/insert", inputs);
            if (resp.data.resultId !== undefined) {
                moveToNext(resp.data.resultId);
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        let selectList = async () => {
            try{
                let respRoom = await axios
                    .get("http://localhost:8080/room/select/" + location.state.roomId)
                if (respRoom.status === 200) {
                    setRoomDescription(respRoom.data)
                }
                let respHotel = await axios
                    .get("http://localhost:8080/hotelDescription/showOne/" + location.state.hotelId)
                if(respHotel.status === 200){
                    setHotelDescription(respHotel.data)
                }
            } catch (error){
                console.error(error)
            }
        }
        selectList()
    }, [])

    return (
        <Container className="mt-4 p-4 border rounded shadow-sm bg-light">
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <h2 className="mb-3">숙박 시설 세부 정보</h2>
                    <div className="mb-3">
                        <h3 className="mb-2">숙박 시설 특징</h3>
                        <div>
                            {hotelDescription.swimmingPool && <span className="badge bg-primary me-2">수영장</span>}
                            {hotelDescription.parking && <span className="badge bg-primary me-2">주차</span>}
                            {hotelDescription.restaurant && <span className="badge bg-primary me-2">식당</span>}
                            {hotelDescription.smoking && <span className="badge bg-primary me-2">흡연</span>}
                            {hotelDescription.laundryFacilities && <span className="badge bg-primary me-2">세탁시설</span>}
                            {hotelDescription.fitnessCenter && <span className="badge bg-primary me-2">피트니스센터</span>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="mb-2">{roomDescription.room.type}</h3>
                        <div>
                            <span>객실에 포함된 사항: </span>
                            <span className="me-2">{roomDescription.room.bed ? `침대 ${roomDescription.room.bed}개` : ''}</span>
                            <span className="me-2">{roomDescription.room.bath ? '욕조 ○ ' : '욕조 X'}</span>
                            <span className="me-2">뷰 {roomDescription.room.view}</span>
                        </div>
                    </div>
                    <hr />
                    <Table>
                        <tbody>
                        <tr>
                            <td className={'text-end'}>체크인</td>
                            <td className={'text-end w-25'}>{dayjs(location.state.checkIn).format('YYYY-MM-DD')}</td>
                        </tr>
                        <tr>
                            <td className={'text-end'}>체크아웃</td>
                            <td className={'text-end'}>{dayjs(location.state.checkOut).format('YYYY-MM-DD')}</td>
                        </tr>
                        <tr>
                            <td className={'text-end'}>총 일수</td>
                            <td className={'text-end'}>{dateCondition(location.state.checkIn, location.state.checkOut)}</td>
                        </tr>
                        <tr>
                            <td className={'text-end'}>총 가격</td>
                            <td className={'text-end'}>{roomDescription.room.price * dateCondition(location.state.checkIn, location.state.checkOut)}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <div className="text-center mt-4">
                        <Button type="submit" variant="primary">예약하기</Button>
                    </div>
                </div>
            </form>
        </Container>
    )
}

export default ReservationInsert
