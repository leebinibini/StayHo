package com.nc13.StayHo.domain.Member.Controller;


import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import com.nc13.StayHo.domain.Member.Service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/member/")
public class MemberController {
    @Autowired
    private final MemberService memberService;
    @Autowired
    private BCryptPasswordEncoder encoder;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @RequestMapping("authSuccess")
    public ResponseEntity<Map<String, Object>> authSuccess(Authentication authentication) {
        Map<String, Object> resultMap = new HashMap<>();
        MemberDTO memberDTO = (MemberDTO) authentication.getPrincipal();

        resultMap.put("result", "success");
        resultMap.put("id", memberDTO.getId());
        resultMap.put("email", memberDTO.getEmail());
        resultMap.put("password", memberDTO.getPassword());
        resultMap.put("name", memberDTO.getName());
        resultMap.put("tel", memberDTO.getTel());
        resultMap.put("role", memberDTO.getRole());

        return ResponseEntity.ok(resultMap);
    }

    @RequestMapping("authFail")
    public ResponseEntity<Map<String, Object>> authFail() {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "fail");


        return ResponseEntity.ok(resultMap);
    }

    @RequestMapping("logOutSuccess")
    public ResponseEntity<Void> logOutSuccess() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("register")
    public ResponseEntity<Void> register(MemberDTO memberDTO) {
        if (memberService.validateEmail(memberDTO.getEmail())) {
            memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
            memberService.register(memberDTO);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("update")
    public HashMap<String, Object> update(@RequestBody MemberDTO memberDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        String password = memberDTO.getPassword();

        memberDTO.setPassword(encoder.encode(password));

        memberService.update(memberDTO);
        resultMap.put("id", memberDTO.getId());
        return resultMap;
    }

    @PostMapping("withdraw")
    public ResponseEntity<Void> withdraw(@RequestBody MemberDTO inputs) {
        String password = inputs.getPassword();
        MemberDTO original = memberService.selectByEmail(inputs.getEmail());
        if (encoder.matches(password, original.getPassword())) {
            memberService.delete(inputs.getId());

        }
        return ResponseEntity.ok().build();
    }
}
