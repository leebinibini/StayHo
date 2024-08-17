import React from 'react';
import {Button, Form, Row, Col} from 'react-bootstrap';

const SearchBar = ({keyword, setKeyword, handleSearch}) => {
    return (
        <Row className="mb-3">
            <Col md={9}>
                <Form.Control
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="이용 후기 검색"
                    className="mb-2"
                />
            </Col>
            <Col md={3}>
                <Button
                    onClick={handleSearch}
                    variant="primary"
                    className="w-100"
                >
                    검색
                </Button>
            </Col>
        </Row>
    );
};

export default SearchBar;