package com.example.thedropshopservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductOrder {
    private String productId;
    private Size selectedSize;
}
