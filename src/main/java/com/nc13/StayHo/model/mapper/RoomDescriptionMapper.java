package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.RoomDescriptionDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RoomDescriptionMapper {
    Integer insert(@Param("descriptionDTO") RoomDescriptionDTO descriptionDTO);

    Integer update(@Param("descriptionDTO") RoomDescriptionDTO descriptionDTO);

    List<?> selectByRoom(@Param("id") Long id);
}
