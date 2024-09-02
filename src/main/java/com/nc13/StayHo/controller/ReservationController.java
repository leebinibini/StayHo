package com.nc13.StayHo.controller;

import com.nc13.StayHo.model.model.ReservationDTO;
import com.nc13.StayHo.service.impl.ReservationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationServiceImpl reservationService;

    @GetMapping("all/{userId}")
    public ResponseEntity<?> getAllReservations(@PathVariable int userId) {
        return ResponseEntity.ok(reservationService.selectAll(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneReservation(@PathVariable int id) {
        return ResponseEntity.ok(reservationService.selectOne(id));
    }

    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody ReservationDTO reservationDTO) {
        return ResponseEntity.ok(reservationService.update(reservationDTO));
    }

    @PostMapping("confirm")
    public ResponseEntity<?> confirm(@RequestBody ReservationDTO reservationDTO) {
        return ResponseEntity.ok(reservationService.confirm(reservationDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable int id) {
        return ResponseEntity.ok(reservationService.delete(id));
    }

    @PostMapping("")
    public ResponseEntity<?> insertReservation(@RequestBody ReservationDTO reservationDTO) {
        return ResponseEntity.ok(reservationService.insert(reservationDTO));
    }

    @GetMapping("adminAll")
    public ResponseEntity<?> getAdminAll() {
        return ResponseEntity.ok(reservationService.selectAllAdmin());
    }

    @GetMapping("registrant/{userId}")
    public ResponseEntity<?> getRegistrantAll(@PathVariable int userId) {
        return ResponseEntity.ok(reservationService.selectAllRegistrant(userId));
    }
}
