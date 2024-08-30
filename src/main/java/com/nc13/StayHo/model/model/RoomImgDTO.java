package com.nc13.StayHo.model.model;

import lombok.Data;

@Data
public class RoomImgDTO {
    private int id;
    private String filepath;
    private String filename;
    private Long roomId;

    public RoomImgDTO(){}
    public RoomImgDTO(String path, String name, Long roomId){
        this.filepath= path;
        this.filename= name;
        this.roomId= roomId;
    }
}
