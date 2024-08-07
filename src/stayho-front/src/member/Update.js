import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, FormControl, Table} from "react-bootstrap";

let Update = () => {
    let location = useLocation()
    let memberInfo = location.state.memberInfo

    let id = memberInfo.id
    let [inputs, setInputs] = useState({
        id:memberInfo.id,
        email:memberInfo.email,
        password:"",
        name:memberInfo.name,
        tel:memberInfo.tel,
        role: memberInfo.role
    })

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]:value
        })
    }

    let navigate = useNavigate()
    let moveToNext = () => {
        navigate('/member/myPage', {state:{memberInfo:inputs}})
    }

    let onSubmit = async (e) => {
        console.log(inputs)
        e.preventDefault()
            let resp = await axios.post('http://localhost:8080/member/update', inputs, {
                withCredentials: true
            })
        if(resp.status === 200){
            moveToNext()
        }
    }

    /*useEffect(() => {
        let getUpdate = async () => {
            let resp = await axios.get('http://localhost:8080/member/myPage/'+id,{
                withCredentials: true
            })
            if(resp.status===200){
                setInputs(resp.data)
            }
        }
        getUpdate()
    }, [id]);*/

    return(
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

