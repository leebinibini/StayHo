package com.nc13.StayHo.repository;

import com.nc13.StayHo.model.model.ReservationDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository {
    List<ReservationDTO> selectAll(int member_id);
    List<ReservationDTO> selectAllAdmin();
    List<ReservationDTO> selectAllRegistrant(int member_id);
    ReservationDTO selectOne(int id);
    void update(ReservationDTO reservationDTO);
    void confirm(ReservationDTO reservationDTO);
    void delete(int id);
    void insert(ReservationDTO reservationDTO);
}
