package com.example.QuickBite.services;

import com.example.QuickBite.model.ProductModel;
import com.example.QuickBite.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductModel addProduct(ProductModel product) {
        return productRepository.save(product);
    }

    public ArrayList<ProductModel> listAllProducts() {
        return (ArrayList<ProductModel>) productRepository.findAll();
    }

    public boolean deleteProduct(Long id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception err) {
            return false;
        }
    }
}
    