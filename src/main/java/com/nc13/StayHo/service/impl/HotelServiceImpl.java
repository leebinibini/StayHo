package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.HotelMapper;
import com.nc13.StayHo.model.model.HotelDTO;
import com.nc13.StayHo.model.model.LocationDTO;
import com.nc13.StayHo.service.HotelService;
import com.nc13.StayHo.service.ImgService;
import com.nc13.StayHo.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {
    private final HotelMapper mapper;
private final ImgService imgService;
private final LocationServiceImpl locationService;
    @Override
    public List<?> selectAll() {
        return mapper.selectAll();
    }

    @Override
    public List<?> selectMember(int memberId) {
        return mapper.selectMember(memberId);
    }

    @Override
    public List<?> select(int id) {
        var result= new ArrayList<>();
        result.add(mapper.select(id));
        result.add(imgService.selectHotel(id));
        return result;
    }

    @Override
    public Integer insert(HotelDTO hotelDTO, LocationDTO locationDTO, List<MultipartFile> files) {
        var result= 1;
        result*= mapper.insert(hotelDTO);
        locationDTO.setHotelId(hotelDTO.getId());
        result*= locationService.insert(locationDTO);
        if (!files.isEmpty()){
            result*= imgService.insertHotel(files, hotelDTO.getId());
        }
        return result;
    }

    @Override
    public Integer update(HotelDTO hotelDTO, int id) {
        hotelDTO.setId(id);
        return mapper.update(hotelDTO);
    }

    @Override
    public Integer delete(int id) {
        return mapper.delete(id);
    }

    @Override
    public Integer updateRating(List<?> result) {
        return mapper.updateRating(result);
    }
}
