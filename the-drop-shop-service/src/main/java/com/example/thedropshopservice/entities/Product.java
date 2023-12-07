package com.example.thedropshopservice.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Document("products")
public class Product {
    @Id
    private String productId;
    private String title;
    private String description;
    private Double price;
    private int rating;
    private List<ObjectId> imageIds;
    private int stock;
    private String trailerURL;
}
