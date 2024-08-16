package com.nc13.StayHo.domain.reservation.service;

import com.nc13.StayHo.domain.reservation.domain.ReservationDTO;
import com.nc13.StayHo.domain.reservation.repository.ReservationRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepositoryImpl REPOSITORY;

    @Override
    public List<ReservationDTO> selectAll(int member_id) {
        return REPOSITORY.selectAll(member_id);
    }

    @Override
    public List<ReservationDTO> selectAllAdmin() {
        return REPOSITORY.selectAllAdmin();
    }

    @Override
    public List<ReservationDTO> selectAllRegistrant(int member_id) {
        return REPOSITORY.selectAllRegistrant(member_id);
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
    public void confirm(ReservationDTO reservationDTO) {
        REPOSITORY.confirm(reservationDTO);
    }

    @Override
    public void delete(int id) {
        REPOSITORY.delete(id);
    }

    @Override
    public void insert(ReservationDTO reservationDTO) {
        Calendar calendar = Calendar.getInstance();

        // 체크인 시간 09:00 설정
        calendar.setTime(reservationDTO.getCheckIn());
        calendar.set(Calendar.HOUR_OF_DAY, 9);
        reservationDTO.setCheckIn(calendar.getTime());

        // 체크아웃 시간 13:00 설정
        calendar.setTime(reservationDTO.getCheckOut());
        calendar.set(Calendar.HOUR_OF_DAY, 13);
        reservationDTO.setCheckOut(calendar.getTime());

        REPOSITORY.insert(reservationDTO);
    }


}
