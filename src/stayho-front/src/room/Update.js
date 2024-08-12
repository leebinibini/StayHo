import {Button, Container, FormControl, Form, Table, FormCheck, FormText, FormSelect} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";


let Update = () => {
    let {register, handleSubmit, watch, formState: {errors}} = useForm();
    let [inputs, setInputs] = useState({})
    let params = useParams()
    let id = parseInt(params.id)
    let [imgList, setImgList] = useState([])
    let ViewEnum = {
        CITY: 'city',
        MOUNTAIN: 'mountain',
        OCEAN: 'ocean'
    };
    Object.freeze(ViewEnum);

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    let onChangeImg = (e) => {
        setImgList([
            ...imgList,
            ...e.target.files
        ])
    }
    let onSubmit = async () => {
        let data = {
            id: id,
            limitPeople: watch('limitPeople'),
            type: watch('type'),
            bath: inputs.bath,
            bed: watch('bed'),
            view: inputs.view,
            price: watch('price'),
            surcharge: watch('surcharge')
        }

        let response = await axios.post("http://localhost:8080/room/update", data, {});
        if (response.status === 200) {
            window.alert("수정되었습니다.")
        }
    }
    useEffect(() => {
        let onLoad = async () => {
            let response = await axios.get("http://localhost:8080/room/select/" + id, {});
            if (response.status === 200) {
                setInputs(response.data.room)
            }
        }
        onLoad()
    }, []);
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Table>
                    <thead>
                    <tr>
                        <th>객실 정보 수정</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>최대 숙박 인원</td>
                        <td>
                            <FormControl type={'number'} name={'limitPeople'}
                                         onChange={onChange} vaule={inputs.limitPeople}
                                         aria-describedby='limitPeopleExplain' defaultValue={inputs.limitPeople}
                                         {...register("limitPeople", {required: true, min: 1})}/>
                            <FormText id="limitPeopleExplain" muted>최소 인원은 1명입니다.</FormText>
                        </td>
                    </tr>
                    <tr>
                        <td>객실 타입 이름</td>
                        <td><FormControl type={'text'} name={'type'} vaule={inputs.type} onChange={onChange}
                                         aria-describedby='typeExplain' defaultValue={inputs.type}
                                         {...register("type", {required: true, maxLength: 50})}/>
                            <FormText id="typeExplain" muted>최대 50자까지 입력가능합니다.</FormText>
                        </td>
                    </tr>
                    <tr>
                        <td>욕조 여부</td>
                        <td>
                            {inputs.bath ?
                                <div key={`inline-radio`} className="mb-3">
                                    <FormCheck inline label="O" name="bath" type='radio' id={`inline-radio-1`}
                                               value="true"
                                               onChange={onChange} checked/>
                                    <FormCheck inline label="X" name="bath" type='radio' id={`inline-radio-2`}
                                               value="false"
                                               onChange={onChange}/>
                                </div>
                                :
                                <div key={`inline-radio`} className="mb-3">
                                    <FormCheck inline label="O" name="bath" type='radio' id={`inline-radio-1`}
                                               value="true"
                                               onChange={onChange}/>
                                    <FormCheck inline label="X" name="bath" type='radio' id={`inline-radio-2`}
                                               value="false"
                                               onChange={onChange} checked/>
                                </div>
                            }


                        </td>
                    </tr>
                    <tr>
                        <td>침대 개수</td>
                        <td><FormControl type={'number'} name={'bed'} vaule={inputs.bed} onChange={onChange}
                                         defaultValue={inputs.bed}
                                         {...register("bed", {required: true, min: 0})}/>개
                        </td>
                    </tr>
                    <tr>
                        <td>뷰</td>
                        <td>
                            <FormSelect onChange={onChange} name='view' defaultValue={inputs.view}>
                                <option value={ViewEnum.CITY}>도시뷰</option>
                                <option value={ViewEnum.MOUNTAIN}>산뷰</option>
                                <option value={ViewEnum.OCEAN}>바다뷰</option>
                            </FormSelect>
                        </td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td><FormControl type={'number'} name={'price'} vaule={inputs.price} onChange={onChange}
                                         defaultValue={inputs.price}
                                         {...register("price", {required: true, min: 1})}/> ₩/박
                        </td>
                    </tr>
                    <tr>
                        <td>성수기 할증 비율</td>
                        <td><FormControl type={'number'} name={'surcharge'} vaule={inputs.surcharge}
                                         defaultValue={inputs.surcharge}
                                         onChange={onChange} aria-describedby='surchargeExplain'
                                         {...register("surcharge", {required: true, min: 1, max: 100})}/> %
                            <FormText id='surchargeExplain'>1 - 100 사이 숫자를 입력하세요.</FormText>
                        </td>
                    </tr>
                    <tr>
                            <td>객실 사진 추가</td>
                            <td><Form.Control type="file" multiple={true} onChange={onChangeImg} accept={'image.jpg,image/png,image/jpeg'}/></td>
                    </tr>
                    <tr>
                        <td><Button type={'submit'}>수정하기</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    )
}
export default Update