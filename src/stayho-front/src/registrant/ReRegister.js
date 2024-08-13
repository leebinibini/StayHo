import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Container, FormControl, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

let ReRegister = () => {

    let [inputs, setInputs] = useState({
        email: '',
        password: '',
        passwordCheck: '',
        name: '',
        tel: '',
    })

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    let isSame = inputs.password === inputs.passwordCheck
    let isValid = inputs.email !== '' && isSame === true
        && inputs.name !== '' && inputs.tel !== ''

    let navigate = useNavigate()

    let onSubmit = async (e) => {
        e.preventDefault()
        if (!isSame) {
            alert("비밀번호를 다시 확인해주세요.")
            return
        } else if (!isValid) {
            alert("필요한 정보가 누락 되었습니다.")
            return
        }
        let formData = new FormData()
        formData.append('email', inputs.email)
        formData.append('name', inputs.name)
        formData.append('password', inputs.password)
        formData.append('role', 'ROLE_REGISTRANT')
        formData.append('tel', inputs.tel)

        let response = await axios({
            url: 'http://localhost:8080/registrant/register',
            method: "POST",
            data: formData,
            withCredentials: true
        })


        let registrantInfo = {
            emil: response.data.emil,
            password: response.data.password,
            name: response.data.name,
            role: response.data.role,
            tel: response.data.tel
        }
        navigate('/registrant/reAuth', {state: {registrantInfo: registrantInfo}})
    }
    return (
        <form onSubmit={onSubmit}>
            <Container>
                <Table>
                    <thead>
                    <tr>
                        <td colSpan={2}> 회원가입</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>아이디</td>
                        <td><FormControl type={'email'} name={'email'} value={inputs.username}
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
                        <td>비밀번호 확인</td>
                        <td colSpan={2}>
                            <FormControl type={'password'} name={'passwordCheck'} value={inputs.passwordCheck}
                                         onChange={onChange} placeholder="passwordCheck"/>
                        </td>
                    </tr>
                    {inputs.passwordCheck !== '' && !isSame && (
                        <p className="passwordCheck">비밀번호를 다시 확인해주세요.</p>
                    )}
                    <tr>
                        <td>닉네임</td>
                        <td colSpan={2}>
                            <FormControl type={'name'} name={'name'} value={inputs.name}
                                         onChange={onChange} placeholder="nickname"/>
                        </td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td colSpan={2}>
                            <FormControl type="text" name={'tel'} value={inputs.tel}
                                         onChange={onChange} placeholder="tel"/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type={'submit'}>회원가입</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        </form>
    )
}
export default ReRegister


