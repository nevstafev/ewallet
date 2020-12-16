package com.ewallet.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    private Long id;

    private String name;

    @JsonIgnore
    private Long version;

    @Builder.Default
    private BigDecimal balance = BigDecimal.ZERO;

}
