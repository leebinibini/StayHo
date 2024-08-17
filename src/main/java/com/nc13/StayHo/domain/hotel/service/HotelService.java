package com.nc13.StayHo.domain.hotel.service;
import com.nc13.StayHo.domain.img.dto.HotelImgDTO;
import com.nc13.StayHo.domain.img.service.ImgService;
import org.springframework.beans.factory.annotation.Autowired;
import com.nc13.StayHo.domain.hotel.model.HotelDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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


}
