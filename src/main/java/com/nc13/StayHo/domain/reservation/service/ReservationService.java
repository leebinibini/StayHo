package com.nc13.StayHo.domain.reservation.service;

import com.nc13.StayHo.domain.reservation.domain.ReservationDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReservationService {
    List<ReservationDTO> selectAll(int member_id);
    List<ReservationDTO> selectAllAdmin();
    List<ReservationDTO> selectAllRegistrant(int member_id);
    ReservationDTO selectOne(int id);
    void update(ReservationDTO reservationDTO);
    void confirm(ReservationDTO reservationDTO);
    void delete(int id);
    void insert(ReservationDTO reservationDTO);
}
