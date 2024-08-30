package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.PriceMapper;
import com.nc13.StayHo.model.model.PriceDTO;
import com.nc13.StayHo.service.PriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PriceServiceImpl implements PriceService {
    private final PriceMapper mapper;
    @Override
    public Integer insert(PriceDTO priceDTO) {
        return mapper.insert(priceDTO);
    }

    @Override
    public Integer update(PriceDTO priceDTO) {
        return mapper.update(priceDTO);
    }
}
