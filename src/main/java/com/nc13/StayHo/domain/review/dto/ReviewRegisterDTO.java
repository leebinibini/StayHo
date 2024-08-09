package com.nc13.StayHo.domain.review.dto;

import lombok.Data;

@Data
public class ReviewRegisterDTO {
    private int reservationId;
    private String comment;
    private float rating;
}
