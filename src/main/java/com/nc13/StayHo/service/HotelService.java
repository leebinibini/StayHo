package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.HotelDTO;
import com.nc13.StayHo.model.model.LocationDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HotelService {
    List<?> selectAll();
    List<?> selectMember(int memberId);
    List<?> select(int id);
    Integer insert(HotelDTO hotelDTO, LocationDTO locationDTO, List<MultipartFile> files);
    Integer update(HotelDTO hotelDTO, int id);
    Integer delete(int id);
    Integer updateRating(List<?> result);
}
