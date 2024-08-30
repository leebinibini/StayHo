package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.SearchConditionDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SearchMapper {
    Integer createView();
    List<?> selectSearch(@Param("condition") SearchConditionDTO searchConditionDTO);
}
