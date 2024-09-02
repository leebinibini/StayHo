package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.HotelDescriptionDTO;

public interface HotelDescriptionService {
    HotelDescriptionDTO select(int id);
    Integer insert(HotelDescriptionDTO hotelDescriptionDTO);
    Integer update(HotelDescriptionDTO hotelDescriptionDTO);
}
