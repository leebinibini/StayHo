package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.ReservationMapper;
import com.nc13.StayHo.model.model.ReservationDTO;
import com.nc13.StayHo.repository.ReservationRepositoryImpl;
import com.nc13.StayHo.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationMapper mapper;

    @Override
    public List<ReservationDTO> selectAll(int member_id) {
        return mapper.selectAll(member_id);
    }

    @Override
    public List<ReservationDTO> selectAllAdmin() {
        return mapper.selectAllAdmin();
    }

    @Override
    public List<ReservationDTO> selectAllRegistrant(int member_id) {
        return mapper.selectAllRegistrant(member_id);
    }

    @Override
    public ReservationDTO selectOne(int id) {
        return mapper.selectOne(id);
    }

    @Override
    public Integer update(ReservationDTO reservationDTO) {
        return mapper.update(reservationDTO);
    }

    @Override
    public Integer confirm(ReservationDTO reservationDTO) {
        return mapper.confirm(reservationDTO);
    }

    @Override
    public Integer delete(int id) {
        return mapper.delete(id);
    }

    @Override
    public Integer insert(ReservationDTO reservationDTO) {
        Calendar calendar = Calendar.getInstance();

        // 체크인 시간 09:00 설정
        calendar.setTime(reservationDTO.getCheckIn());
        calendar.set(Calendar.HOUR_OF_DAY, 16);
        reservationDTO.setCheckIn(calendar.getTime());

        // 체크아웃 시간 13:00 설정
        calendar.setTime(reservationDTO.getCheckOut());
        calendar.set(Calendar.HOUR_OF_DAY, 11);
        reservationDTO.setCheckOut(calendar.getTime());

        return mapper.insert(reservationDTO);
    }


}
