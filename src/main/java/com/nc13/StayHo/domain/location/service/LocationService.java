package com.nc13.StayHo.domain.location.service;

import com.nc13.StayHo.domain.location.dto.LocationDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final SqlSession SESSION;
    private final String NAMESPACE="mapper.LocationMapper";

    public void insert(LocationDTO locationDTO){
        SESSION.insert(NAMESPACE+".insert", locationDTO);
    }
    public void update(LocationDTO locationDTO){
        SESSION.update(NAMESPACE+".update", locationDTO);
    }
    public void delete(int id){
        SESSION.delete(NAMESPACE+".delete", id);
    }
}
