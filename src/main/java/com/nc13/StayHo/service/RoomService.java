package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.SearchConditionDTO;
import com.nc13.StayHo.model.model.SynthesisDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RoomService {
    Integer insert(SynthesisDTO params, List<MultipartFile> files);

    List<?> selectByHotel(int id);
    List<?> selectByHotelForSearch(SearchConditionDTO condition);
    List<?> selectWImg(int id);
    SynthesisDTO select(int id);
    Integer update(int id, SynthesisDTO params, List<MultipartFile> files, int[] delImgList);
    Integer delete(int[] id);
}
