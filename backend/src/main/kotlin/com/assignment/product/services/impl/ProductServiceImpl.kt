package com.assignment.product.services.impl

import com.assignment.product.domain.dto.ProductsDto
import com.assignment.product.services.ProductService
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Service

@Service
class ProductServiceImpl : ProductService {
    override fun readProductsFromJsonFile(): ProductsDto {
        val resource = ClassPathResource("static/products.json")
        val inputStream = resource.inputStream
        val objectMapper = jacksonObjectMapper()
        return objectMapper.readValue(inputStream)
    }
}