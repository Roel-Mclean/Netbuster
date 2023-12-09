package com.example.thedropshopservice.services;

import com.example.thedropshopservice.entities.Order;
import com.example.thedropshopservice.entities.OrderDetails;
import com.example.thedropshopservice.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final EmailService emailService;
    private final ProductService productService;
    private final MongoTemplate mongoTemplate;

    public Order placeOrder(OrderDetails orderDetails) {
        var order = orderRepository.save(Order.builder()
                .products(orderDetails.getProducts())
                .customer(orderDetails.getCustomer())
                .datePlaced(LocalDateTime.now())
                .build());
        orderDetails.getProducts().forEach(product -> productService.reduceStock(product));
        emailService.sendSimpleMessage(order.getCustomer().getEmail(), "Order Placed", "Thank you " + order.getCustomer().getFname() + " for placing your order. Your order number is " + order.getOrderId());
        return order;
    }

    public List<Order> findByEmail(String email) {
        Query query = new Query();
        query.addCriteria(Criteria.where("customer.email").is(email));
        List<Order> orders = mongoTemplate.find(query, Order.class);
        return orders;
    }
}
