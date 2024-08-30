package com.nc13.StayHo.controller;

import com.nc13.StayHo.model.model.ReservationDTO;
import com.nc13.StayHo.service.impl.ReservationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/reservation/")
public class ReservationController {

    private final ReservationServiceImpl RESVE_SERVICE;

    @GetMapping("all/{userId}")
    public Map<String, Object> getAllReservations(@PathVariable int userId) {
        Map<String, Object> resultMap = new HashMap<>();
        List<ReservationDTO> reservations = RESVE_SERVICE.selectAll(userId);
        resultMap.put("resve", reservations);

        return resultMap;
    }

    @GetMapping("one/{id}")
    public ReservationDTO getOneReservation(@PathVariable int id) {
        return RESVE_SERVICE.selectOne(id);
    }

    @PostMapping("updateApproval")
    public ResponseEntity<Void> update(@RequestBody ReservationDTO reservationDTO) {
        RESVE_SERVICE.update(reservationDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("confirm")
    public ResponseEntity<Void> confirm(@RequestBody ReservationDTO reservationDTO) {
        RESVE_SERVICE.confirm(reservationDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("delete/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable int id) {
        RESVE_SERVICE.delete(id);

        return ResponseEntity.ok().build();
    }

    @PostMapping("insert")
    public HashMap<String, Object> insertReservation(@RequestBody ReservationDTO reservationDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            RESVE_SERVICE.insert(reservationDTO);
            resultMap.put("result", "success");
            resultMap.put("resultId", reservationDTO.getId());
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
        }

        return resultMap;
    }

    @GetMapping("adminAll")
    public Map<String, Object> getAdminAll() {
        Map<String, Object> resultMap = new HashMap<>();
        List<ReservationDTO> reservations = RESVE_SERVICE.selectAllAdmin();
        resultMap.put("resve", reservations);

        return resultMap;
    }
    @GetMapping("registrant/{userId}")
    public Map<String, Object> getRegistrantAll(@PathVariable int userId) {
        Map<String, Object> resultMap = new HashMap<>();
        List<ReservationDTO> reservations = RESVE_SERVICE.selectAllRegistrant(userId);
        resultMap.put("resve", reservations);

        return resultMap;
    }
}
