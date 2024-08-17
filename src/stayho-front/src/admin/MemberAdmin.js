import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


let MemberAdmin = () => {
    let location = useLocation()
    let adminInfo = location.state.adminInfo

    let navigate = useNavigate();
    let [members, setMembers] = useState({memberList: []})
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    let [currentPage, setCurrentPage] = useState(1);
    let [membersPerPage] = useState(5); // 페이지당 회원
    let onMenu = () => {
        navigate("/admin/menu", {state:{adminInfo:adminInfo}})
    }

    useEffect(() => {
        const selectMembers = async () => {
            try {
                let userResponse =
                    await axios.get('http://localhost:8080/member/memberList/ROLE_USER')
                setMembers({memberList: userResponse.data.memberList});
            } catch (err) {
                setError(err); // 오류 처리
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        }
        selectMembers()
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>; // 오류 발생 시
    }

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    let currentMembers = members.memberList.slice(indexOfFirstMember, indexOfLastMember)

    // 페이지 수 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(members.memberList.length / membersPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (number) => {
        setCurrentPage(number);
    }

    let onSecede = async (e, memberId) => {
        e.preventDefault()
        let deleted = window.confirm("정말 탈퇴하시겠습니까?")
        if (deleted) {
            try {
                let response =
                await axios.get('http://localhost:8080/admin/withdraw/' + memberId, {
                    withCredentials: true

                })
                setMembers(prevMembers => ({
                    ...prevMembers,
                    memberList: prevMembers.memberList.filter(member => member.id !== memberId)

                })); // 로컬 상태에서 삭제
                navigate("/admin/memberAdmin", {state: {adminInfo: adminInfo}})
            } catch (err) {
                setError(err); // 오류 처리
            }
        }
    }


    let onUpdate = (memberInfo) => {
        navigate("/admin/memUpdate", {state:{adminInfo:adminInfo, memberInfo: memberInfo}})
    }

    return (
        <div className="container mt-4">
            <h1>일반 회원 목록</h1>
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
                    <th>탈퇴하기</th>
                    <th>수정하기</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(members.memberList) && members.memberList.length > 0 ? (
                    members.memberList.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.name}</td>
                            <td>{m.email}</td>
                            <td>{m.tel}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={(e) => onSecede(e, m.id)}
                                >
                                    탈퇴시기
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-primary"
                                        onClick={() => onUpdate(m.id)}>
                                    수정하기
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

            {/* 페이지 네이션 */}
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <a onClick={() => handlePageChange(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default MemberAdmin;
