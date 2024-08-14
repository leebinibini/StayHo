package com.nc13.StayHo.domain.img.dto;

import lombok.Data;

@Data
public class ReviewImgDTO {
    private int id;
    private String filepath;
    private String filename;
    private int reviewId;

    public ReviewImgDTO(){

    }
    public ReviewImgDTO(String path, String name, int reviewId){
        this.filepath= path;
        this.filename= name;
        this.reviewId = reviewId;
    }
}
