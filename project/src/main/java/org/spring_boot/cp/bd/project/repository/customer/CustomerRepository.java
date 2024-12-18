package org.spring_boot.cp.bd.project.repository.customer;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spring_boot.cp.bd.project.entity.customer.Customer;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CustomerRepository {

    private final NamedParameterJdbcTemplate template;

    private final Logger logger = LoggerFactory.getLogger(CustomerRepository.class);

public CustomerRepository(NamedParameterJdbcTemplate template) {
    this.template = template;
}

public void save(Customer customer) {
    String sql = "INSERT INTO customers(user_id, email) VALUES (:user_id, :email)";
    MapSqlParameterSource map = new MapSqlParameterSource()
            .addValue("user_id", customer.getUser_id())
            .addValue("email", customer.getEmail());
    template.update(sql, map);
}

public List<Customer> getAll() {
    String sql = "SELECT * FROM customers";

    return template.query(sql, new CustomerRowMapper());
}

public Optional<Customer> getCustomer(int user_id) {
    String sql = "SELECT * FROM customers WHERE user_id = :id";
    MapSqlParameterSource params = new MapSqlParameterSource()
            .addValue("id", user_id);
    return Optional.of(template.queryForObject(sql, params, new CustomerRowMapper()));
}
}
