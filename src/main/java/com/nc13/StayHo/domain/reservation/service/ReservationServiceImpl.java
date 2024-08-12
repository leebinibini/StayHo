package com.nc13.StayHo.domain.reservation.service;

import com.nc13.StayHo.domain.reservation.domain.ReservationDTO;
import com.nc13.StayHo.domain.reservation.repository.ReservationRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{

    private final ReservationRepositoryImpl REPOSITORY;

    @Override
    public List<ReservationDTO> selectAll(int member_id) {
        return REPOSITORY.selectAll(member_id);
    }

    @Override
    public ReservationDTO selectOne(int id) {
        return REPOSITORY.selectOne(id);
    }

    @Override
    public void update(ReservationDTO reservationDTO) {
        REPOSITORY.update(reservationDTO);
    }

    @Override
    public void delete(int id) {
        REPOSITORY.delete(id);
    }

    @Override
    public void insert(ReservationDTO reservationDTO) {
        REPOSITORY.insert(reservationDTO);
    }


}
