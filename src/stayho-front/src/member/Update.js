import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, FormControl, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

let Update = () => {
    let location = useLocation()
    let memberInfo = location.state.memberInfo

    let id = memberInfo.id
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


    let isValid = inputs.email !== ''
        && inputs.name !== '' && inputs.tel !== ''

    let navigate = useNavigate()
    let moveToNext = () => {
        navigate('/member/myPage', {state: {memberInfo: inputs}})
    }

    let parsingPhoneNumber = (num: string) => {
        return (
            num
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                .replace(/(-{1,2})$/g, '')
        )
    }
    let passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
    let onSubmit = async (e) => {
        e.preventDefault()
        if (!inputs.password.match(passwordRegEx)) {
            alert("비밀번호 형식을 확인해 주세요");
            return;
        } else if (!isValid) {
            alert("필요한 정보가 누락되었습니다.");
            return;
        }/*else if (parsingPhoneNumber) {
            alert("전화번호를 바르게 기입해 주세요.");
            return;
        }*/

        let resp = await axios.post('http://localhost:8080/registrant/update', inputs, {
            withCredentials: true
        });

        if (resp.status === 200) {
            moveToNext();
        }

    }

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped border hover>
                    <thead>
                    <tr>
                        <td colSpan={2}>{id}번 회원 정보 수정하기</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>이메일</td>
                        <td>
                            <FormControl
                                type={'email'}
                                name={'email'}
                                value={inputs.email}
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>패스워드</td>
                        <td>
                            <FormControl
                                type={'password'}
                                name={'password'}
                                value={inputs.password}
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td>
                            <FormControl
                                type={'tel'}
                                name={'tel'}
                                value={inputs.tel}
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td>
                            <FormControl
                                type={'text'}
                                name={'name'}
                                value={inputs.name}
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                    <Button type={'submit'}>수정하기</Button>
                    </tbody>
                </Table>
            </form>
        </Container>
    )
}
export default Update

