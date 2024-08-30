package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.HotelDescriptionMapper;
import com.nc13.StayHo.service.HotelDescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HotelDescriptionServiceImpl implements HotelDescriptionService {
    private final HotelDescriptionMapper mapper;

}
