package com.nc13.StayHo.domain.hotelDescription.model;

import lombok.Data;

@Data
public class HotelDescriptionDTO {
    private int hotelId;
    private boolean swimming_pool;
    private boolean parking;
    private boolean restaurant;
    private boolean smoking;
    private boolean laundry_facilities;
    private boolean fitness_center;
}
