package com.nc13.StayHo.model.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class ReviewSelectDTO {
    private int id;
    private String comment;
    private float rating;
    private Date createdAt;
    private Date updatedAt;
    private int memberId;
    private String memberName;
    private List<String> imgUrls;
}
