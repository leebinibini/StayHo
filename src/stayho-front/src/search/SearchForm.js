import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Form, FormControl, FormFloating, FormSelect, Table} from "react-bootstrap";
import DatePicker from "react-date-picker";
import {useNavigate} from "react-router-dom";

let SearchForm = () => {
    let [sidos, setSidos] = useState([])
    let [sigungus, setSigungus] = useState([])
    let [startDate, setStartDate] = useState(new Date())
    let [endDate, setEndDate] = useState(new Date())
    let [inputs, setInputs] = useState({
        sido: '',
        sigungu: '',
        people: 2,
        rooms: 1,
        checkinDate: new Date(),
        checkoutDate: new Date()
    })
    let navigate = useNavigate()
    useEffect(() => {
        let onLoad = async () => {
            let response = await axios.get("http://localhost:8080/location/sido")
            if (response.status === 200) {
                setSidos(response.data.sido)
            }
        }
        onLoad()
    }, []);

    let onSido = async (e) => {
        let sido = e.target.value;
        setInputs({
            ...inputs,
            sido: sido
        })
        let response = await axios.get("http://localhost:8080/location/sigungu/" + sido)
        if (response.status === 200) {
            setSigungus(response.data.sigungu)
        }
    }

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    let selectDate = (date, type) => {
        if (type === 'start') {
            setStartDate(date)
            setInputs({
                ...inputs,
                checkinDate: date
            })
        } else {
            setEndDate(date)
            setInputs({
                ...inputs,
                checkoutDate: date
            })
        }
        console.log(new Date().setDate(...Math.abs(inputs.checkoutDate-inputs.checkinDate)))
    }

    let onSearch = async (e) => {
        e.preventDefault()
        let response = await axios.post("http://localhost:8080/search", inputs, {})
        if (response.status === 200) {
            navigate("/search", {state: response.data.list})
        }
    }

    return (
        <Container>
            <Form onSubmit={onSearch}>
                <Table>
                    <tbody>
                    <tr>
                        <td>
                            <FormSelect onChange={onSido} name='sido'>
                                {sidos.map(sido => (
                                    <option value={sido} key={sido}>{sido}</option>
                                ))}
                            </FormSelect>
                        </td>
                        <td>
                            <FormSelect name='sigungu' onChange={onChange}>
                                {sigungus.map(sigungu => (
                                    <option value={sigungu} name='sigungu' key={sigungu}>{sigungu}</option>
                                ))}
                            </FormSelect>
                        </td>
                        <td>
                            <DatePicker onChange={(date) => selectDate(date, 'start')} value={startDate}
                                        minDate={new Date()} required={true} name='startDate'/>
                        </td>
                        <td>
                            <DatePicker onChange={(date) => selectDate(date, 'end')} value={endDate}
                                        minDate={inputs.checkinDate} required={true} name='endDate'/>
                        </td>
                        <td>
                            <FormFloating>
                                <FormControl type={'number'} value={inputs.people} name={'people'}
                                             placeholder="people" id='people' onChange={onChange}/>
                                <label htmlFor='people'>숙박인원</label>
                            </FormFloating>
                        </td>
                        <td>
                            <FormFloating>
                                <FormControl type={'number'} value={inputs.rooms} name={'rooms'}
                                             placeholder="rooms" id='rooms' onChange={onChange}/>
                                <label htmlFor='rooms'>객실수</label>
                            </FormFloating>
                        </td>
                        <td>
                            <Button type={'submit'}>검색하기</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Form>
        </Container>
    )
}
export default SearchForm