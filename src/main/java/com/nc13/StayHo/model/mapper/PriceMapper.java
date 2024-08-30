package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.PriceDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PriceMapper {
    Integer insert(@Param("priceDTO") PriceDTO priceDTO);

    Integer update(@Param("priceDTO") PriceDTO priceDTO);
}
