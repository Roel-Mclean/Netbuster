package com.example.thedropshopservice.services;

import com.example.thedropshopservice.entities.Product;
import com.example.thedropshopservice.entities.ProductOrder;
import com.example.thedropshopservice.entities.dtos.ProductDto;
import com.example.thedropshopservice.repositories.ImageRepository;
import com.example.thedropshopservice.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;

    public Optional<ProductDto> getProductById(String productId) {
        var objectId = new ObjectId(productId);
        var product = productRepository.findById(objectId);
        if (product.isPresent()) {
            var imageIds = product.get().getImageIds();
            var images = imageRepository.findAllById(imageIds);
            return Optional.of(new ProductDto(product.get(), images));
        }
        return Optional.empty();
    }

    public List<ProductDto> getLatestProducts(int numOfProducts) {
        var products = productRepository.findLatestProducts(numOfProducts);
        var productDtos = new ArrayList<ProductDto>();
        for (Product product: products) {
            var imageIds = product.getImageIds();
            var previewImage = imageRepository.findById(imageIds.get(0));
            productDtos.add(new ProductDto(product, List.of(previewImage.get())));
        }
        return productDtos;
    }

    public List<ProductDto> getAllProducts() {
        var products = productRepository.findAll();
        var productDtos = new ArrayList<ProductDto>();
        for (Product product: products) {
            var imageIds = product.getImageIds();
            var previewImage = imageRepository.findById(imageIds.get(0));
            productDtos.add(new ProductDto(product, List.of(previewImage.get())));
        }
        return productDtos;
    }

    public void reduceStock(ProductOrder productOrder) {
        var productOptional = productRepository.findById(new ObjectId(productOrder.getProductId()));
        if (!productOptional.isPresent()) {
            return;
        }
        var product = productOptional.get();
        product.setStock(product.getStock() - 1);
        productRepository.save(product);
    }

}
