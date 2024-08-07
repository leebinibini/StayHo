package com.nc13.StayHo.domain.Member.Controller;


import com.nc13.StayHo.domain.Member.Model.MemberDTO;
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

    @GetMapping("register")
    public String showRegister() {
        return "member/register";
    }

    @PostMapping("register")
    public String register(MemberDTO memberDTO, RedirectAttributes redirectAttributes) {
        if (memberService.validateEmail(memberDTO.getEmail())) {
            memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
            System.out.println(memberDTO);
            memberService.register(memberDTO);
        } else {
            redirectAttributes.addAttribute("message", "중복된 아이디로는 가입할 수 없습니다.");
            return "redirect:showMessage";
        }
        return "redirect:/";
    }

    @PostMapping("update")
    public HashMap<String, Object> update(@RequestBody MemberDTO memberDTO) {
        System.out.println(memberDTO);
        HashMap<String, Object> resultMap = new HashMap<>();
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
