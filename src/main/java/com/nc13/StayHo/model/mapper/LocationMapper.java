package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.LocationDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LocationMapper {
    Integer insert(@Param("location") LocationDTO locationDTO);

    Integer update(@Param("location") LocationDTO location);

    Integer delete(@Param("id") int id);

    LocationDTO select(@Param("id") int id);

    List<?> selectSido();

    List<?> selectSigungu(@Param("sido") String sido);
}
