package com.codesnippet.course.lesson22;
import com.codesnippet.course.lesson22.entity.Product;
import com.codesnippet.course.lesson22.repository.ProductRepository;
import com.codesnippet.course.lesson22.service.ProductService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @Mock ProductRepository repository;
    @InjectMocks ProductService service;
    private Product product;
    @BeforeEach void prepare() { product=new Product(1,"Product"); }

    @Test void addsProduct() {
        when(repository.save(product)).thenReturn(product);
        Product actual=service.addProduct(product);
        assertNotNull(actual); assertEquals(1,actual.getId());
    }

}
