import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Container, FormControl, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

let ReAuth = () => {
    let [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    let navigate = useNavigate()

    let onSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('email', inputs.email)
        formData.append('password', inputs.password)

        let response = await axios({
            url: 'http://localhost:8080/member/auth',
            method: "POST",
            data: formData,
            withCredentials: true
        })

        console.log(response)


        if (response.status === 200 && response.data.result === 'success') {
            let registrantInfo = {
                id: response.data.id,
                email: response.data.email,
                password: response.data.password,
                name: response.data.name,
                tel: response.data.tel,
                role: response.data.role
            }
            navigate('/hotel/write', {state: {registrantInfo: registrantInfo}})


        }
    }

    let goRegister = () => {
        navigate('/registrant/reRegister')
    }


    return (
        <form onSubmit={onSubmit}>
            <Container>
                <Table>
                    <thead>
                    <tr>
                        <td colSpan={2}>로그인</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>아이디</td>
                        <td><FormControl type={'text'} name={'email'} value={inputs.username}
                                         onChange={onChange} placeholder="email"/></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td colSpan={2}>
                            <FormControl type={'password'} name={'password'} value={inputs.password}
                                         onChange={onChange} placeholder="password"/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type={'submit'}>로그인</Button>
                            <Button onClick={goRegister}>회원가입</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        </form>
    )
}
export default ReAuth