package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.WishListDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WishListMapper {
    List<?> selectAll(@Param("memberId") int memberId);

    WishListDTO selectOne(@Param("wish") WishListDTO wishListDTO);

    Integer insert(@Param("wish") WishListDTO wish);

    Integer delete(@Param("wish") WishListDTO wish);
}
