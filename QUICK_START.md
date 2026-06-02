# ⚡ Quick Start - Pathfinder (Pasos Rápidos)

## 1️⃣ Abre 3 terminales/PowerShell

---

## 2️⃣ Terminal 1 - MySQL (Preparar BD)

```powershell
# Entra a MySQL
mysql -u root -p

# Copia y pega esto en MySQL:
CREATE USER 'PathFinder'@'localhost' IDENTIFIED BY 'PathFinder';
CREATE DATABASE pathFinder;
GRANT ALL PRIVILEGES ON pathFinder.* TO 'PathFinder'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

✅ Resultado: Base de datos creada

---

## 3️⃣ Terminal 2 - Backend (Spring Boot)

```powershell
cd backend
mvn spring-boot:run
```

Espera a ver esto:
```
Started ProyectoApplication in X.XXX seconds
```

✅ Backend listo: **http://localhost:9093/api/usuarios/datos**

---

## 4️⃣ Terminal 3 - Frontend (React + Vite)

```powershell
cd frontend
npm install
npm run dev
```

Espera a ver esto:
```
➜  Local:   http://localhost:5173/
```

✅ Frontend listo: **http://localhost:5173**

---

## 5️⃣ Prueba en el Navegador

### Opción A: Frontend Completo
1. Ve a **http://localhost:5173**
2. Click en **"COMENZAR TEST"** (ir a cualquier página)
3. Prueba cada sección:
   - ✅ **Registro** - Crea usuario
   - ✅ **Foro** - Crea publicación
   - ✅ **Descubrir** - Ve titulaciones
   - ✅ **Calculadora** - Calcula nota

### Opción B: API Directamente
```
GET http://localhost:9093/api/titulaciones
GET http://localhost:9093/api/publicaciones
GET http://localhost:9093/api/usuarios/datos
```

---

## 🎯 Checklist de Funcionamiento

Si todo funciona correctamente:

- [ ] Backend se inicia sin errores
- [ ] Frontend se inicia sin errores
- [ ] Puedo ir a http://localhost:5173
- [ ] El formulario de Registro se carga
- [ ] Puedo crear un usuario nuevo
- [ ] Ver publicaciones funciona
- [ ] Ver titulaciones funciona
- [ ] Calculadora carga recomendaciones

---

## ❌ Si Algo Falla

| Error | Solución |
|-------|----------|
| "Port already in use" | Cierra la otra aplicación o cambia puerto |
| "Connection refused" | Verifica que backend esté en 9093 |
| "Access denied BD" | Revisa credenciales (PathFinder/PathFinder) |
| "Module not found" | Ejecuta `npm install` en frontend |
| "CORS error" | Backend CORS actualizado ✅ |

---

## 📊 URLs de Referencia

```
Backend:  http://localhost:9093
Frontend: http://localhost:5173
MySQLDB:  localhost:3306 (PathFinder/PathFinder)
```

---

**¿Listo? ¡A ejecutar! 🚀**
