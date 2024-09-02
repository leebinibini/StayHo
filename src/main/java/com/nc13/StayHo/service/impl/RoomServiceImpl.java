package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.RoomMapper;
import com.nc13.StayHo.model.model.*;
import com.nc13.StayHo.service.ImgService;
import com.nc13.StayHo.service.RoomDescriptionService;
import com.nc13.StayHo.service.RoomService;
import com.nc13.StayHo.service.PriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomMapper mapper;
    private final RoomDescriptionServiceImpl roomDescriptionService;
    private final PriceServiceImpl priceService;
    private final ImgServiceImpl imgService;

    @Override
    public Integer insert(SynthesisDTO params, List<MultipartFile> files) {
        var result = 1;
        var roomModel = new RoomModel(params.getLimitPeople(), params.getType(), params.getHotelId());
        result *= mapper.insert(roomModel);
        var descriptionDTO = new RoomDescriptionDTO(roomModel.getId(), params.isBath(), params.getBed(), params.getView(), params.getContent());
        result *= roomDescriptionService.insert(descriptionDTO);
        var priceDTO = new PriceDTO(roomModel.getId(), params.getPrice(), params.getSurcharge());
        result *= priceService.insert(priceDTO);
        if (!files.isEmpty()){
            result*= imgService.insertRoom(files, roomModel.getId());
        }
        return result;
    }

    @Override
    public List<?> selectByHotel(Long id) {
        return mapper.selectByHotel(id);
    }

    @Override
    public List<?> selectByHotelForSearch(SearchConditionDTO condition) {
        return mapper.selectByHotelForSearch(condition);
    }

    @Override
    public List<?> selectWImg(Long id) {
        var result = new ArrayList<>();
        result.add(mapper.select(id));
        result.add(imgService.selectRoom(id));

        return result;
    }

    @Override
    public SynthesisDTO select(Long id) {
        return mapper.select(id);
    }

    @Override
    public Integer update(Long id, SynthesisDTO params, List<MultipartFile> files, int[] delImgList) {
        var result= 1;
        var roomModel = new RoomModel(params.getLimitPeople(), params.getType(), params.getHotelId());
        roomModel.setId(id);
        result*= mapper.update(roomModel);
        var descriptionDTO = new RoomDescriptionDTO(id, params.isBath(), params.getBed(), params.getView(), params.getContent());
        result*=roomDescriptionService.update(descriptionDTO);
        var priceDTO = new PriceDTO(id, params.getPrice(), params.getSurcharge());
        result*= priceService.update(priceDTO);
        return result;
    }

    @Override
    public Integer delete(Long[] id) {
        var result= 1;
        for (Long i : id){
            result*= mapper.delete(i);
        }
        return result;
    }
}
