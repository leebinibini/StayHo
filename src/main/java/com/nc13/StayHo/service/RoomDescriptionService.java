package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.RoomDescriptionDTO;

import java.util.List;

public interface RoomDescriptionService {
    Integer insert(RoomDescriptionDTO descriptionDTO);

    Integer update( RoomDescriptionDTO descriptionDTO);

    List<?> selectByRoom(Long id);
}
