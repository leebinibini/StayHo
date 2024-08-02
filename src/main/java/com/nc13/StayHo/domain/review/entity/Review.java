package com.nc13.StayHo.domain.review.entity;

import lombok.Getter;

import java.util.Date;

@Getter
public class Review {

    private int id;
    private int reservationId;
    private String comment;
    private float rating;
    private Date createdAt;
    private Date updatedAt;

    public void updateComment(String comment) {
        this.comment = comment;
    }

    public void updateRating(float rating) {
        this.rating = rating;
    }
}
