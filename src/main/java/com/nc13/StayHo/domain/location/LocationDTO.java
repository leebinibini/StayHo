package com.nc13.StayHo.domain.location;

import lombok.Data;

@Data
public class LocationDTO {
    private int hotelId;
    private String address;
    private String sido;
    private String sigungu;
    private String zonecode;
    private String buildingName;

    public LocationDTO(){}
    public LocationDTO(int id, String address, String sido, String sigungu, String zonecode, String buildingName){
        this.hotelId= id;
        this.address= address;
        this.sido= sido;
        this.sigungu=sigungu;
        this.zonecode=zonecode;
        this.buildingName= buildingName;
    }
}
