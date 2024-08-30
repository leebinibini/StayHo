package com.nc13.StayHo.model.model;

import lombok.Data;

@Data
public class HotelImgDTO {
    private int id;
    private String filepath;
    private String filename;
    private int hotelId;

    public HotelImgDTO(){}
    public HotelImgDTO(String path, String name, int hotelId){
        this.filepath= path;
        this.filename= name;
        this.hotelId= hotelId;
    }
}
