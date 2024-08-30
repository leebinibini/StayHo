package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.WishListDTO;

import java.util.List;

public interface WishListService {
    List<?> selectAll(int memberId);

    WishListDTO selectOne(WishListDTO wishListDTO);

    Integer insert(WishListDTO wishListDTO);

    Integer delete(WishListDTO wish);
}
