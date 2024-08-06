package com.nc13.StayHo.domain.room;

import com.nc13.StayHo.domain.price.PriceDTO;
import com.nc13.StayHo.domain.price.PriceService;
import com.nc13.StayHo.domain.roomDescription.RoomDescriptionDTO;
import com.nc13.StayHo.domain.roomDescription.RoomDescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/room/")
public class RoomController {
    private final RoomService ROOM_SERVICE;
    private final RoomDescriptionService DESCRIPTION_SERVICE;
    private final PriceService PRICE_SERVICE;

    public RoomController(RoomService roomService, RoomDescriptionService roomDescriptionService, PriceService priceService) {
        this.ROOM_SERVICE = roomService;
        this.DESCRIPTION_SERVICE = roomDescriptionService;
        this.PRICE_SERVICE = priceService;
    }

    @GetMapping("")
    public String test() {
        return "hi";
    }

    @PostMapping("insert")
    public ResponseEntity<Void> insert(@RequestBody SynthesisDTO params) {
        RoomDTO roomDTO = new RoomDTO(params.getLimitPeople(), params.getType(), params.getHotelId());
        ROOM_SERVICE.insert(roomDTO);
        RoomDescriptionDTO descriptionDTO = new RoomDescriptionDTO(roomDTO.getId(), params.isBath(), params.getBed(), params.getView());
        DESCRIPTION_SERVICE.insert(descriptionDTO);
        PriceDTO priceDTO = new PriceDTO(roomDTO.getId(), params.getPrice(), params.getSurcharge());
        PRICE_SERVICE.insert(priceDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("selectList/{id}")
    public ResponseEntity<Map<String, Object>> selectList(@PathVariable int id) {
        Map<String, Object> resultMap = new HashMap<>();
        List<SynthesisDTO> list = ROOM_SERVICE.selectByHotel(id);
        resultMap.put("roomList", list);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("description/{id}")
    public ResponseEntity<Map<String, Object>> selectDescription(@PathVariable int id) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("description", DESCRIPTION_SERVICE.selectByRoom(id));

        return ResponseEntity.ok(resultMap);
    }
    @GetMapping("select/{id}")
    public ResponseEntity<Map<String, Object>> select(@PathVariable int id){
        Map<String, Object> resultMap= new HashMap<>();
        resultMap.put("room", ROOM_SERVICE.select(id));
        return ResponseEntity.ok(resultMap);
    }
    @PostMapping("update")
    public ResponseEntity<Void> update(@RequestBody SynthesisDTO params){
        RoomDTO roomDTO = new RoomDTO(params.getLimitPeople(), params.getType(), 1);
        roomDTO.setId(params.getId());
        ROOM_SERVICE.update(roomDTO);

        RoomDescriptionDTO descriptionDTO = new RoomDescriptionDTO(roomDTO.getId(), params.isBath(), params.getBed(), params.getView());
        DESCRIPTION_SERVICE.update(descriptionDTO);

        PriceDTO priceDTO = new PriceDTO(roomDTO.getId(), params.getPrice(), params.getSurcharge());
        PRICE_SERVICE.update(priceDTO);

        return ResponseEntity.ok().build();
    }

    @PostMapping("delete")
    public ResponseEntity<Void> delete(@RequestBody int[] checkInputs){
        for (Integer id:checkInputs){
            PRICE_SERVICE.delete(id);
            DESCRIPTION_SERVICE.delete(id);
            ROOM_SERVICE.delete(id);
        }

        return ResponseEntity.ok().build();
    }
}

