package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.HotelMapper;
import com.nc13.StayHo.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {
    private final HotelMapper mapper;
}
