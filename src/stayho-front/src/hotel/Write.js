import {useLocation, useNavigate} from "react-router-dom";
import {Button, Container, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

let Write = () => {
    let location = useLocation()
    let registrantInfo = location.state.registrantInfo

    let navigate = useNavigate()

    let onMyPage = () => {
        navigate('/registrant/reMyPage', {state: {registrantInfo: registrantInfo}})
    }

    return (
        <form>
            <Container>
                <Table>
                    <thead>
                    <></>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Button onClick={onMyPage}>마이 페이지로</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        </form>
    )
}
export default Write