package com.nc13.StayHo.repository;

import com.nc13.StayHo.model.model.ReservationDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReservationRepositoryImpl implements ReservationRepository {

    private final SqlSession SESSION;

    private final String NAMESPACE = "mapper.ReservationMapper";

    @Override
    public List<ReservationDTO> selectAll(int member_id) {
        return SESSION.selectList(NAMESPACE + ".selectAll", member_id);
    }

    @Override
    public List<ReservationDTO> selectAllAdmin() {
        return SESSION.selectList(NAMESPACE + ".selectAllAdmin");
    }

    @Override
    public List<ReservationDTO> selectAllRegistrant(int member_id) {
        return SESSION.selectList(NAMESPACE + ".selectAllRegistrant", member_id);
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
    public void confirm(ReservationDTO reservationDTO) {
        SESSION.update(NAMESPACE + ".confirm", reservationDTO);
    }

    @Override
    public void delete(int id) {
        SESSION.delete(NAMESPACE + ".delete", id);
    }

    @Override
    public void insert(ReservationDTO reservationDTO) {
        SESSION.insert(NAMESPACE + ".insert", reservationDTO);
    }

}
