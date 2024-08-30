package com.nc13.StayHo.model.model;

import lombok.Data;

@Data
public class RoomModel {

    private Long id;
    private int limitPeople;
    private String type;
    private int hotelId;

    public RoomModel(){}
    public RoomModel(int limitPeople, String type, int hotelId){
        this.hotelId=hotelId;
        this.type=type;
        this.limitPeople=limitPeople;
    }

}
