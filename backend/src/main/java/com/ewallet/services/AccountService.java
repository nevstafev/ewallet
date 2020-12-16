package com.ewallet.services;

import com.ewallet.domain.AccountEntity;
import com.ewallet.dto.Account;
import com.ewallet.mappers.AccountMapper;
import com.ewallet.repositories.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;

    @Transactional
    public Account createAccount(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Account can't be null.");
        }
        if (accountRepository.findFirstByName(name).isPresent()) {
            throw new IllegalArgumentException("Account name already exists.");
        }

        var newAccount = new AccountEntity();
        newAccount.setName(name);

        return accountMapper.toDto(accountRepository.save(newAccount));
    }

    @Transactional(readOnly = true)
    public List<Account> getAll() {
        return accountMapper.toDtoList(accountRepository.findAll());
    }

    @Transactional(readOnly = true)
    public Account getById(Long id) {
        return accountRepository.findById(id)
                .map(accountMapper::toDto)
                .orElseThrow(EntityNotFoundException::new);
    }

    @Transactional
    public Account updateBalance(Account account, BigDecimal amount) {
        if (account.getBalance().add(amount).signum() == -1) {
            throw new IllegalArgumentException("Not enough money");
        }
        account.setBalance(account.getBalance().add(amount));
        return accountMapper.toDto(accountRepository.save(accountMapper.toEntity(account)));
    }

    @Transactional
    public Account changeAccountBalance(Long accountId, BigDecimal amount) {
        var account = getById(accountId);
        account = updateBalance(account, amount);
        return account;
    }
}
