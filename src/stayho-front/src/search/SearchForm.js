import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Form, FormControl, FormFloating, FormSelect} from "react-bootstrap";
import DatePicker from "react-date-picker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

let SearchForm = () => {
    let [sidos, setSidos] = useState([])
    let [sigungus, setSigungus] = useState([])
    let [startDate, setStartDate]= useState(new Date())
    let [endDate, setEndDate]= useState(new Date())
    let [inputs, setInputs]= useState({})
    useEffect(() => {
        let onLoad = async () => {
            let response = await axios.get("http://localhost:8080/location/sido")
            console.log(response.data)
            if (response.status === 200) {
                setSidos(response.data.sido)
            }
        }
        onLoad()
    }, []);
    let onSido = async (e) => {
        let response = await axios.get("http://localhost:8080/location/sigungu/" + e.target.value)
        console.log(response.data)
        if (response.status === 200) {
            setSigungus(response.data.sigungu)
        }
    }
    let onChange=(date, type)=>{

        console.log(date+"date"+type)
        if (type==='start'){
            setStartDate(date)
        }else {
            setEndDate(date)
        }
    }
    return (
        <Container>
            <Form>
                <FormSelect onChange={onSido} name='sido'>
                    {sidos.map(sido => (
                        <option value={sido}>{sido}</option>
                    ))}
                </FormSelect>
                <FormSelect name='sigungu'>
                    {sigungus.map(sigungu => (
                        <option value={sigungu}>{sigungu}</option>
                    ))}
                </FormSelect>
                <DatePicker onChange={(date)=>onChange(date, 'start')} value={startDate} minDate={new Date()}/>
                <DatePicker onChange={(date)=>onChange(date, 'end')} value={endDate} minDate={startDate}/>
                <FormFloating>
                    <FormControl type={'number'} value={inputs.people} name={'people'} defaultValue="2" placeholder="people" id='people'/>
                    <label htmlFor='people'>숙박인원</label>
                    
                </FormFloating>
                <Button type={'submit'}>검색하기</Button>
            </Form>
        </Container>
    )
}
export default SearchForm