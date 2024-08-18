import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Container, FormControl, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

let ReRegister = () => {
    let [errorMessage, setErrorMessage] = useState('')
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

    let checkPhoneNumber = (event) => {
        let phoneNumber = event.target.value
        // '-' 입력 시
        let regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        // 숫자만 입력시
        let regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
        // 형식에 맞는 경우 true 리턴
        return regExp.test(phoneNumber) || regExp2.test(phoneNumber);
    }

    let onSubmit = async (e) => {
        e.preventDefault()
        if (!isSame) {
            alert("비밀번호를 다시 확인해주세요.")
            return
        } else if (!isValid) {
            alert("필요한 정보가 누락 되었습니다.")
            return
        } else if (!checkPhoneNumber({target: {value: inputs.tel}})) {
            alert("전화번호를 바르게 기입해주세요.")
            return
        }
        let formData = new FormData()
        formData.append('email', inputs.email)
        formData.append('name', inputs.name)
        formData.append('password', inputs.password)
        formData.append('role', 'ROLE_REGISTRANT')
        formData.append('tel', inputs.tel)

        try {
            let response = await axios({
                url: 'http://localhost:8080/registrant/reregister',
                method: "POST",
                data: formData,
                withCredentials: true
            })

            if (response.status === 200) {
                let registrantInfo = {
                    email: response.data.member.email,
                    password: response.data.member.password,
                    name: response.data.member.name,
                    role: response.data.member.role,
                    tel: response.data.member.tel
                }
                console.log(registrantInfo)

                navigate('/registrant/reAuth',{state: {registrantInfo: registrantInfo}})
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('이미 가입된 이메일입니다.')
            }
        }

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
                            <FormControl type="text" name={'tel'} value={inputs.tel} maxLength={11}
                                         onChange={onChange} placeholder="tel"/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type={'submit'}>회원가입</Button>
                        </td>
                    </tr>
                    </tbody>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </Table>
            </Container>
        </form>
    )
}
export default ReRegister


