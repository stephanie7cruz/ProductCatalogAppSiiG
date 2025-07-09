
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../services/product'; 
import { ProductViewModel } from '../models/product-view-model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './product-list.component.html', // Asegúrate de que el nombre del archivo es correcto
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: ProductViewModel[] = []; // Inicializamos como un array vacío para la lista de productos
  errorMessage: string = ''; // Para mostrar mensajes de error
  productId: number | null = null; // Propiedad para el input de búsqueda por ID
  loading: boolean = false; // Indicador de carga para mostrar spinners
  singleProductView: ProductViewModel | null = null; // Propiedad para mostrar un solo producto (detalles)

  // Inyectamos el ProductService en el constructor
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Cuando el componente se inicializa, cargamos la lista de productos
    this.getProducts();
  }

  /**
   * Obtiene la lista completa de productos de la API.
   */
  getProducts(): void {
    this.loading = true; // Inicia el indicador de carga
    this.errorMessage = ''; // Limpia cualquier error previo
    this.singleProductView = null; // Asegura que no estemos en la vista de un solo producto
    this.productId = null; // Limpia el ID de búsqueda al cargar todos

    this.productService.getProducts().subscribe(
      (products: ProductViewModel[]) => {
        this.products = products;
        this.loading = false; // Finaliza el indicador de carga
        console.log('Productos cargados:', this.products);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Error al cargar los productos: ' + error.message;
        this.loading = false; // Finaliza el indicador de carga en caso de error
        console.error('Hubo un error al obtener los productos:', error);
      }
    );
  }

  /**
   * Busca un producto específico por su ID.
   */
  searchProduct(): void {
    if (this.productId !== null) {
      this.loading = true; // Inicia el indicador de carga
      this.errorMessage = ''; // Limpia errores
      this.singleProductView = null; // Restablece la vista de producto único antes de la búsqueda
      this.products = []; // Limpia la lista de productos para mostrar solo el buscado

      this.productService.getProduct(this.productId).subscribe(
        (product: ProductViewModel) => {
          this.singleProductView = product; // Asigna el producto encontrado para mostrar solo ese
          this.loading = false; // Finaliza el indicador de carga
          console.log('Producto encontrado:', product);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = `Error al obtener el producto con ID ${this.productId}: ` + error.message;
          this.loading = false; // Finaliza el indicador de carga en caso de error
          this.singleProductView = null; // Asegura que no se muestre ningún producto si hay error
          this.products = []; // Asegura que la lista esté vacía si no se encuentra
          console.error(`Error al obtener el producto con ID ${this.productId}:`, error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, introduce un ID de producto para buscar.';
      this.singleProductView = null; // Asegura que no se muestre ningún producto si el ID es nulo
      this.products = []; // Asegura que la lista esté vacía
    }
  }

  /**
   * Limpia la búsqueda y vuelve a cargar todos los productos.
   */
  clearSearch(): void {
    this.productId = null; // Limpia el ID de búsqueda
    this.singleProductView = null; // Oculta la vista de un solo producto
    this.getProducts(); // Vuelve a cargar todos los productos
  }

  /**
   * Muestra los detalles de un producto específico.
   * Este método se llama desde el botón "Ver" en la lista de productos.
   * @param id El ID del producto a ver.
   */
  getProductDetails(id: number): void { // Cambiado el tipo de 'id' a number
    this.loading = true; // Inicia carga
    this.errorMessage = ''; // Limpia errores
    this.products = []; // Limpia la lista para mostrar solo el detalle
    this.productId = id; // Opcional: para que el input de búsqueda muestre el ID del producto visto

    this.productService.getProduct(id).subscribe(
      (product: ProductViewModel) => {
        this.singleProductView = product; // Asigna el producto para mostrar sus detalles
        this.loading = false; // Finaliza carga
        console.log('Detalles del producto:', product);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error al obtener detalles del producto con ID ${id}: ` + error.message;
        this.loading = false; // Finaliza carga en caso de error
        this.singleProductView = null; // Asegura que no se muestre nada si hay error
        console.error(`Error al obtener el producto con ID ${id}:`, error);
      }
    );
  }

  /**
   * Crea un nuevo producto.
   * @param newProduct El objeto ProductViewModel a crear.
   */
  createProduct(newProduct: ProductViewModel): void {
    this.loading = true; // Inicia carga
    this.errorMessage = ''; // Limpia errores
    this.productService.createProduct(newProduct).subscribe(
      (createdProduct: ProductViewModel) => {
        console.log('Producto creado:', createdProduct);
        this.loading = false; // Finaliza carga
        this.getProducts(); // Recargar la lista después de crear
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Error al crear el producto: ' + error.message;
        this.loading = false; // Finaliza carga en caso de error
        console.error('Error al crear el producto:', error);
      }
    );
  }

  /**
   * Elimina un producto por su ID.
   * @param id El ID del producto a eliminar.
   */
  deleteProduct(id: number): void {
    this.loading = true; // Inicia carga
    this.errorMessage = ''; // Limpia errores
    this.productService.deleteProduct(id).subscribe(
      () => {
        console.log(`Producto con ID ${id} eliminado.`);
        this.loading = false; // Finaliza carga
        this.getProducts(); // Recargar la lista después de eliminar
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error al eliminar el producto con ID ${id}: ` + error.message;
        this.loading = false; // Finaliza carga en caso de error
        console.error(`Error al eliminar el producto con ID ${id}:`, error);
      }
    );
  }
}
