package com.assignment.product.controllers

import com.assignment.product.domain.dto.ProductsDto
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.http.MediaType
import com.fasterxml.jackson.databind.ObjectMapper
import kotlin.test.assertEquals
import kotlin.test.assertNotNull


@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerIT {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    val apiUrl = "/api/products";

    @Test
    fun `should return products when GET products endpoint is called and verify second item is Thrillers`() {
        val result = mockMvc.perform(get(apiUrl))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andReturn();

        val responseContent = result.response.contentAsString
        val productsDto = objectMapper.readValue(responseContent, ProductsDto::class.java)
        assertNotNull(productsDto);
        assertEquals("Thrillers", productsDto.data[1]);
    }
}