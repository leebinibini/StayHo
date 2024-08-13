package com.nc13.StayHo.domain.Member.Service;

import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


@Service
public class MemberService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mappers.MemberMapper";

    @Autowired
    public MemberService(SqlSession session) {
        SESSION = session;
    }

    public MemberDTO selectByEmail(String email) {
        return SESSION.selectOne(NAMESPACE + ".selectByEmail", email);
    }


    public boolean validateEmail(String email) {
        return SESSION.selectOne(NAMESPACE + ".selectByEmail", email) == null;
    }

    public void register(MemberDTO attempt) {
        SESSION.insert(NAMESPACE + ".register", attempt);
    }

    public void update(MemberDTO memberDTO) {
        SESSION.update(NAMESPACE + ".update", memberDTO);
    }

    public void delete(int id) {
        SESSION.delete(NAMESPACE + ".delete", id);
    }

    public boolean selectByPassword(String password) {
        return SESSION.selectOne(NAMESPACE + ".selectByPassword", password) != null;
    }
}
