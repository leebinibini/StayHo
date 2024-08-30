package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.LocationDTO;

import java.util.List;

public interface LocationService {
    Integer insert(LocationDTO locationDTO);
    Integer update(LocationDTO locationDTO);
    Integer delete(int id);
    LocationDTO select(int id);
    List<?> selectSido();
    List<?> selectSigungu(String sido);
}
