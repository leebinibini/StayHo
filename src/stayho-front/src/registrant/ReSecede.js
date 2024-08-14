import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'

let ReSecede = () => {
    // 비밀번호 입력할 창
    // 비밀번호 맞는지 비교하기
    let location = useLocation()
    let registrantInfo = location.state.registrantInfo

    let [inputs, setInputs] = useState({
        id: registrantInfo.id,
        email: registrantInfo.email,
        password: "",
        name: registrantInfo.name,
        tel: registrantInfo.tel,
        role: registrantInfo.role
    })

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    let navigate = useNavigate()
    let moveToNext = () => {
        navigate('/hotel/showList')
    }

    let onSecede = async (e) => {
        e.preventDefault()
        let resp = await axios.post('http://localhost:8080/registrant/withdraw', inputs, {
            withCredentials: true
        })
        if (resp.status === 200)
            moveToNext()
    }
    return (
        <form>
            <Container>
                <Table>
                    <tr>
                        <td>비밀번호를 입력해주세요</td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <FormControl
                            name={'password'}
                            type={'password'}
                            value={inputs.password}
                            onChange={onChange}/>
                    </tr>
                    <tr>
                        <Button onClick={onSecede}>탈퇴하기</Button>
                    </tr>
                </Table>
            </Container>
        </form>
    )
}
export default ReSecede
