package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.MemberMapper;
import com.nc13.StayHo.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberMapper mapper;
}
