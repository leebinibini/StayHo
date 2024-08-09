package com.nc13.StayHo.domain.Member.Service;

import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class RegistrantDetailsServiceImpl implements UserDetailsService {

    private final RegistrantService REGISTRANT_SERVICE;

    @Autowired
    private RegistrantDetailsServiceImpl(RegistrantService registrantService){
        REGISTRANT_SERVICE = registrantService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        MemberDTO memberDTO = REGISTRANT_SERVICE.selectByEmail(email);

        if(memberDTO == null){
            throw new UsernameNotFoundException("Invalid email or password");
        }
        return memberDTO;
    }
}
