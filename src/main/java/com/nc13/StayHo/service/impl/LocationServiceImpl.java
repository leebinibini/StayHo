package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.LocationMapper;
import com.nc13.StayHo.model.model.LocationDTO;
import com.nc13.StayHo.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
    private final LocationMapper mapper;


    @Override
    public Integer insert(LocationDTO location) {
        return mapper.insert(location);
    }

    @Override
    public Integer update(LocationDTO location) {
        return mapper.update(location);
    }

    @Override
    public Integer delete(int id) {
        return mapper.delete(id);
    }

    @Override
    public LocationDTO select(int id) {
        return mapper.select(id);
    }

    @Override
    public List<?> selectSido() {
        return mapper.selectSido();
    }

    @Override
    public List<?> selectSigungu(String sido) {
        return mapper.selectSigungu(sido);
    }
}
