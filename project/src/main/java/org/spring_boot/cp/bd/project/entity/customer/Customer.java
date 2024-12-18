package org.spring_boot.cp.bd.project.entity.customer;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("customers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Customer {

    @Id
    private int customer_id;

    private int user_id;

    private String email;

    public Customer(int user_id, String email) {
        this.user_id = user_id;
        this.email = email;
    }

    public static Customer createNew(int user_id, String email) {
      return  Customer.builder()
                .user_id(user_id)
                .email(email)
                .build();
    }


}
