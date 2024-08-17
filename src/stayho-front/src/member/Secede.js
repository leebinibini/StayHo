import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'

let Secede = () => {
    // 비밀번호 입력할 창
    // 비밀번호 맞는지 비교하기
    let location = useLocation()
    let memberInfo = location.state.memberInfo

    let [inputs, setInputs] = useState({
        id: memberInfo.id,
        email: memberInfo.email,
        password: "",
        name: memberInfo.name,
        tel: memberInfo.tel,
        role: memberInfo.role
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
        navigate('/')
    }

    let onSecede = async (e) => {
        e.preventDefault()
        let resp = await
            axios.post('http://localhost:8080/member/withdraw', inputs, {
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
export default Secede
