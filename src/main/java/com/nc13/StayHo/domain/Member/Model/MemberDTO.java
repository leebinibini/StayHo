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
    private String role;
    private Role state;


    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));

        return authorities;

    }

    @Override
    public String getUsername() {
        return "";
    }


    public enum Role {
        ROLE_USER("ROLE_USER"),
        ROLE_ADMIN("ROLE_ADMIN"),
        ROLE_REGISTRANT("ROLE_REGISTRANT");

        String role;

        Role(String role) {
            this.role = role;
        }

        public String value() {
            return role;
        }
    }
}



