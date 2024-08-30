package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.WishListMapper;
import com.nc13.StayHo.model.model.WishListDTO;
import com.nc13.StayHo.service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {
    private final WishListMapper wishListMapper;
    @Override
    public List<?> selectAll(int memberId) {
        return wishListMapper.selectAll(memberId);
    }

    @Override
    public WishListDTO selectOne(WishListDTO wish) {
        return wishListMapper.selectOne(wish);
    }

    @Override
    public Integer insert(WishListDTO wish) {
        return wishListMapper.insert(wish);
    }

    @Override
    public Integer delete(WishListDTO wish) {
        return wishListMapper.delete(wish);
    }
}
