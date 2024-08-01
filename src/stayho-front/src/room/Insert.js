import {Button, Container, FormControl, Table} from "react-bootstrap";

let Insert = () => {
    return (
        <Container>
            <form>
                <Table>
                    <thead>
                    <tr>
                        <th>객실 추가하기</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>최대 숙박 인원</td>
                        <td><FormControl type={'number'} name={'limitPeople'}/></td>
                    </tr>
                    <tr>
                        <td>객실 타입 이름</td>
                        <td><FormControl type={'text'} name={'type'}/></td>
                    </tr>
                    <tr>
                        <td>욕조 여부</td>
                        <td><FormControl type={'boolean'} name={'bath'}/></td>
                    </tr>
                    <tr>
                        <td>침대 개수</td>
                        <td><FormControl type={'number'} name={'bed'}/></td>
                    </tr>
                    <tr>
                        <td>뷰</td>
                        <td><FormControl type={'text'} name={'view'}/></td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td><FormControl type={'number'} name={'price'}/> ₩/박</td>
                    </tr>
                    <tr>
                        <td>성수기 할증 비율</td>
                        <td><FormControl type={'number'} name={'surcharge'}/> %</td>
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