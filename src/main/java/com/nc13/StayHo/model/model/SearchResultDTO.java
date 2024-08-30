package com.nc13.StayHo.model.model;

import lombok.Data;

@Data
public class SearchResultDTO {
    private int id;
    private String name;
    private Double rating;
    private int price;
    private int roomId;
    private boolean swimmingPool;
    private boolean parking;
    private boolean smoking;
    private boolean restaurant;
    private boolean laundryFacilities;
    private boolean fitnessCenter;
}
