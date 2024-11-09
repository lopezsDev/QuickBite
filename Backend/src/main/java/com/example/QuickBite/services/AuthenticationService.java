package com.example.QuickBite.services;

import com.example.QuickBite.dto.AuthenticationRequest;
import com.example.QuickBite.dto.AuthenticationResponse;
import com.example.QuickBite.dto.RegisterRequest;
import com.example.QuickBite.model.UserModel;
import com.example.QuickBite.repository.UserRepository;
import com.example.QuickBite.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = UserModel.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

//    public AuthenticationResponse refreshToken(String refreshToken) {
//        if (!jwtService.isTokenValid(refreshToken)) {
//            throw new RuntimeException("Invalid refresh token");
//        }
//
//        String username = jwtService.extractUsername(refreshToken);
//        var user = repository.findByEmail(username).orElseThrow();
//
//        // Genera un nuevo access token
//        var newAccessToken = jwtService.generateToken(user);
//
//        return AuthenticationResponse.builder()
//                .token(newAccessToken)
//                .build();
//    }

}