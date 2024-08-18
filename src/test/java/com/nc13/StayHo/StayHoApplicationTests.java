package com.nc13.StayHo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class StayHoApplicationTests {

	@Test
	void contextLoads() {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		System.out.println(bCryptPasswordEncoder.encode("a"));
		System.out.println(bCryptPasswordEncoder.encode("b"));
		System.out.println(bCryptPasswordEncoder.encode("c"));
		System.out.println(bCryptPasswordEncoder.encode("d"));
	}

}
