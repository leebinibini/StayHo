package com.nc13.StayHo.domain.hotelDescription.service;

import com.nc13.StayHo.domain.hotelDescription.model.HotelDescriptionDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelDescriptionService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mapper.HotelDescriptionMapper";

    @Autowired
    public HotelDescriptionService(SqlSession session) {
        SESSION = session;
    }

    public List<HotelDescriptionDTO> selectAll(int id) {
        return SESSION.selectList(NAMESPACE + ".selectList", id);
    }

    public void insert(HotelDescriptionDTO hotelDescriptionDTO) { SESSION.insert(NAMESPACE + ".insert", hotelDescriptionDTO); }

    public void update(HotelDescriptionDTO hotelDescriptionDTO) {
        SESSION.update(NAMESPACE + ".update", hotelDescriptionDTO);
    }

}
