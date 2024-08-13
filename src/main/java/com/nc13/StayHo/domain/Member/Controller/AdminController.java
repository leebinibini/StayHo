package com.nc13.StayHo.domain.Member.Controller;

import com.nc13.StayHo.domain.Member.Model.MemberDTO;
import com.nc13.StayHo.domain.Member.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/admin/")
public class AdminController {
    @Autowired
    private final AdminService adminService;
    @Autowired
    private BCryptPasswordEncoder encoder;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("update")
    public HashMap<String, Object> update(@RequestBody MemberDTO memberDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        String password = memberDTO.getPassword();

        memberDTO.setPassword(encoder.encode(password));

        adminService.update(memberDTO);
        resultMap.put("id", memberDTO.getId());
        return resultMap;
    }

    @RequestMapping("authSuccess")
    public ResponseEntity<Map<String, Object>> authSuccess(Authentication authentication) {
        HashMap<String, Object> resultMap = new HashMap<>();
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
}
