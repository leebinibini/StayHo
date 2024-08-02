package com.nc13.StayHo.domain.roomDescription;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomDescriptionService {
    private  final SqlSession SESSION;
    private String NAMESPACE="mapper.RoomDescriptionMapper";

    public void insert(RoomDescriptionDTO roomDescriptionDTO){
        SESSION.insert(NAMESPACE+".insert", roomDescriptionDTO);
    }
}
