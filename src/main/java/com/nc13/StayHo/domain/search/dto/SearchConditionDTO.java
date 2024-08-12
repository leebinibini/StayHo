package com.nc13.StayHo.domain.search.dto;

import lombok.Data;

import java.util.Date;

@Data
public class SearchConditionDTO {
    private String sido;
    private String sigungu;
    private int people;
    private int rooms;
    private Date checkinDate;
    private Date checkoutDate;
}
