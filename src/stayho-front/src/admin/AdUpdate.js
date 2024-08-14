import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {Button, Container, FormControl, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

let AdUpdate = () => {
    let location = useLocation()
    let adminInfo = location.state.adminInfo

    let id = adminInfo.id
    let [inputs, setInputs] = useState({
        id: adminInfo.id,
        email: adminInfo.email,
        password: "",
        name: adminInfo.name,
        tel: adminInfo.tel,
        role: adminInfo.role
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
        navigate('/admin/adMyPage', {state: {adminInfo: inputs}})
    }

    let onSubmit = async (e) => {
        console.log(inputs)
        e.preventDefault()
        let resp = await axios.post('http://localhost:8080/admin/update', inputs, {
            withCredentials: true
        })
        if (resp.status === 200) {
            moveToNext()
        }
    }


    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped border hover>
                    <thead>
                    <tr>
                        <td colSpan={2}>회원 정보 수정하기</td>
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
export default AdUpdate

