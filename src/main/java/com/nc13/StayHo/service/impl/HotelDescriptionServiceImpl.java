package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.HotelDescriptionMapper;
import com.nc13.StayHo.model.model.HotelDescriptionDTO;
import com.nc13.StayHo.service.HotelDescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HotelDescriptionServiceImpl implements HotelDescriptionService {
    private final HotelDescriptionMapper mapper;

    @Override
    public HotelDescriptionDTO select(int id) {
        return mapper.select(id);
    }

    @Override
    public Integer insert(HotelDescriptionDTO hotelDescriptionDTO) {
        return mapper.insert(hotelDescriptionDTO);
    }

    @Override
    public Integer update(HotelDescriptionDTO hotelDescriptionDTO) {
        return mapper.update(hotelDescriptionDTO);
    }
}
