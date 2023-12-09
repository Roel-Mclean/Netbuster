package com.example.thedropshopservice.controllers;

import com.example.thedropshopservice.entities.Order;
import com.example.thedropshopservice.entities.OrderDetails;
import com.example.thedropshopservice.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("api/v1/")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("order/submit")
    public ResponseEntity<Order> getProductById(@RequestBody OrderDetails orderDetails) {
        var order = orderService.placeOrder(orderDetails);
        System.out.println(order);
        return ResponseEntity.ok(order);
    }

    @GetMapping("order/findByEmail")
    public ResponseEntity<List<Order>> findOrdersByEmail(@RequestParam(name = "email") String email) {
        var orders = orderService.findByEmail(email);
        return ResponseEntity.ok(orders);
    }
}
