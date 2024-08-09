package com.nc13.StayHo.domain.search.service;

import com.nc13.StayHo.domain.search.dto.SearchConditionDTO;
import com.nc13.StayHo.domain.search.dto.SearchResultDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final SqlSession SESSION;
    private final String NAMESPACE="mapper.SearchMapper";

    public void createView(){
        SESSION.insert(NAMESPACE+".createView");
    }
    public List<SearchResultDTO> selectView(){
        return SESSION.selectList(NAMESPACE+".selectView");
    }
    public List<SearchResultDTO> selectSearch(SearchConditionDTO searchConditionDTO){
        return SESSION.selectList(NAMESPACE+".selectSearch", searchConditionDTO);
    }
}
