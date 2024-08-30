package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.ImgMapper;
import com.nc13.StayHo.model.mapper.SearchMapper;
import com.nc13.StayHo.model.model.HotelImgDTO;
import com.nc13.StayHo.model.model.SearchConditionDTO;
import com.nc13.StayHo.model.model.SearchResultDTO;
import com.nc13.StayHo.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
    private final SearchMapper searchMapper;
    private final ImgMapper imgMapper;
    @Override
    public Integer createView() {
        return searchMapper.createView();
    }

    @Override
    public List<?> selectSearch(SearchConditionDTO condition) {
        createView();
        if (!condition.getSido().isEmpty()) {
            condition.setSido(condition.getSido().substring(0, 2));
        }
        var result = new ArrayList<>();
        var list= searchMapper.selectSearch(condition);
        var images= new ArrayList<>();
        for (SearchResultDTO resultDTO : list) {
            var imgList = imgMapper.selectHotel(resultDTO.getId());
            if (imgList.isEmpty()) {
                imgList.add(new HotelImgDTO("hotel", "default.png", resultDTO.getId()));
            }
            images.add(imgList);
        }
        result.add(list);
        result.add(images);
        return result;
    }
}
