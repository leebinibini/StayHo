package com.nc13.StayHo.model.model;

import lombok.Data;

import java.util.Date;

@Data
public class ReservationDTO {
    private int id;
    private Date checkIn;
    private Date checkOut;
    private boolean confirmed;
    private boolean status;
    private Long roomId;
    private Long memberId;
}
