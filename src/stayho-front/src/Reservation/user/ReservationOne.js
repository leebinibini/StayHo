import {Button, Container, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";

let ReservationOne = () =>{
    let [data,setData] = useState({})
    let params = useParams()
    let id = parseInt(params.id)

    let navigate = useNavigate()

    let goBack = () =>{
        navigate(-1)
    }

    let update = (id) => {
        navigate('/reservation/update/' + id);
    }

    useEffect(() => {
        let selectOne = async () => {
            try{
                let resp = await axios.get("http://localhost:8080/reservation/one/" + id,{
                    withCredentials: true
                })
                if(resp.status === 200){
                    console.log(resp.data)
                    setData(resp.data)
                }
            }catch (e){
                console.log(e)
            }
        }
        selectOne()
    },[])

    return (
        <Container className={"mt-3"}>
            <Button onClick={goBack}>뒤로가기</Button>
            <Button className={"m-lg-1"}>날짜 변경하기</Button>
            {data.status ? <Button className={"m-lg-1"}>취소하기</Button> :
                           <Button className={"m-lg-1"}>결재하기</Button>}
            <Table striped className={"table-dark mt-1"}>
                <thead>
                    <tr>
                        <td colSpan={2}><h3>예약 상세정보</h3></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}>예약자: {data.memberId}</td>
                    </tr>
                    <tr>
                        <td>
                            객실: {data.roomId} &nbsp
                            <Button size={"sm"}>객실 정보</Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>체크인: {dayjs(data.checkIn).format('YYYY-MM-DD HH:mm:ss')}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>체크아웃: {dayjs(data.checkOut).format('YYYY-MM-DD HH:mm:ss')}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>사장: {data.confirmed ? "완료":"대기"}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>사용자: {data.status ? "완료":"대기"}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default ReservationOne;