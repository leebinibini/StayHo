package com.nc13.StayHo.domain.room.service;

import com.nc13.StayHo.domain.room.dto.RoomDTO;
import com.nc13.StayHo.domain.room.dto.SynthesisDTO;
import com.nc13.StayHo.domain.search.dto.SearchConditionDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
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

    public List<SynthesisDTO> selectByHotel(int id){
        return SESSION.selectList(NAMESPACE+".selectByHotel", id);
    }
    public List<SynthesisDTO> selectByHotelForSearch(SearchConditionDTO searchConditionDTO){
        return SESSION.selectList(NAMESPACE+".selectByHotelForSearch", searchConditionDTO);
    }
    public SynthesisDTO select (int id){
        return SESSION.selectOne(NAMESPACE+".select", id);
    }
    public void update(RoomDTO roomDTO){
        SESSION.update(NAMESPACE+".update", roomDTO);
    }
    public void delete(int id){
        SESSION.delete(NAMESPACE+".delete", id);
    }
}
