package com.nc13.StayHo.domain.room;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final SqlSession SESSION;
    private String NAMESPACE = "mapper.RoomMapper";

    public void insert(RoomDTO roomDTO) {
        SESSION.insert(NAMESPACE + ".insert", roomDTO);
    }

    public List<RoomDTO> selectByHotel(int id){
        return SESSION.selectList(NAMESPACE+".selectByHotel", id);
    }
    public RequestDTO select (int id){
        return SESSION.selectOne(NAMESPACE+".select", id);
    }
    public void update(RoomDTO roomDTO){
        SESSION.update(NAMESPACE+".update", roomDTO);
    }
}
