package com.nc13.StayHo.model.model;

import lombok.Data;

@Data
public class ReviewUpdateDTO {
    private int id;
    private String comment;
    private float rating;
}
