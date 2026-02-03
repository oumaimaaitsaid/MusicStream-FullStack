# 🎵 MusicStream - FullStack Audio Streaming System

**MusicStream** is a comprehensive Full-Stack application designed for managing and streaming audio tracks. Built with a modern micro-services-ready architecture using **Spring Boot** and **Angular**, the entire ecosystem is orchestrated using **Docker**.

---

## 🚀 Technical Stack

### **Backend (The Engine)**
* **Java 17** with **Spring Boot 3**.
* **Spring Data JPA**: For robust Database ORM mapping.
* **PostgreSQL**: Reliable relational database for metadata storage.
* **JUnit 5 & Mockito**: Comprehensive Unit Testing for business logic.

### **Frontend (The Interface)**
* **Angular 17+**: Reactive and modular user interface.
* **NgRx**: Redux-based state management for a seamless user experience.
* **Tailwind CSS**: Modern, utility-first styling for responsiveness.
* **Jasmine & Karma**: Unit testing for services and components.

### **Infrastructure (The Environment)**
* **Docker & Docker Compose**: Containerization for "run anywhere" capability.

---

## 🛠️ Getting Started (Setup)

Ensure you have **Docker Desktop** installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/MusicStream-FullStack.git](https://github.com/your-username/MusicStream-FullStack.git)
   cd MusicStream-FullStack
   
2. **Launch the entire stack:**
   ```bash
   docker-compose up --build -d
  

## 🧪 Testing Suite
Quality assurance is integrated into the development workflow:

1. **Backend Validation (JUnit/Mockito)**
    Testing focuses on the Service Layer to ensure track processing and database persistence are flawless.
## ✨ Fonctionnalités
- **Run Tests:** : 
  ```bash
  cd backend && ./mvnw test
- **Status:** : 
  ```bash 
  BUILD SUCCESS (Verified Track saving and retrieval logic).

1. **Frontend Validation (Jasmine/Karma)**

   Testing ensures that the Angular services communicate correctly with the REST API.

   **Run Tests**: cd frontEnd && npm test -- --watch=false

   **Status:**: TOTAL: 2 SUCCESS (Verified API communication and data loading).

## 📂 Project Structure
 ```bash
    MusicStream-FullStack/
  ├── backend/            # Spring Boot Application
  │   ├── src/main/       # Java source code
  │   └── src/test/       # JUnit Test cases
  ├── frontEnd/           # Angular Application
  │   ├── src/app/        # Components, Services, and NgRx Store
  │   └── src/test.ts     # Karma configuration
  ├── docker-compose.yml  # Multi-container orchestration
  └── README.md           # Documentation
  
  ```
## 💾 Data Persistence & Environment
**Port**: 5433 (External) / 5432 (Internal)

**Credentials**: postgres / admin

**Volume Persistence**: A Docker volume postgres_data is used to ensure your uploaded tracks and data remain safe even after containers are stopped or removed.

**Hibernate Strategy**: update mode is enabled to preserve existing data while allowing schema synchronization.

## 👨‍💻 Author
Developed with passion as a Full-Stack development showcase.

