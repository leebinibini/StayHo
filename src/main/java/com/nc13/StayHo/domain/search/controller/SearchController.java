package com.nc13.StayHo.domain.search.controller;

import com.nc13.StayHo.domain.search.dto.SearchConditionDTO;
import com.nc13.StayHo.domain.search.dto.SearchResultDTO;
import com.nc13.StayHo.domain.search.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class SearchController {
    private final SearchService SEARCH_SERVICE;
    public SearchController(SearchService searchService){
        this.SEARCH_SERVICE= searchService;
    }
    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestBody SearchConditionDTO searchConditionDTO){
        searchConditionDTO.setSido(searchConditionDTO.getSido().substring(0,2));
        Map<String, Object> resultMap= new HashMap<>();
//        SEARCH_SERVICE.createView();
//        System.out.println("View 생성 혹은 갱신");
        List<SearchResultDTO> list= SEARCH_SERVICE.selectSearch(searchConditionDTO);
        resultMap.put("list", list);
        return ResponseEntity.ok(resultMap);
    }
}
