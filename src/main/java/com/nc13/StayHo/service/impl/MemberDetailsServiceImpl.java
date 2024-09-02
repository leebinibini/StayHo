package com.nc13.StayHo.service.impl;


import com.nc13.StayHo.model.model.MemberDTO;
import com.nc13.StayHo.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


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
        System.out.println(memberDTO);
        if (memberDTO == null) {
            throw new UsernameNotFoundException("Invalid email or password.");
        }

        return memberDTO;
    }
}

