import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {ko} from "date-fns/locale";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

let ReservationInsert = () => {
    let location = useLocation();
    let navigate = useNavigate();

    let roomId = location.state.roomId
    let price = location.state.price;

    let [inputs, setInputs] = useState({
        checkIn: null,
        checkOut: null,
        roomId: roomId,
        memberId: 1,
    })

    let [startDate, setStartDate] = useState(null);
    let [endDate, setEndDate] = useState(null);

    let onDateChange = (dates) => {
        let [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    let change = () =>{
        setInputs(inputs =>({
            ...inputs,
            checkIn: startDate,
            checkOut: endDate
        }))
    }

    let moveToNext = (id) => {
        navigate(`/reservation/showOne/${id}}`)
    }

    let onSubmit = async (e) => {
        e.preventDefault()
        try{
            let resp= await axios.post("http://localhost:8080/reservation/insert", inputs)
            if(resp.data.resultId !== undefined){
                moveToNext(resp.data.resultId)
            }
        } catch (error){
            console.error(error)
        }
    }

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped hover className={"text-center"}>
                    <thead>
                    <tr>
                        <td colSpan={2}><h2>방 예약</h2></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <h4>예약날짜 정하기</h4>
                            <DatePicker
                                showIcon
                                locale={ko}
                                minDate={new Date()}
                                dateFormat={'yyyy-MM-dd'}
                                onChange={onDateChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                inline
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>방 가격: {price}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={'text-center'}>
                            <Button onClick={change} type={"submit"}>
                                예약하기
                            </Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    )
}

export default ReservationInsert