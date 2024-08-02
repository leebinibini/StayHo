package com.nc13.StayHo.domain.roomDescription;

public enum ViewEnum {
    CITY("도시뷰"),
    MOUNTAIN("산뷰"),
    OCEAN("바다뷰");

    private final String type;

    ViewEnum(String type) {
        this.type = type;

    }
}
