# ProductCatalogAppSii

This is a .NET Core MVC application for a product catalog, demonstrating backend and frontend development, consuming external APIs, calculating taxes, and displaying information to the user.

## Features

* **Backend:**
    * ASP.NET Core MVC with C#
    * REST API Consumption: `https://api.escuelajs.co/api/v1/products`
    * Business Logic Layer for tax calculation (19% of the price)
    * Web API Controller to expose product data
    * Dependency Injection (DI) for a clean architecture
* **Frontend:**
    * HTML, CSS (Bootstrap 5)
    * JavaScript (jQuery for AJAX calls)
    * User interface to search products by ID or view all products
    * Dynamic display of product lists and details, including calculated tax.
    * Responsive design using Bootstrap.
* **Testing:**
    * Unit tests for the Business Logic Layer using xUnit and Moq.

## Design Principles and Code Practices

During the development of this application, I have applied various design principles and good coding practices to ensure a robust, maintainable, and scalable structure:

* **Layered Architecture (N-tier):** I have separated the application into distinct layers (Presentation, Business Logic, and Data Access). This allows me to improve modularity, facilitate code maintainability, and prepare the application for future scalability.
* **Dependency Injection (DI):** I have utilized ASP.NET Core's built-in Dependency Injection container. This enables me to inject dependencies (such as `IProductApiClient` into `ProductService`), which significantly simplifies unit testing and helps reduce coupling between components.
* **Single Responsibility Principle (SRP):** I have ensured that each class and method has only one reason to change. For example, `ProductApiClient` is solely responsible for external API calls, while `ProductService` focuses exclusively on business logic, such as tax calculation.
* **Open/Closed Principle (OCP):** Classes are designed to be open for extension but closed for modification. This means I can, for instance, add new `IProductApiClient` implementations without needing to modify existing code in `ProductService`.
* **Dependency Inversion Principle (DIP):** I have aimed for high-level modules (like the Business Logic Layer - BLL) not to depend directly on low-level implementations (like the Data Access Layer - DAL), but rather on abstractions (interfaces). This is effectively achieved through dependency injection.
* **Encapsulation:** The internal details of classes are encapsulated, and only exposed through well-defined interfaces, thereby controlling access and interaction with objects.
* **Object-Oriented Programming (OOP):** I have applied the fundamentals of OOP, using classes, objects, interfaces, and abstractions to model the solution in a structured manner.
* **Async/Await:** I have made extensive use of the `async` and `await` keywords for I/O operations, such as external API calls. This ensures that the application remains responsive and improves its scalability by not blocking the main thread.
* **Basic Error Handling:** I have included basic error handling, such as `response.EnsureSuccessStatusCode()` in the API client and result handling in the frontend JavaScript. In a production environment, this aspect would need to be strengthened with a more robust and centralized error handling strategy.
* **Separation of Concerns (SoC):** I have maintained a clear separation between HTML, CSS, and JavaScript, organizing them into their respective directories. Furthermore, the frontend logic is clearly differentiated from the backend logic, contributing to a more organized and manageable codebase.

## Prerequisites

* .NET SDK 8.0 (or higher)
* Visual Studio 2022 (or higher)
* Node.js and npm (recommended latest LTS version)

## Setup and Run

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/ProductCatalogApp.git](https://github.com/YourUsername/ProductCatalogApp.git) # Replace YourUsername with your actual GitHub username
    cd ProductCatalogApp
    ```

3.  **Run the Frontend (Angular Application):**
    * **Navigate to the Angular project directory:**
        ```bash
        cd ProductCatalogApp.AngularApp
        ```
    * **Install Node.js dependencies:**
        ```bash
        npm install
        ```
    * **Serve the Angular application:**
        ```bash
        ng serve --open
        ```
        This will compile the Angular application and open it in your default web browser, typically at `http://localhost:4200/`.

## Running Unit Tests

1.  **Run Backend Unit Tests (xUnit):**
    * **Open Test Explorer in Visual Studio:** In Visual Studio, go to "Test" -> "Test Explorer".
    * **Run Tests:** Click "Run All Tests" in the Test Explorer window. You should see the unit tests for the `ProductService` passing.
    * **Alternatively, from the terminal (in the solution root):**
        ```bash
        dotnet test
        ```

2.  **Run Frontend Unit Tests (Karma/Jasmine):**
    * **Navigate to the Angular project directory:**
        ```bash
        cd ProductCatalogApp.AngularApp
        ```
    * **Run tests:**
        ```bash
        ng test
        ```
        This will open a browser window and run your Angular unit tests.




---

![Screenshot 2025-07-02 140913](https://github.com/user-attachments/assets/5da76721-c0d2-4175-a82d-8123efd97de5)
![Screenshot 2025-07-09 152844](https://github.com/user-attachments/assets/f449eecd-dc6a-4fa5-a131-ee6acd025592)
![Screenshot 2025-07-09 152854](https://github.com/user-attachments/assets/4776638e-072f-4a88-9b1a-b3a571a2d8c0)
![image](https://github.com/user-attachments/assets/b684c643-2133-4e3e-9e11-9ed6608184a0)
![image](https://github.com/user-attachments/assets/c33e8e66-860e-4dc0-b8b2-36bded149137)


