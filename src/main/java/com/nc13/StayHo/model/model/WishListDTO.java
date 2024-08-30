package com.nc13.StayHo.model.model;

import lombok.Data;

@Data
public class WishListDTO {
    private int hotelId;
    private int memberId;

    public WishListDTO(){}
    public WishListDTO(int hotelId, int memberId) {
        this.hotelId = hotelId;
        this.memberId = memberId;
    }
}
