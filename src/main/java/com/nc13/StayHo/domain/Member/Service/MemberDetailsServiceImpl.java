package com.nc13.StayHo.domain.Member.Service;


import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class MemberDetailsServiceImpl implements UserDetailsService {

    private final MemberService MEMBER_SERVICE;

    @Autowired
    private MemberDetailsServiceImpl(MemberService memberService) {
        MEMBER_SERVICE = memberService;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        MemberDTO memberDTO = MEMBER_SERVICE.selectByEmail(email);

        if (memberDTO == null) {
            throw new UsernameNotFoundException("Invalid email or password.");
        }

        return memberDTO;
    }
}

