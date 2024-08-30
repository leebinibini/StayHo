package com.nc13.StayHo.controller;

import com.nc13.StayHo.model.model.MemberDTO;
import com.nc13.StayHo.model.enums.Role;
import com.nc13.StayHo.service.origin.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final BCryptPasswordEncoder encoder;


    @RequestMapping("/authSuccess")
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

    @RequestMapping("/authFail")
    public ResponseEntity<Map<String, Object>> authFail() {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "fail");
        return ResponseEntity.ok(resultMap);
    }

    @RequestMapping("/member/logOutSuccess")
    public ResponseEntity<Void> logOutSuccess() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/member/register")
    public ResponseEntity<Map<String, Object>> register(MemberDTO memberDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        if (memberService.validateEmail(memberDTO.getEmail())) {
            memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
            memberService.register(memberDTO);
            resultMap.put("member", memberDTO);
            return ResponseEntity.ok(resultMap);
        }
        resultMap.put("message", "이미 가입된 이메일입니다.");
        return ResponseEntity.badRequest().body(resultMap);
    }


    @GetMapping("/member/memberList/{role}")
    public ResponseEntity<HashMap<String, Object>> memberList(@PathVariable String role) {
        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            List<MemberDTO> members = memberService.selectAll(role);
            resultMap.put("memberList", members);
            return ResponseEntity.ok(resultMap);
        } catch (Exception e) {
            HashMap<String, Object> errorMap = new HashMap<>();
            e.printStackTrace();
            errorMap.put("error", "서버 오류 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMap);
        }

    }

    @PostMapping("/member/update")
    public HashMap<String, Object> update(@RequestBody MemberDTO memberDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();

        String password = memberDTO.getPassword();

        memberDTO.setPassword(encoder.encode(password));

        memberService.update(memberDTO);
        resultMap.put("id", memberDTO.getId());
        return resultMap;
    }

    @PostMapping("/member/withdraw")
    public ResponseEntity<Void> withdraw(@RequestBody MemberDTO inputs) {
        String password = inputs.getPassword();
        MemberDTO original = memberService.selectByEmail(inputs.getEmail());
        if (encoder.matches(password, original.getPassword())) {
            memberService.delete(inputs.getId());

        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/admin/update")
    public HashMap<String, Object> adminUpdate(@RequestBody MemberDTO memberDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        String password = memberDTO.getPassword();

        memberDTO.setPassword(encoder.encode(password));

        memberService.update(memberDTO);
        resultMap.put("id", memberDTO.getId());
        return resultMap;
    }

    @GetMapping("/admin/withdraw/{memberId}")
    public ResponseEntity<Void> adminWithdraw(@PathVariable int memberId) {

        memberService.delete(memberId);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/registrant/reRegister")
    public ResponseEntity<Map<String, Object>> reRegister(MemberDTO memberDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        if (memberService.validateEmail(memberDTO.getEmail())) {
            memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
            memberDTO.setRole(Role.ROLE_REGISTRANT);
            memberService.register(memberDTO);
            resultMap.put("member", memberDTO);
            return ResponseEntity.ok(resultMap);
        }
        resultMap.put("message", "이미 가입된 이메일입니다.");
        return ResponseEntity.badRequest().body(resultMap);
    }

    @PostMapping("/registrant/update")
    public HashMap<String, Object> registrantUpdate(@RequestBody MemberDTO memberDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        String password = memberDTO.getPassword();

        memberDTO.setPassword(encoder.encode(password));

        memberService.update(memberDTO);
        resultMap.put("id", memberDTO.getId());
        return resultMap;
    }

    @PostMapping("/registrant/withdraw")
    public ResponseEntity<Void> registrantWithdraw(@RequestBody MemberDTO inputs) {
        String password = inputs.getPassword();
        MemberDTO original = memberService.selectByEmail(inputs.getEmail());
        if (encoder.matches(password, original.getPassword())) {
            memberService.delete(inputs.getId());

        }
        return ResponseEntity.ok().build();
    }
}
