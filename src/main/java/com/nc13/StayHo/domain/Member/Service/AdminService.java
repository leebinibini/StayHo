package com.nc13.StayHo.domain.Member.Service;

import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mappers.AdminMapper";

    @Autowired
    public AdminService(SqlSession session) {
        SESSION = session;
    }

    public MemberDTO selectByEmail(String email) {
        return SESSION.selectOne(NAMESPACE + ".selectByEmail", email);
    }

    public void update(MemberDTO memberDTO) {
        SESSION.update(NAMESPACE + ".update", memberDTO);
    }
}
