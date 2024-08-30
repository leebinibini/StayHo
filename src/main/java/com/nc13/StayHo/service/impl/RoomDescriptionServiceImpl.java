package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.RoomDescriptionMapper;
import com.nc13.StayHo.model.model.RoomDescriptionDTO;
import com.nc13.StayHo.service.RoomDescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomDescriptionServiceImpl implements RoomDescriptionService {
    private final RoomDescriptionMapper mapper;

    @Override
    public Integer insert(RoomDescriptionDTO descriptionDTO) {
        return mapper.insert(descriptionDTO);
    }

    @Override
    public Integer update(RoomDescriptionDTO descriptionDTO) {
        return mapper.update(descriptionDTO);
    }

    @Override
    public List<?> selectByRoom(Long id) {
        return mapper.selectByRoom(id);
    }
}
