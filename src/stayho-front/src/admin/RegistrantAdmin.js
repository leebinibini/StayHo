import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";


let RegistrantAdmin = () => {
    let location = useLocation()
    let adminInfo = location.state.adminInfo
    let navigate = useNavigate();
    let [registrants, setRegistrants] = useState({memberList: []})
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    let [currentRePage, setCurrentRePage] = useState(1)
    let [membersPerPage] = useState(5); // 페이지당 회원 수
    let onMenu = () => {
        navigate("/admin/menu", {state:{adminInfo:adminInfo}})
    }

    useEffect(() => {
        setLoading(true)
        const selectRegistrant = async () => {
            try {
                let reResponse =
                    await axios.get('http://localhost:8080/member/memberList/ROLE_REGISTRANT')
                console.log(reResponse.data)
                setRegistrants({ memberList: reResponse.data.memberList});
            } catch (err) {
                setError(err); // 오류 처리
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        }

        selectRegistrant();
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>; // 오류 발생 시
    }
    const indexOfLastRegistrant = currentRePage * membersPerPage;
    const indexOfFirstRegistrant = indexOfLastRegistrant - membersPerPage;
    const currentRegistrants = registrants.memberList.slice(indexOfFirstRegistrant, indexOfLastRegistrant);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(registrants.memberList.length / membersPerPage); i++) {
        pageNumbers.push(i);
    }
    let handleRePageChange = (number) => {
        setCurrentRePage(number);
    };

    let onReSecede = async (e, registrantId) => {
        e.preventDefault()
        let deleted= window.confirm("정말 탈퇴하시겠습니까?")
        if (deleted) {
            try {
                let response =
                    await axios.get('http://localhost:8080/admin/withdraw/'+registrantId, {
                    withCredentials: true
                })
                setRegistrants(prevMembers => ({
                    ...prevMembers,
                    memberList: prevMembers.memberList.filter(member => member.id !== registrantId)

                })); // 로컬 상태에서 삭제
                navigate("/admin/registrantAdmin", {state:{adminInfo :adminInfo}})
            } catch (err) {
                setError(err); // 오류 처리
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1>등록자 회원 목록</h1>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div></div>
                <button className="btn btn-primary" onClick={onMenu}>관리자 메뉴</button>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>전화번호</th>
                    <th>실행</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(currentRegistrants) && currentRegistrants.length > 0 ? (
                    currentRegistrants.map(r => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.name}</td>
                            <td>{r.email}</td>
                            <td>{r.tel}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={(e) => onReSecede(e, r.id)}
                                >
                                    탈퇴시키기
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">회원이 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </table>
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentRegistrants === number ? 'active' : ''}`}>
                            <a onClick={() => handleRePageChange(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>

    )
}

export default RegistrantAdmin;
