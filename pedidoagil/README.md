# PedidoÁgil — Sistema de gestión de pedidos

Prototipo web (HTML + CSS + JavaScript) del examen práctico **Ciclo de vida de un proyecto informático**.
No usa base de datos: los datos son ficticios (`js/data.js`) y los cambios se pierden al recargar la página.

La propuesta completa (objetivo, análisis, planificación, diseño, seguimiento, aceptación, cierre y mantenimiento) está en [`PROPUESTA.md`](PROPUESTA.md).

## Módulos
- **Inicio**: indicadores y últimos pedidos.
- **Clientes**: listado, búsqueda y registro.
- **Productos**: inventario, búsqueda, registro y alerta de stock bajo.
- **Pedidos**: crear pedido con varios productos, filtrar, ver detalle y cambiar estado.
- **Reportes**: pedidos por estado, productos más vendidos y ventas por cliente.

## Cómo probarlo en local
Abra `index.html` con doble clic en el navegador. No requiere instalar nada.

## Cómo publicarlo en GitHub Pages
1. Cree un repositorio **público** en GitHub (por ejemplo, `pedidoagil`).
2. Suba **todo el contenido de esta carpeta** a la raíz del repositorio (`index.html`, `css/`, `js/`, `PROPUESTA.md`, `README.md`).
   - Desde la web: *Add file → Upload files*, arrastre los archivos y carpetas y pulse *Commit changes*.
   - O con Git:
     ```bash
     git init
     git add .
     git commit -m "Prototipo PedidoÁgil"
     git branch -M main
     git remote add origin https://github.com/<usuario>/pedidoagil.git
     git push -u origin main
     ```
3. En el repositorio vaya a **Settings → Pages**.
4. En *Build and deployment*, elija **Deploy from a branch**, rama **main** y carpeta **/ (root)**, y pulse **Save**.
5. Espere 1 o 2 minutos. La URL aparecerá en esa misma pantalla:
   `https://<usuario>.github.io/pedidoagil/`
6. Abra la URL y verifique que el prototipo carga correctamente.

## Estructura
```
index.html
css/styles.css
js/data.js
js/app.js
PROPUESTA.md
README.md
```
