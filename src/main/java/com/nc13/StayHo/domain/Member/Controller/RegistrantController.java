package com.nc13.StayHo.domain.Member.Controller;

import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import com.nc13.StayHo.domain.Member.Model.Role;
import com.nc13.StayHo.domain.Member.Service.RegistrantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/registrant/")
public class RegistrantController {
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private final RegistrantService registrantService;

    public RegistrantController(RegistrantService registrantService) {
        this.registrantService = registrantService;
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

    @PostMapping("register")
    public ResponseEntity<Void> register(MemberDTO memberDTO, RedirectAttributes redirectAttributes) {
        if (registrantService.validateEmail(memberDTO.getEmail())) {
            memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
            memberDTO.setRole(Role.ROLE_REGISTRANT);
            System.out.println(memberDTO);
            registrantService.register(memberDTO);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("update")
    public HashMap<String, Object> update(@RequestBody MemberDTO memberDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        String password = memberDTO.getPassword();

        memberDTO.setPassword(encoder.encode(password));

        registrantService.update(memberDTO);
        resultMap.put("id", memberDTO.getId());
        System.out.println(memberDTO);
        return resultMap;
    }

    @PostMapping("withdraw")
    public ResponseEntity<Void> withdraw(@RequestBody MemberDTO inputs) {
        String password = inputs.getPassword();
        MemberDTO original = registrantService.selectByEmail(inputs.getEmail());
        if (encoder.matches(password, original.getPassword())) {
            registrantService.delete(inputs.getId());

        }
        return ResponseEntity.ok().build();
    }

}
