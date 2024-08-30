package com.nc13.StayHo.service.origin;

import com.nc13.StayHo.model.model.WishListDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishListService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mapper.WishListMapper";


    public List<?> selectAll(int memberId) {
        return SESSION.selectList(NAMESPACE + ".selectList", memberId);
    }

    public WishListDTO selectOne(WishListDTO wishListDTO) {
        return SESSION.selectOne(NAMESPACE + ".selectOne", wishListDTO);
    }

    public Boolean insert(WishListDTO wishListDTO) {
        try {
            SESSION.insert(NAMESPACE + ".insert", wishListDTO);
        } catch (Exception e) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

    public Boolean delete(WishListDTO wishListDTO) {
        try {
            SESSION.delete(NAMESPACE + ".delete", wishListDTO);
        } catch (Exception e) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }
}
