package com.nc13.StayHo.domain.reservation.repository;

import com.nc13.StayHo.domain.reservation.domain.ReservationDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository {
    List<ReservationDTO> selectAll(int member_id);
    ReservationDTO selectOne(int id);
    void update(ReservationDTO reservationDTO);
}
