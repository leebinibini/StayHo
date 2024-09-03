package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.RoomModel;
import com.nc13.StayHo.model.model.SearchConditionDTO;
import com.nc13.StayHo.model.model.SynthesisDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RoomMapper {
    Integer insert(@Param("roomModel") RoomModel roomModel);
    List<?> selectByHotel(@Param("id") int id);
    List<?> selectByHotelForSearch(SearchConditionDTO conditionDTO);
    SynthesisDTO select(int id);
    Integer update(RoomModel roomModel);
    Integer delete(int id);

}
