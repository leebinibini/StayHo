package com.nc13.StayHo.domain.room;

import com.nc13.StayHo.domain.roomDescription.RoomDescriptionDTO;
import com.nc13.StayHo.domain.roomDescription.RoomDescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/room/")
public class RoomController {
    private RoomService ROOM_SERVICE;
    private RoomDescriptionService DESCRIPTION_SERVICE;
    
    public RoomController(RoomService roomService, RoomDescriptionService roomDescriptionService){
    this.ROOM_SERVICE = roomService;
    this.DESCRIPTION_SERVICE= roomDescriptionService;
    }
    @GetMapping("")
    public String test(){
        return "hi";
    }
    //@PostMapping("insert")
    @RequestMapping("insert")
    public ResponseEntity<Void> insert(@RequestBody  RequestDTO params){
        System.out.println("경로 들어옴"+ params);
        RoomDTO roomDTO= new RoomDTO(params.getLimitPeople(), params.getType(),1);
        ROOM_SERVICE.insert(roomDTO);
        RoomDescriptionDTO descriptionDTO= new RoomDescriptionDTO(roomDTO.getId(), params.isBath(), params.getBed(), params.getView());
        DESCRIPTION_SERVICE.insert(descriptionDTO);
        System.out.println("추가 성공");
        return ResponseEntity.ok().build();
    }
}
