package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.SearchConditionDTO;

import java.util.List;

public interface SearchService {
    Integer createView();
    List<?> selectSearch(SearchConditionDTO condition);
}
