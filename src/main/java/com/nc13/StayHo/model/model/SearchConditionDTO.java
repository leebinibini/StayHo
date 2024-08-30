package com.nc13.StayHo.model.model;

import lombok.Data;

import java.util.Date;

@Data
public class SearchConditionDTO {
    private String sido;
    private String sigungu;
    private int people;
    private int rooms;
    private int HotelId;
    private Date checkinDate;
    private Date checkoutDate;
}
