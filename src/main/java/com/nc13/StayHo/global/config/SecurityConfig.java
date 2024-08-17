package com.nc13.StayHo.global.config;


import com.nc13.StayHo.domain.Member.Service.MemberDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, MemberDetailsServiceImpl memberDetailsService) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .requestMatchers("/reservation/**").permitAll()
                                .requestMatchers("/reservation/registrant/*").permitAll()
                                .requestMatchers("/member/**").permitAll()
                                .requestMatchers("/search", "/room/**", "/location/**","/image/**", "/hotel/**", "/hotelDescription/**").permitAll()
                                .requestMatchers("/registrant/**").hasAnyAuthority("ROLE_REGISTRANT")
                                .requestMatchers("/registrant/**").permitAll()
                                .requestMatchers("/admin/adMyPage").hasAnyAuthority("ROLE_ADMIN")
                                .requestMatchers("/wishlist/**").authenticated()
                                .anyRequest().authenticated()
                )
                .formLogin((form) ->
                        form
                                .usernameParameter("email")
                                .loginPage("/login")
                                .loginProcessingUrl("/member/auth")
                                .successForwardUrl("/member/authSuccess")
                                .failureForwardUrl("/member/authFail")
                )
                .logout((logout) ->
                        logout
                                .logoutUrl("/member/logout")
                                .logoutSuccessUrl("/member/logOutSuccess")
                                .clearAuthentication(true)
                                .deleteCookies("JSESSIONID"))
                .userDetailsService(memberDetailsService);
        httpSecurity.addFilterBefore(corsFilter(), UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return new CorsFilter(source);
    }
}