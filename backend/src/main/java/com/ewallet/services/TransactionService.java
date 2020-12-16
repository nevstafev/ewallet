package com.ewallet.services;

import com.ewallet.domain.TransactionEntity;
import com.ewallet.dto.Transaction;
import com.ewallet.mappers.TransactionMapper;
import com.ewallet.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    @Transactional
    public Transaction createTransaction(Long sender, Long recipient, BigDecimal amount) {
        var transaction = TransactionEntity.builder()
                .sender(sender)
                .recipient(recipient)
                .amount(amount.abs())
                .build();

        return transactionMapper.toDto(transactionRepository.save(transaction));
    }

    public List<Transaction> getTransactionsByUserId(Long id) {
        return transactionMapper.toDtoList(transactionRepository.findAllBySenderAndRecipient(id));
    }
}
