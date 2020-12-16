package com.ewallet.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MoneyTransferRequest {
    private BigDecimal amount;
    private Long recipient;
}
