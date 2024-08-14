import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {Button, Container, FormControl, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

let Auth = () => {
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
        try {
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
            if (response.data.role === 'ROLE_ADMIN') {
                let adminInfo = {
                    id: response.data.id,
                    email: response.data.email,
                    name: response.data.name,
                    role: response.data.role,
                    tel: response.data.tel
                }
                navigate('/admin/menu', {state: {adminInfo: adminInfo}})
            } else if (response.status === 200 &&
                (response.data.result === 'success' || response.data.result === undefined)) {
                let memberInfo = {
                    id: response.data.id,
                    email: response.data.email,
                    password: response.data.password,
                    name: response.data.name,
                    tel: response.data.tel,
                    role: response.data.role
                }
                navigate('/', {state: {memberInfo: memberInfo}})

            } else if (!(response.status === 200 && response.data.result === 'success')) {
                window.alert("로그인에 실패!")
            }
        } catch {
            console.log('로그인 에러:')
        }
    }

    let goRegister = () => {
        navigate('/member/register')
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
                                         onChange={onChange} placeholder="email"/>
                        </td>
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
export default Auth