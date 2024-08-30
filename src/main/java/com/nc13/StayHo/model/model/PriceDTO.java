package com.nc13.StayHo.model.model;

import lombok.Data;

@Data
public class PriceDTO {
    private Long roomId;
    private int price;
    private int surcharge;

    public PriceDTO() {
    }

    public PriceDTO(Long roomId, int price, int surcharge) {
        this.roomId = roomId;
        this.price = price;
        this.surcharge = surcharge;
    }

}
