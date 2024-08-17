import SearchForm from "../search/SearchForm";
import ShowList from "../hotel/ShowList";
import {Container} from "react-bootstrap";

let Main = () => {
    return(
        <Container>
            <header>
                <nav>
                    <SearchForm/>
                </nav>
            </header>
            <body>
                <ShowList/>
            </body>
        </Container>
    )
}

export default Main