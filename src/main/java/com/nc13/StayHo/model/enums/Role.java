package com.nc13.StayHo.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    ROLE_USER("ROLE_USER"),
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_REGISTRANT("ROLE_REGISTRANT");

    @Getter
    String value;
    String roles;


    Role(String value) {
        this.value = value;
    }


}
