package com.nc13.StayHo.domain.Member.Model;

import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

@Data
public class MemberDTO implements UserDetails {
    private int id;
    private String name;
    private String tel;
    private String password;
    private String email;

    private Collection<GrantedAuthority> authorities;
    private Role role;


    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.getValue()));

        return authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }
}



