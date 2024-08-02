package com.nc13.StayHo.domain.room;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final SqlSession SESSION;
    private String NAMESPACE = "mapper.RoomMapper";

    public void insert(RoomDTO roomDTO) {
        SESSION.insert(NAMESPACE + ".insert", roomDTO);
    }
}
