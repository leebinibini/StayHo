package com.nc13.StayHo.domain.reservation.controller;

import com.nc13.StayHo.domain.reservation.domain.ReservationDTO;
import com.nc13.StayHo.domain.reservation.service.ReservationServiceImpl;
import lombok.RequiredArgsConstructor;
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
    public Map<String, Object> getAllReservations(@PathVariable int userId){
        Map<String, Object> resultMap = new HashMap<>();
        List<ReservationDTO> reservations = RESVE_SERVICE.selectAll(userId);
        resultMap.put("resve",reservations);

        return resultMap;
    }

    @GetMapping("one/{id}")
    public ReservationDTO getOneReservation(@PathVariable int id){
        return RESVE_SERVICE.selectOne(id);
    }
}
