# Guía de Ejecución Local - Pathfinder

## 🔧 Requisitos Previos

✅ Java 17 instalado (`java -version`)
✅ Maven instalado (`mvn -v`)
✅ Node.js 18+ instalado (`node -v`)
✅ MySQL Server ejecutándose

---

## 📊 Paso 1: Configurar Base de Datos

### 1.1 Crear usuario y BD en MySQL

```sql
-- Abre MySQL:
mysql -u root -p

-- Crea el usuario pathfinder
CREATE USER 'PathFinder'@'localhost' IDENTIFIED BY 'PathFinder';

-- Crea la base de datos
CREATE DATABASE pathFinder;

-- Otorga permisos
GRANT ALL PRIVILEGES ON pathFinder.* TO 'PathFinder'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 1.2 Importar datos (opcional - si tienes pathfinder.sql)

```bash
mysql -u PathFinder -p pathFinder < "ruta/a/pathfinder.sql"
# Contraseña: PathFinder
```

> Si prefieres, Hibernate creará las tablas automáticamente con `spring.jpa.hibernate.ddl-auto=update`

---

## 🚀 Paso 2: Ejecutar el Backend

### Opción A: Usando Terminal Windows
```bash
cd backend
mvn spring-boot:run
```

### Opción B: Usando Maven Wrapper
```bash
cd backend
./mvnw spring-boot:run
```

**Esperado:**
```
...
Started ProyectoApplication in X seconds
INFO 1234 --- [main] c.p.p.ProyectoApplication: Started application
```

✅ Backend listo en: **http://localhost:9093**

---

## 💻 Paso 3: Ejecutar el Frontend

### En otra terminal/PowerShell:

```bash
cd frontend

# Primera vez - instalar dependencias
npm install

# Iniciar dev server
npm run dev
```

**Esperado:**
```
  VITE v4.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Frontend listo en: **http://localhost:5173**

---

## ✅ Paso 4: Pruebas Rápidas

### 4.1 Verificar Backend

Abre en el navegador:
```
http://localhost:9093/api/titulaciones
```

Deberías ver un JSON con las titulaciones (array, puede estar vacío).

### 4.2 Verificar Conexión Frontend-Backend

Ve a **http://localhost:5173** y:

1. **Página Home** - Debería cargar sin errores
2. **Ir a Registro** - Intenta crear una cuenta:
   - Nombre: Clara
   - Apellidos: García
   - Email: clara@test.com
   - Fecha: 01/01/2005
   - Contraseña: 123456
   - Aceptar términos
   - Click "Crear Cuenta"

3. **Ir a Descubrir** - Debería cargar las titulaciones desde BD

4. **Ir a Calculadora** - Ingresa notas y calcula

5. **Ir a Foro** - Debería cargar publicaciones (estará vacío inicialmente)

---

## 🐛 Solución de Problemas

### ❌ Error: "Connection refused" en Frontend
**Solución:** Verifica que el backend esté ejecutándose en puerto 9093
```bash
# Windows - Ver puertos en uso
netstat -ano | findstr :9093
```

### ❌ Error: "Access denied for user 'PathFinder'"
**Solución:** Revisa credenciales en `application.properties`:
```properties
spring.datasource.username=PathFinder
spring.datasource.password=PathFinder
```

### ❌ Error: "Port 5173 already in use"
```bash
# Usa otro puerto
npm run dev -- --port 3000
```

### ❌ Error: "Module not found" en Frontend
```bash
cd frontend
npm install
npm run dev
```

### ❌ Error: "ClassNotFoundException" en Backend
```bash
# Limpiar y reconstruir
cd backend
mvn clean install
mvn spring-boot:run
```

---

## 📝 Estructura de URLs en Local

| Servicio | URL | Tipo |
|----------|-----|------|
| **Backend API** | `http://localhost:9093/api` | REST |
| **Frontend App** | `http://localhost:5173` | React Vite |
| **MySQL BD** | `localhost:3306` | Database |

---

## 📊 Tabla de Endpoints para Pruebas

### Usuarios
```
GET    http://localhost:9093/api/usuarios/datos
GET    http://localhost:9093/api/usuarios/correo/clara@test.com
POST   http://localhost:9093/api/usuarios
PUT    http://localhost:9093/api/usuarios/1
```

### Publicaciones
```
GET    http://localhost:9093/api/publicaciones
GET    http://localhost:9093/api/publicaciones/1/respuestas
POST   http://localhost:9093/api/publicaciones
DELETE http://localhost:9093/api/publicaciones/1
```

### Titulaciones
```
GET    http://localhost:9093/api/titulaciones
GET    http://localhost:9093/api/titulaciones/recomendadas?nota=10.5
GET    http://localhost:9093/api/titulaciones/rama/1
GET    http://localhost:9093/api/titulaciones/por-rama?nombre=Ciencias
```

---

## 🧪 Prueba con Postman/Insomnia (Opcional)

Si quieres probar APIs directamente:

1. Descarga [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/)

2. Crea una nueva petición POST:
   - **URL:** `http://localhost:9093/api/usuarios`
   - **Method:** POST
   - **Body (JSON):**
   ```json
   {
     "nombre": "Prueba",
     "apellidos": "Test",
     "email": "prueba@test.com",
     "password": "123456",
     "fechaNac": "2005-01-01"
   }
   ```

3. Click Send → Deberías ver el usuario creado

---

## ✅ Checklist de Ejecución

- [ ] MySQL Server en ejecución
- [ ] BD `pathFinder` creada
- [ ] Usuario `PathFinder` configurado
- [ ] Terminal 1: Backend ejecutándose en 9093
- [ ] Terminal 2: Frontend ejecutándose en 5173
- [ ] Página Home carga sin errores
- [ ] Puedes crear un usuario desde Registro
- [ ] Página Descubrir muestra titulaciones
- [ ] Foro funciona (crea publicación)
- [ ] Calculadora carga titulaciones recomendadas

---

## 💡 Tips

1. **Logs en Backend:** Verifica `application.properties` - `spring.jpa.show-sql=true` mostrará queries SQL

2. **Compilación rápida:** Maven descargará dependencias la primera vez (puede tardar 2-3 minutos)

3. **Hot Reload:** Los cambios en frontend recargan automáticamente. Backend requiere reiniciar

4. **Limpiar caché:** 
   ```bash
   # Frontend
   rm -r node_modules/
   npm install
   
   # Backend
   mvn clean install
   ```

5. **Ver errores detallados:** Abre la consola del navegador (F12) en el frontend

---

¿Necesitas ayuda con algo específico de la ejecución?
