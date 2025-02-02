package com.nc13.StayHo.domain.room.dto;

import lombok.Data;

@Data
public class SynthesisDTO {
    private int id;
    private int limitPeople;
    private String type;
    private int hotelId;
    private int roomId;
    private boolean bath;
    private int bed;
    private String view;
    private int price;
    private int surcharge;
    private String content;
}
