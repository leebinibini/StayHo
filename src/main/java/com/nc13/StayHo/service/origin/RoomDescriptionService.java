package com.nc13.StayHo.service.origin;

import com.nc13.StayHo.model.model.RoomImgDTO;
import com.nc13.StayHo.model.model.RoomDescriptionDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RoomDescriptionService {
    private  final SqlSession SESSION;
    private String NAMESPACE="mapper.RoomDescriptionMapper";
    private final ImgService imgService;
    private final RoomService roomService;

    public Boolean insert(RoomDescriptionDTO roomDescriptionDTO){

         SESSION.insert(NAMESPACE+".insert", roomDescriptionDTO);
         return Boolean.TRUE;
    }
    public Map<?,?> selectByRoom(Long id){
        Map<String, Object> resultMap= new HashMap<>();
        resultMap.put("description", SESSION.selectOne(NAMESPACE+".selectByRoom", id));
        List<RoomImgDTO> roomImageList = imgService.selectRoom(id);
        if (roomImageList.isEmpty()) {
            roomImageList.add(new RoomImgDTO("room", "default.png", id));
        }
        resultMap.put("image", roomImageList);
        resultMap.put("room", roomService.selectWImg(id));
        return resultMap;
    }
    public void update(RoomDescriptionDTO roomDescriptionDTO){
        SESSION.update(NAMESPACE+".update", roomDescriptionDTO);
    }
    public void delete(int id){
        SESSION.delete(NAMESPACE+".delete", id);
    }
}
