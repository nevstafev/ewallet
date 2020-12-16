package com.ewallet.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Transaction {
    private Long id;
    private Date createdDate;
    private Long sender;
    private Long recipient;
    private BigDecimal amount;
}
