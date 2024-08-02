import {Button, Container, FormControl, Form, Table, FormCheck, FormText, FormSelect} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";


let Insert = () => {
    let {register, handleSubmit, watch, formState: {errors}} = useForm();
    let [inputs, setInputs] = useState({
        limitPeople: '',
        type: '',
        bath: '',
        bed: '',
        view: '',
        price: '',
        surcharge: ''
    })

    let ViewEnum = {
        CITY: 'city',
        MOUNTAIN: 'mountain',
        OCEAN: 'ocean'
    }
    Object.freeze(ViewEnum);

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    let onSubmit = async () => {
        let response = await axios.get("", {});

    }
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Table>
                    <thead>
                    <tr>
                        <th>객실 추가하기</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>최대 숙박 인원</td>
                        <td>
                            <FormControl type={'number'} name={'limitPeople'} vaule={inputs.limitPeople}
                                         onChange={onChange}
                                         aria-describedby='limitPeopleExplain' defaultValue={1}
                                         {...register("limitPeople", {required: true, min: 1})}/>
                            <FormText id="limitPeopleExplain" muted>최소 인원은 1명입니다.</FormText>
                        </td>
                    </tr>
                    <tr>
                        <td>객실 타입 이름</td>
                        <td><FormControl type={'text'} name={'type'} vaule={inputs.type} onChange={onChange}
                                         aria-descripbedby='typeExplain'
                                         {...register("type", {required: true, maxLength: 50})}/>
                            <FormText id="typeExplain" muted>최대 50자까지 입력가능합니다.</FormText>
                        </td>
                    </tr>
                    <tr>
                        <td>욕조 여부</td>
                        <td>
                            <div key={`inline-radio`} className="mb-3">
                                <FormCheck inline label="O" name="bath" type='radio' id={`inline-radio-1`} value="true"
                                           onChange={onChange}/>
                                <FormCheck inline label="X" name="bath" type='radio' id={`inline-radio-2`} value="false"
                                           onChange={onChange} checked/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>침대 개수</td>
                        <td><FormControl type={'number'} name={'bed'} vaule={inputs.bed} onChange={onChange}
                                         defaultValue={'0'}
                                         {...register("bed", {required: true, min: 0})}/>개
                        </td>
                    </tr>
                    <tr>
                        <td>뷰</td>
                        <td>
                            <FormSelect onChange={onChange} name='view'>
                                <option  value={ViewEnum.CITY}>도시뷰</option>
                                <option  value={ViewEnum.MOUNTAIN}>산뷰</option>
                                <option  value={ViewEnum.OCEAN}>바다뷰</option>
                            </FormSelect>
                        </td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td><FormControl type={'number'} name={'price'} vaule={inputs.price} onChange={onChange}
                                         defaultValue={1}
                                         {...register("view", {required: true, min: 1})}/> ₩/박
                        </td>
                    </tr>
                    <tr>
                        <td>성수기 할증 비율</td>
                        <td><FormControl type={'number'} name={'surcharge'} vaule={inputs.surcharge} defaultValue={20}
                                         onChange={onChange} aria-describedby='surchargeExplain'
                                         {...register("surcharge", {required: true, min: 1, max: 100})}/> %
                            <FormText id='surchargeExplain'>1 - 100 사이 숫자를 입력하세요.</FormText>
                        </td>
                    </tr>
                    <tr>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <td>
                                <Form.Label>객실 사진 추가</Form.Label></td>
                            <td><Form.Control type="file" multiple/></td>
                        </Form.Group>
                    </tr>
                    <tr>
                        <td><Button type={'submit'}>추가하기</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    )
}
export default Insert