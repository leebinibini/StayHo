package com.nc13.StayHo.service.origin;

import com.nc13.StayHo.model.model.HotelImgDTO;
import com.nc13.StayHo.model.model.SearchConditionDTO;
import com.nc13.StayHo.model.model.SearchResultDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mapper.SearchMapper";
    private final ImgService imgService;

    public void createView() {
        SESSION.insert(NAMESPACE + ".createView");
    }

    public List<?> selectSearch(SearchConditionDTO searchConditionDTO) {
        createView();
        if (!searchConditionDTO.getSido().isEmpty()) {
            searchConditionDTO.setSido(searchConditionDTO.getSido().substring(0, 2));
        }
        var result = new ArrayList<>();
        List<SearchResultDTO> list = SESSION.selectList(NAMESPACE + ".selectSearch", searchConditionDTO);
        result.add(list);

        var images = new ArrayList<>();
        for (SearchResultDTO resultDTO : list) {
            List<HotelImgDTO> imgList = imgService.selectHotel(resultDTO.getId());
            if (imgList.isEmpty()) {
                imgList.add(new HotelImgDTO("hotel", "default.png", resultDTO.getId()));
            }
            images.add(imgList);
        }
        result.add(images);
        return result;
    }
}
