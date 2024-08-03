package com.nc13.StayHo.domain.price;

import lombok.Data;

@Data
public class PriceDTO {
    private int roomId;
    private int price;
    private int surcharge;

    public PriceDTO() {
    }

    public PriceDTO(int roomId, int price, int surcharge) {
        this.roomId = roomId;
        this.price = price;
        this.surcharge = surcharge;
    }

}
