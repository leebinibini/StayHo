package com.nc13.StayHo.domain.reservation.repository;

import com.nc13.StayHo.domain.reservation.domain.ReservationDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReservationRepositoryImpl implements ReservationRepository{

    private final SqlSession SESSION;

    private final String NAMESPACE = "mapper.ReservationMapper";

    @Override
    public List<ReservationDTO> selectAll(int member_id) {
        return SESSION.selectList(NAMESPACE + ".selectAll", member_id);
    }

    @Override
    public ReservationDTO selectOne(int id) {
        return SESSION.selectOne(NAMESPACE + ".selectOne", id);
    }

    @Override
    public void update(ReservationDTO reservationDTO) {
        SESSION.update(NAMESPACE + ".update", reservationDTO);
    }

    @Override
    public void delete(int id) {
        SESSION.delete(NAMESPACE + ".delete", id);
    }

}
