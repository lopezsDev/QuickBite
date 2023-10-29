package com.example.QuickBite.controller;

import com.example.QuickBite.model.ProductModel;
import com.example.QuickBite.services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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
    @GetMapping
    public ArrayList<ProductModel> listAllProducts() {
        return productService.listAllProducts();
    }

    /**
     * Agrega un nuevo producto.
     *
     * @param product El producto que se va a agregar.
     * @return El producto agregado.
     */
    @PostMapping
    public ProductModel addProduct(@RequestBody ProductModel product) {
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

