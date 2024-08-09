package com.nc13.StayHo.domain.Member.Service;

import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrantService {
        private final SqlSession SESSION;
        private final String NAMESPACE = "mappers.RegistrantMapper";

        @Autowired
        public RegistrantService(SqlSession session){
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

        public void update(MemberDTO memberDTO){
            SESSION.update(NAMESPACE + ".update", memberDTO);
        }

        public void delete(int id){
            SESSION.delete(NAMESPACE + ".delete" , id);
        }

        public boolean selectByPassword (String password){
            return SESSION.selectOne(NAMESPACE + ".selectByPassword", password) != null;
        }
    }


