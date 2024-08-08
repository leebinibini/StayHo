package com.nc13.StayHo.domain.search.controller;

import com.nc13.StayHo.domain.search.dto.SearchConditionDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class SearchController {
    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestBody SearchConditionDTO searchConditionDTO){
        System.out.println("search 경로 탐!\t"+searchConditionDTO);
        Map<String, Object> resultMap= new HashMap<>();
        return ResponseEntity.ok(resultMap);
    }
}
