package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.PriceDTO;

public interface PriceService {
    Integer insert(PriceDTO priceDTO);

    Integer update(PriceDTO priceDTO);
}
