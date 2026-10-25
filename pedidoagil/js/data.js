/* Datos ficticios de PedidoÁgil (no hay conexión a base de datos) */

const CLIENTES = [
  { id: 'C-001', nombre: 'Ferretería El Constructor', contacto: 'María López',   telefono: '8888-1201', email: 'compras@elconstructor.com',  ciudad: 'Managua' },
  { id: 'C-002', nombre: 'Constructora Horizonte',    contacto: 'Carlos Pérez',  telefono: '8777-3344', email: 'cperez@horizonte.com',       ciudad: 'León' },
  { id: 'C-003', nombre: 'Taller Mecánico Los Pinos', contacto: 'José Martínez', telefono: '8555-9021', email: 'lospinos@taller.com',        ciudad: 'Masaya' },
  { id: 'C-004', nombre: 'Casa & Hogar S.A.',         contacto: 'Ana Rodríguez', telefono: '8222-7788', email: 'ana@casayhogar.com',         ciudad: 'Granada' },
  { id: 'C-005', nombre: 'Inversiones Del Valle',     contacto: 'Luis Gómez',    telefono: '8444-5566', email: 'lgomez@delvalle.com',        ciudad: 'Managua' },
  { id: 'C-006', nombre: 'Distribuidora La Esquina',  contacto: 'Sofía Herrera', telefono: '8999-1010', email: 'sofia@laesquina.com',        ciudad: 'Estelí' }
];

const PRODUCTOS = [
  { codigo: 'P-001', nombre: 'Taladro inalámbrico 18V',   categoria: 'Herramientas', precio: 2500, stock: 8 },
  { codigo: 'P-002', nombre: 'Martillo de acero 16 oz',   categoria: 'Herramientas', precio: 350,  stock: 15 },
  { codigo: 'P-003', nombre: 'Juego de destornilladores', categoria: 'Herramientas', precio: 420,  stock: 22 },
  { codigo: 'P-004', nombre: 'Pintura blanca 1 galón',    categoria: 'Pinturas',     precio: 780,  stock: 30 },
  { codigo: 'P-005', nombre: 'Cemento gris 42 kg',        categoria: 'Construcción', precio: 310,  stock: 120 },
  { codigo: 'P-006', nombre: 'Cable eléctrico #12 (rollo)', categoria: 'Electricidad', precio: 1650, stock: 4 },
  { codigo: 'P-007', nombre: 'Casco de seguridad',        categoria: 'Seguridad',    precio: 290,  stock: 3 },
  { codigo: 'P-008', nombre: 'Guantes de trabajo',        categoria: 'Seguridad',    precio: 120,  stock: 50 }
];

/* Estados posibles de un pedido */
const ESTADOS = ['Pendiente', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'];

const PEDIDOS = [
  { id: 'PED-1001', clienteId: 'C-001', fecha: '2026-10-12', estado: 'Entregado',
    items: [ { codigo: 'P-001', cant: 2 }, { codigo: 'P-002', cant: 5 } ] },
  { id: 'PED-1002', clienteId: 'C-002', fecha: '2026-10-14', estado: 'Entregado',
    items: [ { codigo: 'P-005', cant: 40 }, { codigo: 'P-004', cant: 6 } ] },
  { id: 'PED-1003', clienteId: 'C-003', fecha: '2026-10-17', estado: 'Enviado',
    items: [ { codigo: 'P-003', cant: 4 }, { codigo: 'P-008', cant: 10 } ] },
  { id: 'PED-1004', clienteId: 'C-004', fecha: '2026-10-20', estado: 'En preparación',
    items: [ { codigo: 'P-004', cant: 10 }, { codigo: 'P-002', cant: 3 } ] },
  { id: 'PED-1005', clienteId: 'C-005', fecha: '2026-10-22', estado: 'Pendiente',
    items: [ { codigo: 'P-006', cant: 2 }, { codigo: 'P-007', cant: 2 } ] },
  { id: 'PED-1006', clienteId: 'C-006', fecha: '2026-10-23', estado: 'Pendiente',
    items: [ { codigo: 'P-001', cant: 1 }, { codigo: 'P-008', cant: 20 } ] },
  { id: 'PED-1007', clienteId: 'C-001', fecha: '2026-10-24', estado: 'Cancelado',
    items: [ { codigo: 'P-005', cant: 15 } ] }
];
