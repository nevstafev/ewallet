package com.ewallet.repositories;

import com.ewallet.domain.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {

    @Query(value = "SELECT * FROM transactions t "
            + "WHERE t.recipient = :id OR t.sender = :id ORDER BY t.created_date DESC", nativeQuery = true)
    List<TransactionEntity> findAllBySenderAndRecipient(@Param("id") Long id);

}
