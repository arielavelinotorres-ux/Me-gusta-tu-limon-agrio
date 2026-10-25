# PedidoÁgil — Propuesta de proyecto
**Sistema de gestión de pedidos**
Examen práctico: Ciclo de vida de un proyecto informático

| Dato | Valor |
|---|---|
| Caso seleccionado | 6) Sistema de gestión de pedidos |
| Equipo | 6 integrantes |
| Producto final | Propuesta de proyecto + prototipo web en GitHub Pages |
| Ciclo de vida aplicado | Objetivo → Análisis → Planificación → Diseño → Ejecución → Seguimiento y control → Aceptación → Cierre → Mantenimiento |

---

## 1. Objetivo principal (5 min)

### 1.1 Nombre del proyecto
**PedidoÁgil — Sistema web de gestión de pedidos**

### 1.2 Problema que se pretende solucionar
La empresa cliente, una distribuidora de productos de ferretería, recibe los pedidos de sus clientes por llamadas telefónicas, WhatsApp y cuadernos físicos. Esto genera problemas concretos:

- **Pedidos perdidos o duplicados**, porque no existe un registro único y centralizado.
- **Desconocimiento del estado real de cada pedido**: nadie sabe con certeza si está pendiente, en preparación, enviado o entregado.
- **Inventario desactualizado**: se acepta vender productos que ya no están en bodega.
- **Cálculo manual de totales**, con errores de precios y cantidades.
- **Falta de reportes**: la gerencia no puede saber qué se vende más ni cuánto se vendió en el mes.
- **Atención lenta al cliente**, porque buscar un pedido anterior implica revisar papeles o chats.

### 1.3 Objetivo principal
Desarrollar un sistema web que permita **registrar, consultar, dar seguimiento y controlar los pedidos** de los clientes de la empresa en un solo lugar, reduciendo errores y tiempos de atención.

### 1.4 Objetivos específicos
1. Centralizar el registro de clientes, productos y pedidos en una única plataforma.
2. Calcular automáticamente el total de cada pedido y validar la disponibilidad de stock al momento de crearlo.
3. Permitir el seguimiento del estado del pedido (Pendiente, En preparación, Enviado, Entregado, Cancelado).
4. Ofrecer búsquedas y filtros para consultar pedidos, clientes y productos rápidamente.
5. Generar reportes básicos (pedidos por estado, productos más vendidos, ventas del periodo) para apoyar la toma de decisiones.
6. Publicar una primera versión demostrable (prototipo) accesible desde cualquier navegador.

### 1.5 Alcance inicial del proyecto

**Incluido en esta primera versión (prototipo):**
- Página de inicio con indicadores (KPIs).
- Módulo de Clientes (listar, buscar, registrar).
- Módulo de Productos (listar, buscar, registrar, alerta de stock bajo).
- Módulo de Pedidos (crear con varios productos, listar, filtrar por estado, ver detalle, cambiar estado).
- Módulo de Reportes (resumen visual).
- Datos ficticios, sin conexión a base de datos.

**Fuera del alcance de esta versión (versiones futuras):**
- Base de datos real y servidor (back-end).
- Autenticación de usuarios y roles reales.
- Pagos en línea.
- Facturación electrónica.
- Aplicación móvil.
- Integración con transportistas o WhatsApp.

> **Resultado:** Se construirá PedidoÁgil, un sistema web para registrar y dar seguimiento a los pedidos de una distribuidora, con el fin de eliminar el desorden del registro manual y tener control del inventario y de las ventas.

---

## 2. Análisis funcional y definición de objetivos (10 min)

### 2.1 Usuarios del sistema

| Usuario | Descripción | Qué hace en el sistema |
|---|---|---|
| **Administrador** | Gerente o dueño de la empresa | Consulta reportes, supervisa pedidos, gestiona productos y clientes |
| **Vendedor** | Personal de atención / ventas | Registra clientes y crea pedidos |
| **Bodeguero** | Encargado de preparar y despachar | Cambia el estado del pedido (En preparación, Enviado) y revisa stock |
| **Cliente** *(versión futura)* | Comprador final | Consultará el estado de sus pedidos |

### 2.2 Necesidades principales del cliente (la empresa)
- Saber **qué pedidos tiene, de quién son y en qué estado están**.
- **No vender lo que no hay** en inventario.
- **Reducir errores** en precios y totales.
- **Encontrar información rápido** (buscar un pedido o cliente en segundos).
- **Ver resultados de ventas** sin hacer cálculos a mano.

### 2.3 Requisitos funcionales (RF)

| ID | Requisito funcional | Prioridad |
|---|---|---|
| RF-01 | El sistema debe permitir **registrar clientes** (nombre, contacto, teléfono, correo, ciudad). | Alta |
| RF-02 | El sistema debe permitir **registrar productos** (código, nombre, categoría, precio, stock). | Alta |
| RF-03 | El sistema debe permitir **crear un pedido** seleccionando un cliente y agregando uno o varios productos con su cantidad. | Alta |
| RF-04 | El sistema debe **calcular automáticamente el total** del pedido a partir de precios y cantidades. | Alta |
| RF-05 | El sistema debe **validar el stock** y no permitir pedir más unidades de las disponibles. | Alta |
| RF-06 | El sistema debe permitir **consultar y filtrar pedidos por estado**. | Alta |
| RF-07 | El sistema debe permitir **cambiar el estado** de un pedido (Pendiente → En preparación → Enviado → Entregado / Cancelado). | Alta |
| RF-08 | El sistema debe permitir **buscar clientes y productos** por texto. | Media |
| RF-09 | El sistema debe **mostrar el detalle de un pedido** (cliente, fecha, productos, subtotales, total). | Media |
| RF-10 | El sistema debe **mostrar indicadores y reportes** (pedidos por estado, productos más vendidos, ventas totales). | Media |
| RF-11 | El sistema debe **alertar productos con stock bajo**. | Media |

### 2.4 Requisitos no funcionales (RNF)

| ID | Requisito no funcional | Categoría |
|---|---|---|
| RNF-01 | La interfaz debe ser **fácil de usar**: un usuario nuevo debe poder crear un pedido en menos de 3 minutos. | Usabilidad |
| RNF-02 | El sistema debe ser **responsivo**, visible en computadora, tableta y celular. | Compatibilidad |
| RNF-03 | Las pantallas deben **cargar en menos de 3 segundos** en una conexión estándar. | Rendimiento |
| RNF-04 | Debe funcionar en los **navegadores modernos** (Chrome, Edge, Firefox). | Compatibilidad |
| RNF-05 | Las contraseñas y datos sensibles deben **protegerse** (en la versión final: autenticación, cifrado y control de roles). | Seguridad |
| RNF-06 | El código debe estar **organizado y documentado**, para facilitar el mantenimiento. | Mantenibilidad |
| RNF-07 | El sistema debe estar **disponible el 99 %** del horario laboral (versión final). | Disponibilidad |
| RNF-08 | La interfaz debe tener **contraste y tamaños de letra legibles** (accesibilidad básica). | Accesibilidad |

> **Resultado:** Primera propuesta funcional con 11 requisitos funcionales y 8 no funcionales, que cubren el registro, control y consulta de pedidos.

---

## 3. Planificación (5 min)

### 3.1 Asignación de responsabilidades

| Integrante | Rol | Responsabilidad | Entregable |
|---|---|---|---|
| 1 | Líder / coordinación | Organiza al equipo, controla el tiempo, presenta el proyecto | Cronograma y presentación |
| 2 | Análisis funcional | Define problema, usuarios y objetivos | Secciones 1 y 2 de la propuesta |
| 3 | Requisitos | Redacta y valida los requisitos funcionales y no funcionales | Tabla RF / RNF |
| 4 | Diseño UI | Diseña pantallas, colores y navegación | Estilos (CSS) y maquetas |
| 5 | Desarrollo | Programa módulos y datos ficticios | HTML + JavaScript |
| 6 | GitHub / integración | Crea el repositorio, integra el trabajo y publica en GitHub Pages | Repositorio y URL pública |

> Todos los integrantes participan en las pruebas y en la presentación final.

### 3.2 Calendario de trabajo

**Calendario del examen (55 minutos):**

| Fase | Duración | Responsables principales |
|---|---|---|
| Objetivo principal | 5 min | 1, 2 |
| Análisis funcional | 10 min | 2, 3 |
| Planificación | 5 min | 1 |
| Diseño detallado | 10 min | 4, 5 |
| Ejecución / prototipo | 15 min | 4, 5, 6 |
| Seguimiento y pruebas | 5 min | 3, 6 |
| Aceptación | 3 min | 1, 3 |
| Cierre / GitHub Pages | 2 min | 6 |
| **Total** | **55 min** | |

**Calendario del proyecto real (referencia):**

| Semana | Fase | Actividad |
|---|---|---|
| 1 | Análisis | Reuniones con el cliente, levantamiento de requisitos |
| 2 | Diseño | Arquitectura, modelo de datos, maquetas de pantallas |
| 3–5 | Desarrollo | Módulos de clientes, productos y pedidos |
| 6 | Pruebas | Pruebas funcionales y corrección de errores |
| 7 | Publicación | Despliegue, capacitación y entrega |

### 3.3 Herramientas de organización
Git y GitHub (control de versiones), un grupo de mensajería para comunicación y una lista de tareas por integrante.

---

## 4. Diseño detallado (10 min)

### 4.1 Arquitectura propuesta

**Prototipo (esta entrega):** arquitectura de **front-end estático**, con la lógica en el navegador y los datos ficticios en un archivo JavaScript.

**Sistema final (propuesta):** arquitectura **cliente–servidor en 3 capas**.

```
┌──────────────────────┐     HTTPS / API REST     ┌──────────────────────┐     SQL     ┌──────────────────┐
│  CAPA DE PRESENTACIÓN│ ───────────────────────► │  CAPA DE NEGOCIO     │ ──────────► │  CAPA DE DATOS   │
│  Navegador (HTML,    │ ◄─────────────────────── │  API (lógica de      │ ◄────────── │  Base de datos   │
│  CSS, JavaScript)    │        JSON              │  pedidos, stock,     │             │  relacional      │
│                      │                          │  autenticación)      │             │                  │
└──────────────────────┘                          └──────────────────────┘             └──────────────────┘
```

### 4.2 Tecnologías

| Capa | Prototipo (examen) | Sistema final (propuesta) |
|---|---|---|
| Presentación | HTML5, CSS3, JavaScript | HTML5, CSS3, JavaScript (o React) |
| Lógica | JavaScript en el navegador | API REST (ASP.NET Core o Node.js) |
| Datos | Datos ficticios en archivo JS | Base de datos relacional (SQL Server o PostgreSQL) |
| Control de versiones | Git + GitHub | Git + GitHub |
| Publicación | GitHub Pages | Servidor en la nube |

### 4.3 Módulos del sistema

| Módulo | Función | Requisitos que cubre |
|---|---|---|
| **Inicio** | Indicadores y accesos rápidos | RF-10, RF-11 |
| **Clientes** | Registro, listado y búsqueda de clientes | RF-01, RF-08 |
| **Productos** | Catálogo, stock y alertas | RF-02, RF-08, RF-11 |
| **Pedidos** | Crear, listar, filtrar, ver detalle y cambiar estado | RF-03 a RF-07, RF-09 |
| **Reportes** | Pedidos por estado, productos más vendidos, ventas | RF-10 |

### 4.4 Modelo de datos (resumen)

```
CLIENTE (id, nombre, contacto, teléfono, correo, ciudad)
PRODUCTO (código, nombre, categoría, precio, stock)
PEDIDO (id, id_cliente, fecha, estado)
DETALLE_PEDIDO (id_pedido, código_producto, cantidad)

CLIENTE 1 ──── N PEDIDO 1 ──── N DETALLE_PEDIDO N ──── 1 PRODUCTO
```

### 4.5 Navegación

```
                 ┌─────────────────────── MENÚ PRINCIPAL ───────────────────────┐
                 │  [Inicio]  [Clientes]  [Productos]  [Pedidos]  [Reportes]    │
                 └──────────────────────────────────────────────────────────────┘
                      │           │            │           │            │
                   Indicadores  Listado     Listado     Listado      Resumen
                   y accesos    + formulario + formulario + filtros    gráfico
                                                          │
                                              ┌───────────┴───────────┐
                                         [Nuevo pedido]        [Detalle del pedido]
                                          (formulario)         (cambiar estado)
```

### 4.6 Diseño de las principales pantallas

**Pantalla de Inicio**
```
┌──────────────────────────────────────────────────────────┐
│ PedidoÁgil   [Inicio] [Clientes] [Productos] [Pedidos]...│
├──────────────────────────────────────────────────────────┤
│ [Pedidos totales] [Pendientes] [Ventas] [Stock bajo]     │
│                                                          │
│ Últimos pedidos                      Accesos rápidos     │
│ ID | Cliente | Fecha | Estado | Total    [+ Nuevo pedido]│
└──────────────────────────────────────────────────────────┘
```

**Pantalla de Pedidos**
```
┌──────────────────────────────────────────────────────────┐
│ Pedidos                      Estado: [Todos ▼] [+ Nuevo] │
├──────────────────────────────────────────────────────────┤
│ ID       | Cliente          | Fecha      | Estado | Total │
│ PED-1001 | Ferretería ...   | 2026-10-20 | Enviado| C$... │
└──────────────────────────────────────────────────────────┘
```

**Pantalla de Nuevo pedido**
```
┌──────────────────────────────────────────────────────────┐
│ Cliente: [Seleccionar ▼]        Fecha: [____]            │
│ Producto: [Seleccionar ▼]  Cantidad: [__]  [Agregar]     │
│ ─────────────────────────────────────────────────        │
│ Producto | Cant. | Precio | Subtotal | [Quitar]           │
│                                      TOTAL: C$ ______    │
│                              [Cancelar] [Guardar pedido] │
└──────────────────────────────────────────────────────────┘
```

---

## 5. Ejecución — Prototipo (15 min)

El prototipo se encuentra en este repositorio y cumple el mínimo solicitado:

| Requisito mínimo del examen | Cómo se cumple en el prototipo |
|---|---|
| Página de inicio | Sección **Inicio** con indicadores y últimos pedidos |
| Menú | Barra de navegación superior fija |
| Al menos 3 módulos | **Clientes, Productos, Pedidos y Reportes** (4 módulos) |
| Datos ficticios | Archivo `js/data.js` con clientes, productos y pedidos de ejemplo |
| Formularios o tablas representativas | Tablas en cada módulo y formularios de cliente, producto y nuevo pedido |
| Navegación básica | Navegación por hash (`#clientes`, `#pedidos`, ...) sin recargar la página |

**Estructura del repositorio**
```
pedidoagil/
├── index.html        → Estructura base y menú
├── css/styles.css    → Estilos y diseño responsivo
├── js/data.js        → Datos ficticios
├── js/app.js         → Navegación, vistas y lógica
├── PROPUESTA.md      → Este documento
└── README.md         → Guía de uso y publicación
```

---

## 6. Seguimiento y control (5 min)

Se verifica el avance real contra lo planificado y se prueba el prototipo.

### 6.1 Control de avance

| Etapa | Planificado | Estado | Observación |
|---|---|---|---|
| Objetivo principal | 5 min | ✅ Completado | |
| Análisis funcional | 10 min | ✅ Completado | 11 RF y 8 RNF definidos |
| Planificación | 5 min | ✅ Completado | Roles y calendario asignados |
| Diseño detallado | 10 min | ✅ Completado | Arquitectura, módulos y pantallas |
| Ejecución | 15 min | ✅ Completado | Prototipo con 4 módulos |
| Seguimiento y pruebas | 5 min | ✅ En curso | Ver tabla de pruebas |

### 6.2 Pruebas del prototipo

| N.º | Prueba | Resultado esperado | Resultado |
|---|---|---|---|
| P-01 | Abrir la página de inicio | Se muestran indicadores y últimos pedidos | ✅ |
| P-02 | Navegar entre todos los módulos del menú | Cada módulo carga sin recargar la página | ✅ |
| P-03 | Registrar un cliente nuevo | El cliente aparece en la tabla | ✅ |
| P-04 | Registrar un producto nuevo | El producto aparece en la tabla | ✅ |
| P-05 | Buscar un cliente o producto por texto | La tabla se filtra | ✅ |
| P-06 | Crear un pedido con 2 productos | Se calcula el total y el pedido aparece en la lista | ✅ |
| P-07 | Pedir más unidades que el stock | Se muestra un mensaje de error y no se agrega | ✅ |
| P-08 | Filtrar pedidos por estado | Solo se muestran los del estado elegido | ✅ |
| P-09 | Cambiar el estado de un pedido | El estado se actualiza en detalle y en la lista | ✅ |
| P-10 | Abrir el sistema en un celular | El diseño se adapta a la pantalla | ✅ |

### 6.3 Errores detectados y correcciones
- Se validó que la cantidad sea un número entero mayor que cero.
- Se evita guardar un pedido sin cliente o sin productos.

---

## 7. Aceptación (3 min)

**¿El prototipo demuestra la solución planteada?**
**Sí.** El prototipo demuestra de forma visual y funcional que el sistema permite registrar clientes y productos, crear pedidos con cálculo automático de totales, validar el stock y dar seguimiento al estado de cada pedido, que era el problema central del cliente.

### Requisitos que se demuestran con el prototipo

| N.º | Requisito | Cómo se demuestra | ¿Cumple? |
|---|---|---|---|
| 1 | **RF-03** Crear pedido con varios productos | Menú Pedidos → Nuevo pedido → agregar productos | ✅ |
| 2 | **RF-04** Cálculo automático del total | El total cambia al agregar o quitar productos | ✅ |
| 3 | **RF-05** Validación de stock | Pedir una cantidad mayor al stock muestra un error | ✅ |
| 4 | **RF-07** Cambio de estado del pedido | Detalle del pedido → cambiar estado | ✅ |
| 5 | **RF-06** Filtro de pedidos por estado | Lista de Pedidos → selector de estado | ✅ |
| 6 | **RF-01** Registro de clientes | Módulo Clientes → formulario | ✅ |
| 7 | **RNF-02** Diseño responsivo | Reducir el ancho del navegador o abrir en celular | ✅ |

**Conclusión:** el prototipo cumple los requisitos seleccionados y es aceptado como primera versión demostrable.

---

## 8. Cierre (2 min)

### Lista de verificación
- [ ] El proyecto está subido a GitHub.
- [ ] El repositorio está actualizado (último commit con todos los archivos).
- [ ] GitHub Pages está activado (Settings → Pages → rama `main`, carpeta `/ (root)`).
- [ ] La URL pública abre el prototipo correctamente.
- [ ] Se presenta la URL.

### URL a presentar
```
https://<usuario-github>.github.io/<nombre-repositorio>/
```
*(Se reemplaza con el usuario y el repositorio reales del equipo; los pasos detallados están en el README.)*

---

## 9. Mantenimiento (etapa posterior a la entrega)

| Tipo | Descripción | Ejemplo en PedidoÁgil |
|---|---|---|
| **Correctivo** | Corregir errores detectados después de la entrega | Un total mal calculado con descuentos |
| **Adaptativo** | Ajustar el sistema a cambios del entorno | Nuevos navegadores, cambio de moneda o de impuestos |
| **Perfectivo** | Mejorar o agregar funcionalidad | Reportes avanzados, exportar a PDF o Excel |
| **Preventivo** | Evitar fallos futuros | Respaldos periódicos, revisión de código, actualización de librerías |

**Evolución propuesta (próximas versiones):**
1. Conectar con una base de datos real y crear la API.
2. Agregar inicio de sesión y roles (Administrador, Vendedor, Bodeguero).
3. Portal para que el cliente consulte sus pedidos.
4. Notificaciones por correo o WhatsApp al cambiar el estado.
5. Exportación de reportes y factura en PDF.

**Gestión del mantenimiento:** los cambios se registran como *issues* en GitHub, se trabajan en ramas y se publican con nuevas versiones del repositorio.
