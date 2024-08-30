package com.nc13.StayHo.model.model;

import com.nc13.StayHo.model.enums.Role;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

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



