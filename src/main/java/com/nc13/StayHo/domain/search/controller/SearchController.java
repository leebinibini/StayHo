package com.nc13.StayHo.domain.search.controller;

import com.nc13.StayHo.domain.img.dto.HotelImgDTO;
import com.nc13.StayHo.domain.img.service.ImgService;
import com.nc13.StayHo.domain.search.dto.SearchConditionDTO;
import com.nc13.StayHo.domain.search.dto.SearchResultDTO;
import com.nc13.StayHo.domain.search.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class SearchController {
    private final SearchService SEARCH_SERVICE;
    private final ImgService IMG_SERVICE;

    public SearchController(SearchService searchService, ImgService imgService) {
        this.SEARCH_SERVICE = searchService;
        this.IMG_SERVICE= imgService;
    }

    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestBody SearchConditionDTO searchConditionDTO) {
        if (!searchConditionDTO.getSido().isEmpty()) {
            searchConditionDTO.setSido(searchConditionDTO.getSido().substring(0, 2));
        }
        Map<String, Object> resultMap = new HashMap<>();
//        SEARCH_SERVICE.createView();
        List<SearchResultDTO> list = SEARCH_SERVICE.selectSearch(searchConditionDTO);
        resultMap.put("list", list);
        List<List<HotelImgDTO>> images= new ArrayList<>();
        for (SearchResultDTO resultDTO: list){
            List<HotelImgDTO> imgList= IMG_SERVICE.selectHotel(resultDTO.getId());
            if (imgList.isEmpty()){
                imgList.add(new HotelImgDTO("hotel", "default.png", resultDTO.getId()));
            }
            images.add(imgList);
        }
        resultMap.put("images", images);
        return ResponseEntity.ok(resultMap);
    }
}
