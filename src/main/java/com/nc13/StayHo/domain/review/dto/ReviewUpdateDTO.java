package com.nc13.StayHo.domain.review.dto;

import lombok.Data;

@Data
public class ReviewUpdateDTO {
    private int id;
    private String comment;
    private float rating;
}
