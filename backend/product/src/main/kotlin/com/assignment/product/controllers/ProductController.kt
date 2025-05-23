package com.assignment.product.controllers

import com.assignment.product.domain.dto.ProductsDto
import com.assignment.product.services.impl.ProductServiceImpl
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = ["http://localhost:3000"])
class ProductController(private val productService: ProductServiceImpl) {

    @GetMapping
    fun getProducts(): ResponseEntity<ProductsDto> {
        val productsList = productService.readProductsFromJsonFile()
        return ResponseEntity(productsList, HttpStatus.OK)
    }
}