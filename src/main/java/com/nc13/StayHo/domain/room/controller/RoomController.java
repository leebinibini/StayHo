package com.nc13.StayHo.domain.room.controller;

import com.nc13.StayHo.domain.img.dto.RoomImgDTO;
import com.nc13.StayHo.domain.img.service.ImgService;
import com.nc13.StayHo.domain.price.dto.PriceDTO;
import com.nc13.StayHo.domain.price.service.PriceService;
import com.nc13.StayHo.domain.room.dto.RoomDTO;
import com.nc13.StayHo.domain.room.service.RoomService;
import com.nc13.StayHo.domain.room.dto.SynthesisDTO;
import com.nc13.StayHo.domain.roomDescription.dto.RoomDescriptionDTO;
import com.nc13.StayHo.domain.roomDescription.service.RoomDescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/room/")
public class RoomController {
    private final RoomService ROOM_SERVICE;
    private final RoomDescriptionService DESCRIPTION_SERVICE;
    private final PriceService PRICE_SERVICE;
    private final ImgService IMG_SERVICE;
    private final String STATIC_PATH = "D:\\NC13\\StayHo_NC13\\src\\main\\resources\\static\\image\\";
    private final String ROOM_PATH = "room";

    public RoomController(RoomService roomService, RoomDescriptionService roomDescriptionService, PriceService priceService, ImgService imgService) {
        this.ROOM_SERVICE = roomService;
        this.DESCRIPTION_SERVICE = roomDescriptionService;
        this.PRICE_SERVICE = priceService;
        this.IMG_SERVICE = imgService;
    }

    @PostMapping("insert")
    public ResponseEntity<Void> insert(@RequestPart(value = "params") SynthesisDTO params,
                                       @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        RoomDTO roomDTO = new RoomDTO(params.getLimitPeople(), params.getType(), params.getHotelId());
        ROOM_SERVICE.insert(roomDTO);
        RoomDescriptionDTO descriptionDTO = new RoomDescriptionDTO(roomDTO.getId(), params.isBath(), params.getBed(), params.getView());
        DESCRIPTION_SERVICE.insert(descriptionDTO);
        PriceDTO priceDTO = new PriceDTO(roomDTO.getId(), params.getPrice(), params.getSurcharge());
        PRICE_SERVICE.insert(priceDTO);

        imageProcess(files, roomDTO.getId());
        return ResponseEntity.ok().build();
    }

    public void imageProcess(List<MultipartFile> files, int roomId) {
        File pathDir = new File(ROOM_PATH);
        if (!pathDir.exists()) {
            new File(ROOM_PATH).mkdirs();
        }

        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            String extension = fileName.substring(fileName.lastIndexOf("."));
            String uploadName = UUID.randomUUID() + extension;
            String path= STATIC_PATH+ROOM_PATH;
            RoomImgDTO roomImgDTO= new RoomImgDTO(ROOM_PATH, uploadName, roomId);
            File target = new File(path, uploadName);
            try {
                file.transferTo(target);
            } catch (IOException e) {
                e.printStackTrace();
            }
            IMG_SERVICE.insertRoom(roomImgDTO);
        }

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
        List<RoomImgDTO> imgDTO= IMG_SERVICE.selectRoom(id);
        resultMap.put("image", imgDTO);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("select/{id}")
    public ResponseEntity<Map<String, Object>> select(@PathVariable int id) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("room", ROOM_SERVICE.select(id));
        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("update")
    public ResponseEntity<Void> update(@RequestBody SynthesisDTO params, MultipartFile multipartFile) {
        System.out.println("사진 받았습니다. " + multipartFile);
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
    public ResponseEntity<Void> delete(@RequestBody int[] checkInputs) {
        for (Integer id : checkInputs) {
            PRICE_SERVICE.delete(id);
            DESCRIPTION_SERVICE.delete(id);
            ROOM_SERVICE.delete(id);
        }

        return ResponseEntity.ok().build();
    }
}

