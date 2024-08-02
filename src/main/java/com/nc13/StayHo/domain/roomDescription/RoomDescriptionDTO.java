package com.nc13.StayHo.domain.roomDescription;

import lombok.Data;

@Data
public class RoomDescriptionDTO {
    private int roomId;
    private boolean bath;
    private int bed;
//    private Enum<ViewEnum> view;
    private String view;


    public RoomDescriptionDTO(){}
    public RoomDescriptionDTO(int roomId, boolean bath, int bed, String view){
        this.roomId=roomId;
        this.bath=bath;
        this.bed= bed;
        this.view= view;
    }
}
