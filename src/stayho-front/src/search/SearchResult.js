import {Container} from "react-bootstrap";
import SearchOption from "./SearchOption";
import SearchList from "./SearchList";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

let SearchResult=()=>{
    let location= useLocation()
    let hotels= location.state.list
    let images= location.state.images
    let memberInfo= location.state.memberInfo
    let [optionList, setOptionList]= useState(hotels)
    useEffect(() => {
        setOptionList(hotels)
    }, [hotels]);
    return(
        <Container>
            <div className={'d-flex'}>
            <SearchOption origin={hotels} hotels={optionList} setHotels={setOptionList}/>
            <SearchList hotels={optionList} images={images}/>
            </div>
        </Container>
    )
}
export default SearchResult