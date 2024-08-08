import {Button, Container, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";
import Modal from "react-modal";

let ReservationOne = () =>{
    let [data,setData] = useState({})
    let params = useParams()
    let id = parseInt(params.id)
    let navigate = useNavigate()

    let [isOpen, setIsOpen] = useState(false);
    let [open, setOpen] = useState(false);

    let openModal = () => {
        setIsOpen(true);
    }
    let openModal1 = () => {
        setOpen(true);
    }

    let closeModal = () => {
        setIsOpen(false);
    }

    let closeModal1 = () => {
        setOpen(false);
    }

    let goBack = () =>{
        navigate(-1)
    }

    let update = (id) => {
        navigate('/reservation/update/' + id);
    }

    let onDelete = async (e) => {
        let response = await axios.get('http://localhost:8080/reservation/delete/' + id, {
            withCredentials: true
        })
        if (response.status === 200){
            navigate('/reservation/showAll')
        }
    }

    let customStyles = {
        overlay:{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content:{
            width: "300px",
            height: "125px",
            margin: "auto",
            marginBottom: "600px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "20px",
        },
    };

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
            {data.confirmed ? data.status ?
                <Button className={"m-lg-1"} onClick={openModal}>취소하기</Button> :
                <Button className={"m-lg-1"} onClick={openModal1}>결재하기</Button> : ""}
            {data.status ? "" : <Button className={"m-lg-1"} onClick={()=>{update(data.id)}}>날짜 변경하기</Button>}
            <Table striped className={"table-dark mt-1"}>
                <thead>
                    <tr>
                        <td colSpan={2}><h3>예약 상세정보</h3>{data.confirmed ? "" : <sub>*사장님이 수락해야 결재가 가능합니다.</sub>}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}>예약자: {data.memberId}</td>
                    </tr>
                    <tr>
                        <td>
                            객실: {data.roomId} &nbsp;
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
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                <h5>정말로 취소하시겠습니까?</h5>
                <Button onClick={onDelete} className={"m-lg-1"}>예</Button>
                <Button onClick={closeModal}>아니요</Button>
            </Modal>
            <Modal isOpen={open} onRequestClose={closeModal} style={customStyles}>
                <h5>정말로 결재하시겠습니까?</h5>
                <Button className={"m-lg-1"}>예</Button>
                <Button onClick={closeModal1}>아니요</Button>
            </Modal>
        </Container>
    )
}

export default ReservationOne;