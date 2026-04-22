# 🚀 Hot Reload Development Server

Este proyecto incluye servidores de desarrollo con hot reload para facilitar el desarrollo.

## 📋 Opciones disponibles

### 1. Servidor Básico (Recomendado)
```bash
./hot-reload.sh
```
- Servidor HTTP simple en puerto 8000
- Sin caché para desarrollo
- Requiere recarga manual del navegador

### 2. Servidor Avanzado con LiveReload
```bash
./hot-reload-advanced.sh
```
- Servidor HTTP + LiveReload
- Recarga automática del navegador
- Requiere extensión LiveReload en el navegador

### 3. Servidor Node.js Básico
```bash
node server.js
```
- Servidor HTTP personalizado
- Sin caché para desarrollo
- Requiere recarga manual del navegador

### 4. Servidor Node.js Avanzado
```bash
node server-advanced.js
```
- Servidor HTTP con SSE (Server-Sent Events)
- Recarga automática del navegador
- No requiere extensiones adicionales

## 🔧 Requisitos

### Para scripts bash:
- Python 2.7+ o Python 3.x
- Para servidor avanzado: `pip3 install livereload`

### Para servidores Node.js:
- Node.js 12+ instalado

## 📝 Uso

1. Elige el servidor que prefieras
2. Ejecuta el comando correspondiente
3. Abre `http://localhost:8000` en tu navegador
4. Haz cambios en los archivos HTML, CSS o JS
5. Los cambios se reflejarán inmediatamente

## 🎯 Características

- ✅ Sin caché para desarrollo
- ✅ Detección automática de cambios
- ✅ Soporte para todos los tipos de archivos
- ✅ Optimizado para desarrollo rápido
- ✅ Compatible con todos los navegadores modernos

## 🛠️ Solución de problemas

### Puerto 8000 en uso
Cambia el puerto en el archivo del servidor:
```javascript
const PORT = 3000; // o cualquier otro puerto disponible
```

### Permisos denegados
Asegúrate de que los scripts tengan permisos de ejecución:
```bash
chmod +x hot-reload.sh hot-reload-advanced.sh
```

### LiveReload no funciona
1. Instala la extensión LiveReload en tu navegador
2. Asegúrate de que el icono de LiveReload esté activo
3. Verifica que el servidor esté corriendo en el puerto correcto

## 📚 Notas de desarrollo

- Los servidores están optimizados para desarrollo, no para producción
- Para producción, usa un servidor web como Nginx o Apache
- Los cambios de configuración requieren reiniciar el servidor
- Los archivos se sirven desde el directorio actual