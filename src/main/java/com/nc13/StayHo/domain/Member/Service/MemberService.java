package com.nc13.StayHo.domain.Member.Service;

import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class MemberService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mappers.MemberMapper";

    @Autowired
    public MemberService(SqlSession session){
        SESSION = session;
    }

    public MemberDTO selectByEmail(String email){
        return SESSION.selectOne(NAMESPACE + ".selectByEmail", email);
    }

    /*private UserDetails createDetails(MemberDTO memberDTO) {

        String role = memberDTO.getState().value();
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role);

        return new org.springframework.security.core.userdetails.User(
                String.valueOf(memberDTO.getId()),
                memberDTO.getPassword(),
                Collections.singleton(grantedAuthority)
        );
    }*/

    public boolean validateEmail(String email){
      return SESSION.selectOne(NAMESPACE + ".selectByEmail", email) == null;
    }

    public void register(MemberDTO attempt){
        SESSION.insert(NAMESPACE + ".register", attempt);
    }

    public void update(MemberDTO attempt){
        SESSION.update(NAMESPACE + ".update", attempt);
    }

    public void delete(int id){
        SESSION.delete(NAMESPACE + ".delete" , id);
    }
}
