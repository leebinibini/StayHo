package com.nc13.StayHo.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class ReviewSelectDTO {
    private int id;
    private String comment;
    private float rating;
    private Date createdAt;
    private Date updatedAt;
    private int memberId;

}
