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

    public SearchController(SearchService searchService) {
        this.SEARCH_SERVICE = searchService;
    }

    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestBody SearchConditionDTO searchConditionDTO) {
        if (!searchConditionDTO.getSido().isEmpty()) {
            searchConditionDTO.setSido(searchConditionDTO.getSido().substring(0, 2));
            if (searchConditionDTO.getSido().equals("시도")) {
                searchConditionDTO.setSido("");
            }
        }
        Map<String, Object> resultMap = new HashMap<>();
//        SEARCH_SERVICE.createView();
        List<SearchResultDTO> list = SEARCH_SERVICE.selectSearch(searchConditionDTO);
        resultMap.put("list", list);
        return ResponseEntity.ok(resultMap);
    }
}
