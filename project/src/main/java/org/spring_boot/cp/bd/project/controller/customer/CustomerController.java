package org.spring_boot.cp.bd.project.controller.customer;


import org.spring_boot.cp.bd.project.entity.customer.Customer;
import org.spring_boot.cp.bd.project.repository.customer.CustomerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Customer> getCustomer(@PathVariable int userId) {
        return customerRepository.getCustomer(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
