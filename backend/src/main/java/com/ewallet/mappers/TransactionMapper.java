package com.ewallet.mappers;

import com.ewallet.domain.TransactionEntity;
import com.ewallet.dto.Transaction;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    Transaction toDto(TransactionEntity entity);

    default List<Transaction> toDtoList(List<TransactionEntity> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

}
