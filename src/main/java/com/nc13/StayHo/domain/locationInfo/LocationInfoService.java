package com.nc13.StayHo.domain.locationInfo;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationInfoService {
    private final SqlSession SESSION;
    private final String NAMESPACE="mapper.LocationInfoMapper";

    public List<String> selectSido(){
        return SESSION.selectList(NAMESPACE+".selectSido");
    }
    public List<String> selectSigungu(String sido){
        return SESSION.selectList(NAMESPACE+".selectSigungu", sido);

    }
}
