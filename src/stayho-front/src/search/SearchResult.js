import {Container} from "react-bootstrap";
import SearchOption from "./SearchOption";
import SearchList from "./SearchList";
import SearchForm from "./SearchForm";

let SearchResult=()=>{
    return(
        <Container>
            <SearchForm/>
            <div className={'d-flex'}>
            <SearchOption/>
            <SearchList/>
            </div>
        </Container>
    )
}
export default SearchResult