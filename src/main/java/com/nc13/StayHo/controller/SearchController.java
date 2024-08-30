package com.nc13.StayHo.controller;

import com.nc13.StayHo.model.model.SearchConditionDTO;
import com.nc13.StayHo.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    @PostMapping("/api/search")
    public ResponseEntity<List<?>> getByCondition(@RequestBody SearchConditionDTO searchConditionDTO) {
        return ResponseEntity.ok(searchService.selectSearch(searchConditionDTO));
    }
}
