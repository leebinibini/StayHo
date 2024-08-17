package com.nc13.StayHo.domain.hotel.model;

import lombok.Data;

@Data
public class HotelDTO {
    private int id;
    private int memberId;
    private String name;
    private String tel;
    private float rating;
    private String content;

    private String providerName;

    public HotelDTO(){}
    public HotelDTO(int hotelId, int memberId){
        this.id = hotelId;
        this.memberId = memberId;
    }
}
