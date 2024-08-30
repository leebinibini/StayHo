package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.SearchConditionDTO;
import com.nc13.StayHo.model.model.SynthesisDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RoomService {
    Integer insert(SynthesisDTO params, List<MultipartFile> files);

    List<?> selectByHotel(Long id);
    List<?> selectByHotelForSearch(SearchConditionDTO condition);
    List<?> selectWImg(Long id);
    SynthesisDTO select(Long id);
    Integer update(Long id, SynthesisDTO params, List<MultipartFile> files, int[] delImgList);
    Integer delete(Long[] id);
}
