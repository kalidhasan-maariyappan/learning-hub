package com.codesnippet.course.lesson23;
import com.codesnippet.course.lesson23.entity.Product;
import com.codesnippet.course.lesson23.repository.ProductRepository;
import com.codesnippet.course.lesson23.service.ProductService;
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
    @BeforeAll static void beforeAll() { System.out.println("Before all tests"); }
    @AfterEach void afterEach() { System.out.println("After each test"); }
    @AfterAll static void afterAll() { System.out.println("After all tests"); }
    @Test void addsProduct() {
        when(repository.save(product)).thenReturn(product);
        Product actual=service.addProduct(product);
        assertNotNull(actual); assertEquals(1,actual.getId());
    }
    @Test void deletesProduct() {
        doNothing().when(repository).deleteById(1);
        service.deleteProduct(1);
        verify(repository,times(1)).deleteById(1);
    }
    @Test void rejectsInvalidNameWithoutSaving() {
        product.setName("");
        RuntimeException error=assertThrows(RuntimeException.class,()->service.addProduct(product));
        assertEquals("Product name must not be empty",error.getMessage());
        verify(repository,never()).save(any(Product.class));
    }
    @Test void privateValidationThroughReflection() throws ReflectiveOperationException {
        var method=ProductService.class.getDeclaredMethod("validateProductName",String.class);
        method.setAccessible(true);
        assertEquals(true,method.invoke(service,"Product"));
        assertEquals(false,method.invoke(service,""));
    }
}
