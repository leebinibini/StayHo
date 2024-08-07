import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {Button, Container, FormControl, Table} from "react-bootstrap";

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

        let moveToShowList = () => {

        }

        if (response.status === 200 && response.data.result === 'success') {
            let memberInfo = {
                id: response.data.id,
                email: response.data.email,
                password: response.data.password,
                name: response.data.name,
                tel: response.data.tel,
                role: response.data.role
            }
            navigate('/hotel/showList', {state: {memberInfo: memberInfo}})


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
                        <td><FormControl type={'text'} name={'email'} value={inputs.username} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td colSpan={2}>
                            <FormControl type={'password'} name={'password'} value={inputs.password}
                                         onChange={onChange}/>
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