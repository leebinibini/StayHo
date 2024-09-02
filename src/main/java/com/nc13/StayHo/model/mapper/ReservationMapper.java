package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.ReservationDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReservationMapper {
    List<ReservationDTO> selectAll(int memberId);

    List<ReservationDTO> selectAllAdmin();

    List<ReservationDTO> selectAllRegistrant(int memberId);

    ReservationDTO selectOne(int id);

    Integer update(ReservationDTO reservationDTO);

    Integer confirm(ReservationDTO reservationDTO);

    Integer delete(int id);

    Integer insert(ReservationDTO reservationDTO);
}
