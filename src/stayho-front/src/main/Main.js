import SearchForm from "../search/SearchForm";
import ShowList from "../hotel/ShowList";
import {Container} from "react-bootstrap";
import Header from "../member/Header";

let Main = () => {
    return (
        <Container>
            <header>
                <nav>
                    <Header/>
                    <SearchForm/>
                </nav>
            </header>
            <div>
            </div>
        </Container>
    )
}

export default Main