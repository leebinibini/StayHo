package com.nc13.StayHo.domain.Member.Controller;


import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import com.nc13.StayHo.domain.Member.Model.Role;
import com.nc13.StayHo.domain.Member.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MemberController {
    @Autowired
    private final MemberService memberService;
    @Autowired
    private BCryptPasswordEncoder encoder;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @RequestMapping("/member/authSuccess")
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

    @RequestMapping("/member/authFail")
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
    public ResponseEntity<Void> register(MemberDTO memberDTO) {
        if (memberService.validateEmail(memberDTO.getEmail())) {
            memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
            memberService.register(memberDTO);
        }
        return ResponseEntity.ok().build();
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

    @PostMapping("/registrant/register")
    public ResponseEntity<Void> register(MemberDTO memberDTO, RedirectAttributes redirectAttributes) {
        if (memberService.validateEmail(memberDTO.getEmail())) {
            memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
            memberDTO.setRole(Role.ROLE_REGISTRANT);
            System.out.println(memberDTO);
            memberService.register(memberDTO);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/registrant/update")
    public HashMap<String, Object> registrantUpdate(@RequestBody MemberDTO memberDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        String password = memberDTO.getPassword();

        memberDTO.setPassword(encoder.encode(password));

        memberService.update(memberDTO);
        resultMap.put("id", memberDTO.getId());
        System.out.println(memberDTO);
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
