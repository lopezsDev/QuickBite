package com.example.QuickBite.controller;

import com.example.QuickBite.model.ProductModel;
import com.example.QuickBite.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    /**
     * Obtiene la lista de todos los productos.
     *
     * @return Lista de productos.
     */
    @GetMapping("/allproducts")
    public ResponseEntity<?> listAllProducts() {
        List<ProductModel> products = productService.listAllProducts();
        if (products.isEmpty()) {
            return ResponseEntity.ok("No hay productos registrados");
        }
        return ResponseEntity.ok(products);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") Long id) {
        Optional<ProductModel> product = productService.getProduct(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        }else {
            return ResponseEntity.ok("No existe el producto con el id " + id)   ;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductModel> updateProduct(@PathVariable Long id, @RequestBody ProductModel product) {
        ProductModel updatedProduct = productService.updateProduct(id, product);

        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Agrega un nuevo producto.
     *
     * @param product El producto que se va a agregar.
     * @return El producto agregado.
     */
    @PostMapping("/add")
    public ResponseEntity<ProductModel> addProduct(@Valid @RequestBody ProductModel product, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            ProductModel savedProduct = this.productService.addProduct(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * Elimina un producto por su ID.
     *
     * @param id El ID del producto que se va a eliminar.
     * @return Respuesta HTTP indicando el resultado de la operación.
     */
    @DeleteMapping(path = "/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        boolean ok = this.productService.deleteProduct(id);
        if (ok) {
            return "El producto con el id " + id + " fué eliminado";
        } else {
            return "El producto con el id " + id + " no fué eliminado";
        }
    }
}

