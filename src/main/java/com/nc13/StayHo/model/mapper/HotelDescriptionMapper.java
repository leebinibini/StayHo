package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.HotelDescriptionDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface HotelDescriptionMapper {
    HotelDescriptionDTO select(@Param("id") int id);

    Integer insert(@Param("hotelDescriptionDTO") HotelDescriptionDTO hotelDescriptionDTO);

    Integer update(@Param("hotelDescriptionDTO") HotelDescriptionDTO hotelDescriptionDTO);
}
