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
1. Sube los cambios a la rama `main` de este repositorio.
2. En GitHub, abre **Settings → Pages** y configura *Build and deployment* como **GitHub Actions**.
3. En **Actions**, espera a que termine correctamente el workflow **Deploy static content to Pages**.
4. Comparte esta dirección:
   `https://arielavelinotorres-ux.github.io/Me-gusta-tu-limon-agrio/`

## Estructura
```
index.html
css/styles.css
js/data.js
js/app.js
PROPUESTA.md
README.md
```
