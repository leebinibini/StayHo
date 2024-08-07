import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Container, FormControl, Table} from "react-bootstrap";

let Register = ()=> {

    let [inputs, setInputs] = useState({
        email:'',
        password:'',
        name:'',
        tel:'',
    })

    let onChange = (e)=> {
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
        formData.append('name', inputs.name)
        formData.append('password', inputs.password)
        formData.append('role', 'ROLE_USER')
        formData.append('tel', inputs.tel)

        let response = await axios({
            url: 'http://localhost:8080/member/register',
            method: "POST",
            data: formData,
            withCredentials: true
        })


        let memberInfo = {
            emil: response.data.emil,
            password: response.data.password,
            name: response.data.name,
            tel: response.data.tel
        }
        navigate('/', {state: {memberInfo: memberInfo}})
    }
        return(
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
                            <td><FormControl type={'email'} name={'email'} value={inputs.username} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td colSpan={2}>
                                <FormControl type={'password'} name={'password'} value={inputs.password}
                                             onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>닉네임</td>
                            <td colSpan={2}>
                                <FormControl type={'name'} name={'name'} value={inputs.name}
                                             onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td colSpan={2}>
                                <FormControl type="text"  name={'tel'} value={inputs.tel}
                                             onChange={onChange}/>
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
export default Register


