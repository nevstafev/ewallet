package com.ewallet.controllers;

import com.ewallet.controllers.requests.CreateAccountRequest;
import com.ewallet.controllers.requests.ChangeAccountBalanceRequest;
import com.ewallet.controllers.requests.MoneyTransferRequest;
import com.ewallet.dto.Account;
import com.ewallet.dto.Transaction;
import com.ewallet.services.AccountService;
import com.ewallet.services.MoneyTransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService accountService;
    private final MoneyTransferService moneyTransferService;

    @PostMapping
    public Account createAccount(@RequestBody CreateAccountRequest request) {
        return accountService.createAccount(request.getName());
    }

    @GetMapping
    public List<Account> getAll() {
        return accountService.getAll();
    }

    @GetMapping("/{id}")
    public Account getAccount(@PathVariable Long id) {
        return accountService.getById(id);
    }

    @PostMapping("/{id}/withdraw")
    public Transaction withdraw(@PathVariable Long id, @RequestBody ChangeAccountBalanceRequest request) {
        return moneyTransferService.withdraw(id, request.getAmount());
    }

    @PostMapping("/{id}/deposit")
    public Transaction deposit(@PathVariable Long id, @RequestBody ChangeAccountBalanceRequest request) {
        return moneyTransferService.deposit(id, request.getAmount());
    }

    @PostMapping("/{id}/transfers")
    public Transaction transferMoney(@PathVariable Long id, @RequestBody MoneyTransferRequest request) {
        return moneyTransferService.transferMoney(id, request.getRecipient(), request.getAmount());
    }

    @GetMapping("/{id}/transfers")
    public List<Transaction> getTransactions(@PathVariable Long id) {
        return moneyTransferService.getTransfersByUserId(id);
    }
}
