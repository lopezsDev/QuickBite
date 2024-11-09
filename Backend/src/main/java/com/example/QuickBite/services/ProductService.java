package com.example.QuickBite.services;

import com.example.QuickBite.model.ProductModel;
import com.example.QuickBite.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

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

    /**
     * El método listAllProducts() es un método público que
     * devuelve un ArrayList de objetos ProductModel.
     * El método llama al método findAll() del productRepository para
     * recuperar todos los objetos de la base de datos.
     * El método devuelve los objetos recuperados como
     * un ArrayList de ProductModel.
     */

    public ArrayList<ProductModel> listAllProducts() {
        return (ArrayList<ProductModel>) productRepository.findAll();
    }

    public ProductModel updateProduct(Long id, ProductModel productModel) {
        Optional<ProductModel> existingProduct = productRepository.findById(id);

        if (existingProduct.isPresent()) {
            ProductModel productToUpdate = existingProduct.get();
            productToUpdate.setName(productModel.getName());
            productToUpdate.setDescription(productModel.getDescription());
            productToUpdate.setPrice(productModel.getPrice());

            return productRepository.save(productToUpdate);
        }
        return null; // O podrías lanzar una excepción personalizada
    }

    public Optional<ProductModel> getProduct(Long id) {
        return productRepository.findById(id);
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
    