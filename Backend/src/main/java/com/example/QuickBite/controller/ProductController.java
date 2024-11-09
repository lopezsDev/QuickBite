package com.example.QuickBite.controller;

import com.example.QuickBite.model.ProductModel;
import com.example.QuickBite.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public ArrayList<ProductModel> listAllProducts() {
        return productService.listAllProducts();
    }

    @GetMapping("/{id}")
    public Optional<ProductModel> getProductById(@PathVariable("id") Long id) {
        return productService.getProduct(id);
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
    public ProductModel addProduct(@RequestBody ProductModel product, @RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("////////////////////////////////////////////////////////");
        System.out.println("////////////////////////////////////////////////////////");
        System.out.println("Authorization header: " + authorizationHeader);
        System.out.println("////////////////////////////////////////////////////////");
        System.out.println("////////////////////////////////////////////////////////");
        return this.productService.addProduct(product);
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

