package com.nc13.StayHo.model.model;

import lombok.Data;

@Data
public class ReviewRegisterDTO {
    private int id;
    private int reservationId;
    private String comment;
    private float rating;
}
