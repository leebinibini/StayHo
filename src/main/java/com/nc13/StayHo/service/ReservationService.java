package com.nc13.StayHo.service;

import com.nc13.StayHo.model.model.ReservationDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReservationService {
    List<?> selectAll(int member_id);
    List<?> selectAllAdmin();
    List<?> selectAllRegistrant(int member_id);
    ReservationDTO selectOne(int id);
    Integer update(ReservationDTO reservationDTO);
    Integer confirm(ReservationDTO reservationDTO);
    Integer delete(int id);
    Integer insert(ReservationDTO reservationDTO);
}
