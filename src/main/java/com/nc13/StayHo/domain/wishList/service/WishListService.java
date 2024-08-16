package com.nc13.StayHo.domain.wishList.service;

import com.nc13.StayHo.domain.wishList.model.WishListDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishListService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mapper.WishListMapper";

    @Autowired
    public WishListService(SqlSession session) {
        SESSION = session;
    }

    public List<WishListDTO> selectAll(int memberId) {
        return SESSION.selectList(NAMESPACE + ".selectList", memberId);
    }

    public WishListDTO selectOne(WishListDTO wishListDTO) {
        return SESSION.selectOne(NAMESPACE + ".selectOne", wishListDTO);
    }

    public void insert(WishListDTO wishListDTO) { SESSION.insert(NAMESPACE + ".insert", wishListDTO); }

    public void delete(WishListDTO wishListDTO) {
        SESSION.delete(NAMESPACE + ".delete", wishListDTO);
    }
}
