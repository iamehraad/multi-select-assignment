package com.assignment.product.services

import com.assignment.product.domain.dto.ProductsDto

interface ProductService {
    fun readProductsFromJsonFile(): ProductsDto
}