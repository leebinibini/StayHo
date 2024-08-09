package com.nc13.StayHo.domain.hotelDescription.model;

import lombok.Data;

@Data
public class HotelDescriptionDTO {
    private int hotelId;
    private boolean swimmingPool;
    private boolean parking;
    private boolean restaurant;
    private boolean smoking;
    private boolean laundryFacilities;
    private boolean fitnessCenter;
}
