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
        roomId: 1,
        memberId: 1,
    })

    let [startDate, setStartDate] = useState(null);
    let [endDate, setEndDate] = useState(null);

    let moveToNext = (id) => {
        navigate(`/reservation/showOne/${id}}`)
            // ,{state: {memberInfo: memberInfo}}
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

    useEffect()

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
                        <td colSpan={2} className={'text-center'}>
                            <Button type={"submit"}>
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