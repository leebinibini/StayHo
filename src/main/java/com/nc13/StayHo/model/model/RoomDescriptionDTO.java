package com.nc13.StayHo.model.model;

import lombok.Data;

@Data
public class RoomDescriptionDTO {
    private Long roomId;
    private boolean bath;
    private int bed;
    private String view;
    private String content;

    public RoomDescriptionDTO(){}
    public RoomDescriptionDTO(Long roomId, boolean bath, int bed, String view, String content){
        this.roomId=roomId;
        this.bath=bath;
        this.bed= bed;
        this.view= view;
        this.content= content;
    }
}
