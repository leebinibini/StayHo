import {Container, FormCheck} from "react-bootstrap";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {useState} from "react";

let SearchOption = () => {
    let styles = {
        width: '15vw',
        display: 'inline-block'
    }
    let [inputs, setInputs] = useState({
        minPrice: 0,
        maxPrice: 100000,
        minRating: 0.0,
        maxRating: 10.0,
        swimmingPool: false,
        parking: false,
        restaurant: false,
        smoking: false,
        laundry: false,
        fitness: false,
    })
    let onChange = (value, type) => {
        if (type === 'price') {
            setInputs({
                ...inputs,
                minPrice: value[0],
                maxPrice: value[1]
            })
        } else if (type === 'rating') {
            setInputs({
                ...inputs,
                minRating: value[0],
                maxRating: value[1]
            })
        }
    }
    let onChecked = (checked, value) => {
        console.log(value + ":" + checked)
        setInputs({
            ...inputs,
            [value]: checked
        })
    }
    return (
        <Container style={styles} className={'mt-5'}>
            <div>
                <span>가격</span>
                <Slider range min={0} max={100000} value={[inputs.minPrice, inputs.maxPrice]} allowCross={false}
                        className={'Price'}
                        onChange={(value) => onChange(value, 'price')}/>
            </div>
            <hr/>
            <div>
                <span>평점</span>
                <Slider range min={0} max={10} value={[inputs.minRating, inputs.maxRating]} allowCross={false}
                        className={'Rating'}
                        onChange={(value) => onChange(value, 'rating')}/>
            </div>
            <hr/>
            <div>
                <div className={'d-flex mb-2'}><strong>편의시설</strong></div>
                <div className={'d-flex'}>
                    <span className={'me-3'}>수영장</span>
                    <FormCheck type='checkbox' value='swimmingPool'
                               onClick={(event) => onChecked(event.target.checked, event.target.value)}/>
                </div>
                <div className={'d-flex'}>
                    <span className={'me-3'}>흡연구역</span>
                    <FormCheck type='checkbox' value='smoking'
                               onClick={(event) => onChecked(event.target.checked, event.target.value)}/>
                </div>
                <div className={'d-flex'}>
                    <span className={'me-3'}>레스토랑</span>
                    <FormCheck type='checkbox' value='restaurant'
                               onClick={(event) => onChecked(event.target.checked, event.target.value)}/>
                </div>
                <div className={'d-flex'}>
                    <span className={'me-3'}>세탁서비스</span>
                    <FormCheck type='checkbox' value='laundry'
                               onClick={(event) => onChecked(event.target.checked, event.target.value)}/>
                </div>
                <div className={'d-flex'}>
                    <span className={'me-3'}>피트니트 센터</span
                    ><FormCheck type='checkbox' value='fitness'
                                onClick={(event) => onChecked(event.target.checked, event.target.value)}/>
                </div>
                <div className={'d-flex'}>
                    <span className={'me-3'}>주차장</span>
                    <FormCheck type='checkbox' value='parking'
                               onClick={(event) => onChecked(event.target.checked, event.target.value)}/>
                </div>
            </div>
            <hr/>
        </Container>
    )
}
export default SearchOption
