
import { Routes } from '@angular/router';
// ¡CORRECCIÓN AQUÍ! Asegúrate de que el nombre del archivo incluya '.component'
import { ProductListComponent } from './product-list.component/product-list.component';

export const routes: Routes = [
  // 1. Ruta para la lista de productos
  {
    path: 'products',
    component: ProductListComponent
  },
  // 2. Ruta por defecto: redirige a '/products' si la URL está vacía
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full' // Asegura que la URL completa coincida para la redirección
  },
  // 3. Ruta comodín para manejar URL no encontradas (404)
  {
    path: '**',
    redirectTo: '/products' // O a un componente 404 si lo creas
  }
];
