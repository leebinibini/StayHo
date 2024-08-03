package com.nc13.StayHo.domain.roomDescription;

public enum ViewEnum {
    CITY("도시뷰", "city"),
    MOUNTAIN("산뷰", "mountain"),
    OCEAN("바다뷰", "ocean");

    private final String typeK;
    private final String typeE;

    ViewEnum(String typeK, String typeE) {
        this.typeK = typeK;
        this.typeE = typeE;

    }
}
