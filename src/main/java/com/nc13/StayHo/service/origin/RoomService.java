package com.nc13.StayHo.service.origin;

import com.nc13.StayHo.model.model.PriceDTO;
import com.nc13.StayHo.model.model.RoomModel;
import com.nc13.StayHo.model.model.SynthesisDTO;
import com.nc13.StayHo.model.model.RoomDescriptionDTO;
import com.nc13.StayHo.model.model.SearchConditionDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mapper.RoomMapper";

    private final RoomDescriptionService descriptionService;
    private final PriceService priceService;
    private final ImgService imgService;

    public void insert(SynthesisDTO params, List<MultipartFile> files) {
        RoomModel roomModel = new RoomModel(params.getLimitPeople(), params.getType(), params.getHotelId());
        SESSION.insert(NAMESPACE + ".insert", roomModel);
        RoomDescriptionDTO descriptionDTO = new RoomDescriptionDTO(roomModel.getId(), params.isBath(), params.getBed(), params.getView(), params.getContent());
        descriptionService.insert(descriptionDTO);
        PriceDTO priceDTO = new PriceDTO(roomModel.getId(), params.getPrice(), params.getSurcharge());
        priceService.insert(priceDTO);

        if (files != null) {
            imgService.insertRoom(files, roomModel.getId());
        }
    }

    public List<SynthesisDTO> selectByHotel(Long id) {
        return SESSION.selectList(NAMESPACE + ".selectByHotel", id);
    }

    public List<SynthesisDTO> selectByHotelForSearch(SearchConditionDTO searchConditionDTO) {
        return SESSION.selectList(NAMESPACE + ".selectByHotelForSearch", searchConditionDTO);
    }

    public Map<?, ?> selectWImg(Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("room", SESSION.selectOne(NAMESPACE + ".select", id));
        resultMap.put("images", imgService.selectRoom(id));
        return resultMap;
    }
    public SynthesisDTO select(Long id){
        return SESSION.selectOne(NAMESPACE+ ".select", id);
    }

    public void update(Long id, SynthesisDTO params, List<MultipartFile> files, int[] delImgList) {
        RoomModel roomModel = new RoomModel(params.getLimitPeople(), params.getType(), params.getHotelId());
        roomModel.setId(id);
        SESSION.update(NAMESPACE + ".update", roomModel);

        RoomDescriptionDTO descriptionDTO = new RoomDescriptionDTO(id, params.isBath(), params.getBed(), params.getView(), params.getContent());
        descriptionService.update(descriptionDTO);

        PriceDTO priceDTO = new PriceDTO(id, params.getPrice(), params.getSurcharge());
        priceService.update(priceDTO);

        if (files != null) {
            imgService.insertRoom(files, id);
        }
        if (delImgList != null) {
            for (Integer i : delImgList) {
                imgService.delete(i);
            }
        }
    }

    public void delete(int id) {
        SESSION.delete(NAMESPACE + ".delete", id);
    }
}
