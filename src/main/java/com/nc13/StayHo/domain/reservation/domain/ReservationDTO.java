package com.nc13.StayHo.domain.reservation.domain;

import lombok.Data;

import java.util.Date;

@Data
public class ReservationDTO {
    private int id;
    private Date checkIn;
    private Date checkOut;
    private boolean confirmed;
    private boolean status;
    private int roomId;
    private int memberId;
}
