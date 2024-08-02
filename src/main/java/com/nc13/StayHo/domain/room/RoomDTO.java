package com.nc13.StayHo.domain.room;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class RoomDTO {

    private int id;
    private int limitPeople;
    private String type;
    private int hotelId;

    public RoomDTO(){}
    public RoomDTO(int limitPeople, String type, int hotelId){
        this.hotelId=hotelId;
        this.type=type;
        this.limitPeople=limitPeople;
    }

}
