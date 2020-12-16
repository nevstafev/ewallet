package com.ewallet.mappers;

import com.ewallet.domain.AccountEntity;
import com.ewallet.dto.Account;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    Account toDto(AccountEntity entity);

    default List<Account> toDtoList(List<AccountEntity> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    AccountEntity toEntity(Account account);
}
