# ✅ Resumen de Cambios - Proyecto Pathfinder Listo para Pruebas

## 🔧 Cambios Realizados

### 1. **Corrección de Configuración**
   - ✅ API Client actualizado: puerto 9093 (antes decía 8080)
   - ✅ Ubicación: `frontend/src/app/services/apiClient.ts`

### 2. **CORS Actualizado**
   - ✅ Backend ahora acepta 2 orígenes:
     - `http://localhost:5173` (Vite - Puerto actual)
     - `http://localhost:3000` (React - Si lo cambias)
   - ✅ Archivos actualizados:
     - `UsuarioControlador.java`
     - `PublicacionControlador.java`
     - `TitulacionControlador.java`

### 3. **Configuración CORS Global** (NEW)
   - ✅ Archivo creado: `backend/src/main/java/.../config/CorsConfig.java`
   - ✅ Gestiona CORS centralizadamente

### 4. **Documentación Completa** (NEW)
   - ✅ `QUICK_START.md` - Pasos rápidos en 5 minutos
   - ✅ `GUIA_EJECUCION_LOCAL.md` - Guía detallada con solución de problemas
   - ✅ Estas actualizaciones

---

## 🚀 PARA EMPEZAR AHORA

### 1. Abre 3 terminales (PowerShell/CMD)

### Terminal 1: Configurar BD MySQL
```powershell
mysql -u root -p

# Copiar y pegar:
CREATE USER 'PathFinder'@'localhost' IDENTIFIED BY 'PathFinder';
CREATE DATABASE pathFinder;
GRANT ALL PRIVILEGES ON pathFinder.* TO 'PathFinder'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Terminal 2: Ejecutar Backend
```powershell
cd backend
mvn spring-boot:run
# Espera: "Started ProyectoApplication"
# URL: http://localhost:9093/api
```

### Terminal 3: Ejecutar Frontend
```powershell
cd frontend
npm install
npm run dev
# Espera: "Local: http://localhost:5173"
# URL: http://localhost:5173
```

### ✅ Prueba en el navegador:
1. Ve a **http://localhost:5173**
2. Prueba cada página:
   - **Registro** - Crea un usuario
   - **Foro** - Ve/crea publicaciones
   - **Descubrir** - Ve titulaciones
   - **Calculadora** - Calcula nota PAU

---

## 📊 Configuración de BD

```
Host:     localhost
Puerto:   3306
BD:       pathFinder
Usuario:  PathFinder
Pass:     PathFinder
```

---

## 🔍 URLs de Prueba (Backend)

Si quieres probar directamente los endpoints:

```
http://localhost:9093/api/titulaciones
http://localhost:9093/api/publicaciones
http://localhost:9093/api/usuarios/datos
```

---

## 📁 Archivos Importantes

| Archivo | Descripción | Ubicación |
|---------|-------------|-----------|
| **apiClient.ts** | Servicio API (actualizado puerto) | `frontend/src/app/services/` |
| **CorsConfig.java** | Config CORS global (NEW) | `backend/.../config/` |
| **application.properties** | Config BD MySQL | `backend/src/main/resources/` |
| **QUICK_START.md** | Guía rápida (NEW) | Raíz proyecto |
| **GUIA_EJECUCION_LOCAL.md** | Guía detallada (NEW) | Raíz proyecto |

---

## ⚡ Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| "Port already in use 9093" | Cambia puerto en `application.properties` |
| "Access denied BD" | Verifica usuario/contraseña: PathFinder/PathFinder |
| "CORS error" | Backend ya está actualizado ✅ |
| "Connection refused" | Backend no está corriendo, ejecuta Terminal 2 |
| "Module not found" | Ejecuta `npm install` en Terminal 3 |

---

## ✅ Checklist Final

- [ ] BD MySQL creada (pathFinder)
- [ ] Backend ejecutándose en 9093
- [ ] Frontend ejecutándose en 5173
- [ ] Página Home carga sin errores
- [ ] Puedo crear usuario desde Registro
- [ ] Puedo ver publicaciones en Foro
- [ ] Puedo ver titulaciones en Descubrir
- [ ] Calculadora muestra recomendaciones

---

## 📞 ¿Necesitas Ayuda?

1. Lee `QUICK_START.md` para pasos rápidos
2. Consulta `GUIA_EJECUCION_LOCAL.md` para solución de problemas
3. Verifica que los 3 servicios estén corriendo (MySQL, Backend, Frontend)

**¡Listo para probar! 🎉**
