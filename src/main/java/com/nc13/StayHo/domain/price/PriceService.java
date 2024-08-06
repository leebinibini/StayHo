package com.nc13.StayHo.domain.price;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PriceService {
    private final SqlSession SESSION;
    private final String NAMESPACE="mapper.PriceMapper";

    public void insert(PriceDTO priceDTO){
        SESSION.insert(NAMESPACE+".insert", priceDTO);
    }
    public void update(PriceDTO priceDTO){
        SESSION.update(NAMESPACE+ ".update", priceDTO);
    }
    public void delete(int id){
        SESSION.delete(NAMESPACE+".delete", id);
    }
}
