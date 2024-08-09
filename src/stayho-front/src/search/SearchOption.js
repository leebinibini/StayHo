import {Button, Container, FormCheck, FormControl} from "react-bootstrap";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {useEffect, useState} from "react";

let SearchOption = ({origin, hotels, setHotels}) => {
    let styles = {
        width: '15vw',
        display: 'inline-block'
    }
    let price = []
    origin.map(hotel => (
        price.push(parseInt(hotel.price))
    ))
    let maxPriceValue = Math.max(...price);
    let [inputs, setInputs] = useState({
        minPrice: 0,
        maxPrice: maxPriceValue,
        minRating: 0.0,
        maxRating: 10.0,
    })
    let [options, setOptions] = useState([])
    let facilities = [
        {value: 'swimmingPool', name: "수영장"},
        {value: 'parking', name: "주차장"},
        {value: 'laundryFacilities', name: '세탁실'},
        {value: 'smoking', name: '흡연구역'},
        {value: 'fitnessCenter', name: '운동실'},
        {value: 'restaurant', name: "식당"}

    ]
    useEffect(() => {
        setHotels(
            origin.filter((hotel) => hotel.price >= inputs.minPrice && hotel.price <= inputs.maxPrice)
                .filter((hotel) => hotel.rating >= inputs.minRating && hotel.rating <= inputs.maxRating)
                .filter((hotel) => options.includes('swimmingPool') ? hotel.swimmingPool === true : hotel)
                .filter((hotel) => options.includes('parking') ? hotel.parking === true : hotel)
                .filter((hotel) => options.includes('laundryFacilities') ? hotel.laundryFacilities === true : hotel)
                .filter((hotel) => options.includes('smoking') ? hotel.smoking === true : hotel)
                .filter((hotel) => options.includes('fitnessCenter') ? hotel.fitnessCenter === true : hotel)
                .filter((hotel) => options.includes('restaurant') ? hotel.restaurant === true : hotel)
        )
    }, [options, inputs]);

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
        if (checked) {
            setOptions([
                ...options,
                value
            ])
        } else {
            setOptions(options.filter((e) => e !== value))
        }
    }
    return (
        <Container style={styles} className={'mt-5'}>
            <div>
                <span>1박당 금액</span>
                <div>{inputs.minPrice.toLocaleString()}원 - {inputs.maxPrice.toLocaleString()}원</div>

                <Slider range min={0} max={maxPriceValue} value={[inputs.minPrice, inputs.maxPrice]} allowCross={false}
                        className={'Price'}
                        onChange={(value) => onChange(value, 'price')}/>
            </div>
            <hr/>
            <div>
                <span>평점</span>
                <div>{inputs.minRating} - {inputs.maxRating}</div>
                <Slider range min={0} max={10} value={[inputs.minRating, inputs.maxRating]} allowCross={false}
                        className={'Rating'}
                        onChange={(value) => onChange(value, 'rating')}/>
            </div>
            <hr/>
            <div>
                <div className={'d-flex mb-2'}><strong>편의시설</strong></div>
                {facilities.map(facility => (
                    <div className={'d-flex'}>
                        <span className={'me-3'}>{facility.name}</span>
                        <FormCheck type='checkbox' value={facility.value}
                                   onClick={(event) => onChecked(event.target.checked, event.target.value)}/>
                    </div>
                ))}

            </div>
            <hr/>
        </Container>
    )
}
export default SearchOption
