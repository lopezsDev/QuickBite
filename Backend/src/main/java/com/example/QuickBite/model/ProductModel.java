package com.example.QuickBite.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Entity
@Table(name = "producto")
@AllArgsConstructor
@NoArgsConstructor
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)

    private Long id;

    @NotEmpty(message = "El nombre del producto no puede estar vacío.")
    private String name;

    @NotEmpty(message = "La descripción no puede estar vacía.")
    private String description;

    @NotNull(message = "El precio no puede ser nulo.")
    private int price;

}
