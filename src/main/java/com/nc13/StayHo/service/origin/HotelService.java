package com.nc13.StayHo.service.origin;
import org.springframework.beans.factory.annotation.Autowired;
import com.nc13.StayHo.model.model.HotelDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mapper.HotelMapper";

    @Autowired
    public HotelService(SqlSession session) {
        SESSION = session;
    }

    public List<HotelDTO> selectAll() {
        return SESSION.selectList(NAMESPACE + ".selectList");
    }
    public List<HotelDTO> selectMember(int id) {
        return SESSION.selectList(NAMESPACE + ".selectMember", id);
    }

    public HotelDTO selectOne(int id) {
        return SESSION.selectOne(NAMESPACE + ".selectOne", id);
    }

    public void insert(HotelDTO hotelDTO) { SESSION.insert(NAMESPACE + ".insert", hotelDTO); }

    public void update(HotelDTO hotelDTO) {
        SESSION.update(NAMESPACE + ".update", hotelDTO);
    }

    public void delete(int id) {
        SESSION.delete(NAMESPACE + ".delete", id);
    }

    public void updateRating(List<?> result) {
        SESSION.update(NAMESPACE + ".updateRating", result);
    }
}
