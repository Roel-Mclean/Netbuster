package com.example.thedropshopservice.entities.dtos;

import com.example.thedropshopservice.entities.Image;
import com.example.thedropshopservice.entities.Product;
import com.example.thedropshopservice.entities.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private String productId;
    private String title;
    private String description;
    private Double price;
    private int rating;
    private List<Image> images;
    private int stock;
    private String trailerURL;

    public ProductDto(Product product, List<Image> images) {
        this.productId = product.getProductId();
        this.title = product.getTitle();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.rating = product.getRating();
        this.images = images;
        this.stock = product.getStock();
        this.trailerURL = product.getTrailerURL();
    }
}
