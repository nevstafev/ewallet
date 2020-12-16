package com.ewallet.services;

import com.ewallet.dto.Account;
import com.ewallet.dto.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MoneyTransferService {
    private final AccountService accountService;
    private final TransactionService transactionService;


    @Transactional
    public Transaction transferMoney(Long from, Long to, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount cannot be less than zero");
        }

        var sender = accountService.getById(from);
        var recipient = accountService.getById(to);

        accountService.updateBalance(sender, amount.negate());
        accountService.updateBalance(recipient, amount);

        return transactionService.createTransaction(from, to, amount);
    }

    @Transactional
    public Transaction withdraw(Long id, BigDecimal amount) {
        var account =  accountService.changeAccountBalance(id, amount.abs().negate());

        return  transactionService.createTransaction(id, null, amount.abs());
    }

    @Transactional
    public Transaction deposit(Long id, BigDecimal amount) {
        var Transaction =  accountService.changeAccountBalance(id, amount.abs());

        return  transactionService.createTransaction(null, id, amount.abs());
    }

    public List<Transaction> getTransfersByUserId(Long id) {
        return transactionService.getTransactionsByUserId(id);
    }
}
