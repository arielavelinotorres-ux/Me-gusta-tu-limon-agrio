/* ===== PedidoÁgil — lógica del prototipo =====
   Navegación por hash, vistas y operaciones en memoria.
   No hay base de datos: al recargar la página, los datos vuelven a los iniciales. */

/* ---------- Estado de la aplicación (copia de los datos ficticios) ---------- */
const state = {
  clientes: JSON.parse(JSON.stringify(CLIENTES)),
  productos: JSON.parse(JSON.stringify(PRODUCTOS)),
  pedidos: JSON.parse(JSON.stringify(PEDIDOS))
};

/* Borrador del pedido que se está creando */
let borrador = { items: [] };

const STOCK_BAJO = 5;

/* ---------- Utilidades ---------- */
const app = document.getElementById('app');

const money = n =>
  'C$ ' + Number(n).toLocaleString('es-NI', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const esc = s =>
  String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const getCliente = id => state.clientes.find(c => c.id === id);
const getProducto = cod => state.productos.find(p => p.codigo === cod);

const totalItems = items =>
  items.reduce((suma, it) => suma + getProducto(it.codigo).precio * it.cant, 0);

const badge = estado =>
  `<span class="badge badge--${esc(estado.replace(/ /g, '-'))}">${esc(estado)}</span>`;

const hoy = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function siguienteId(lista, prefijo, inicio, pad) {
  const nums = lista.map(x => parseInt(String(x.id || x.codigo).split('-')[1], 10)).filter(n => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : inicio - 1;
  return `${prefijo}-${String(max + 1).padStart(pad, '0')}`;
}

let toastTimer;
function toast(mensaje, tipo = 'ok') {
  const t = document.getElementById('toast');
  t.textContent = mensaje;
  t.className = `toast show ${tipo}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast'; }, 2800);
}

/* Pedidos que no están cancelados cuentan como venta */
const ventasValidas = () => state.pedidos.filter(p => p.estado !== 'Cancelado');

/* ---------- Vista: Inicio ---------- */
function vInicio() {
  const pendientes = state.pedidos.filter(p => p.estado === 'Pendiente').length;
  const enCurso = state.pedidos.filter(p => ['En preparación', 'Enviado'].includes(p.estado)).length;
  const ventas = ventasValidas().reduce((s, p) => s + totalItems(p.items), 0);
  const bajos = state.productos.filter(p => p.stock <= STOCK_BAJO);

  const ultimos = [...state.pedidos].reverse().slice(0, 5);

  app.innerHTML = `
    <div class="page-head">
      <div>
        <h1>Panel de control</h1>
        <p>Resumen general de pedidos, ventas e inventario.</p>
      </div>
      <a class="btn" href="#nuevo-pedido">+ Nuevo pedido</a>
    </div>

    <section class="grid grid--kpi" aria-label="Indicadores">
      <div class="kpi"><div class="kpi__label">Pedidos registrados</div><div class="kpi__value">${state.pedidos.length}</div></div>
      <div class="kpi kpi--warn"><div class="kpi__label">Pendientes</div><div class="kpi__value">${pendientes}</div></div>
      <div class="kpi kpi--ok"><div class="kpi__label">Ventas (sin cancelados)</div><div class="kpi__value">${money(ventas)}</div></div>
      <div class="kpi kpi--danger"><div class="kpi__label">Productos con stock bajo</div><div class="kpi__value">${bajos.length}</div></div>
    </section>

    <div class="grid grid--2">
      <section class="card">
        <h2>Últimos pedidos</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th class="num">Total</th></tr></thead>
            <tbody>
              ${ultimos.map(p => `
                <tr>
                  <td><a href="#pedido/${esc(p.id)}">${esc(p.id)}</a></td>
                  <td>${esc(getCliente(p.clienteId).nombre)}</td>
                  <td>${esc(p.fecha)}</td>
                  <td>${badge(p.estado)}</td>
                  <td class="num">${money(totalItems(p.items))}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <aside>
        <section class="card">
          <h2>Accesos rápidos</h2>
          <ul class="lista-rapida">
            <li><a class="btn" href="#nuevo-pedido">Crear pedido</a></li>
            <li><a class="btn btn--sec" href="#clientes">Registrar cliente</a></li>
            <li><a class="btn btn--sec" href="#productos">Ver inventario</a></li>
            <li><a class="btn btn--sec" href="#reportes">Ver reportes</a></li>
          </ul>
        </section>
        <section class="card">
          <h2>Alertas de stock</h2>
          ${bajos.length
            ? `<ul>${bajos.map(p => `<li>${esc(p.nombre)} — <strong>${p.stock}</strong> u.</li>`).join('')}</ul>`
            : '<p>No hay productos con stock bajo.</p>'}
          <p style="color:var(--suave);font-size:.85rem;margin:8px 0 0">Pedidos en curso: ${enCurso}</p>
        </section>
      </aside>
    </div>`;
}

/* ---------- Vista: Clientes ---------- */
function vClientes() {
  app.innerHTML = `
    <div class="page-head">
      <div><h1>Clientes</h1><p>Registro y consulta de clientes.</p></div>
    </div>

    <section class="card">
      <h2>Registrar nuevo cliente</h2>
      <form id="formCliente" novalidate>
        <div class="row">
          <div><label for="cNombre">Nombre de la empresa *</label><input id="cNombre" required maxlength="60"></div>
          <div><label for="cContacto">Persona de contacto *</label><input id="cContacto" required maxlength="60"></div>
          <div><label for="cTelefono">Teléfono *</label><input id="cTelefono" required maxlength="20" inputmode="tel"></div>
        </div>
        <div class="row">
          <div><label for="cEmail">Correo electrónico</label><input id="cEmail" type="email" maxlength="80"></div>
          <div><label for="cCiudad">Ciudad *</label><input id="cCiudad" required maxlength="40"></div>
        </div>
        <div class="acciones"><button class="btn" type="submit">Guardar cliente</button></div>
      </form>
    </section>

    <section class="card">
      <h2>Listado de clientes</h2>
      <div class="toolbar">
        <div><label for="buscarCliente">Buscar</label><input id="buscarCliente" type="search" placeholder="Nombre, contacto o ciudad..."></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Cliente</th><th>Contacto</th><th>Teléfono</th><th>Correo</th><th>Ciudad</th><th class="num">Pedidos</th></tr></thead>
          <tbody id="tbodyClientes"></tbody>
        </table>
      </div>
    </section>`;

  const pintar = () => {
    const q = document.getElementById('buscarCliente').value.trim().toLowerCase();
    const lista = state.clientes.filter(c =>
      [c.nombre, c.contacto, c.ciudad].join(' ').toLowerCase().includes(q));
    document.getElementById('tbodyClientes').innerHTML = lista.length
      ? lista.map(c => `
        <tr>
          <td>${esc(c.id)}</td><td>${esc(c.nombre)}</td><td>${esc(c.contacto)}</td>
          <td>${esc(c.telefono)}</td><td>${esc(c.email || '—')}</td><td>${esc(c.ciudad)}</td>
          <td class="num">${state.pedidos.filter(p => p.clienteId === c.id).length}</td>
        </tr>`).join('')
      : '<tr><td colspan="7" class="vacio">No se encontraron clientes.</td></tr>';
  };
  pintar();
  document.getElementById('buscarCliente').addEventListener('input', pintar);

  document.getElementById('formCliente').addEventListener('submit', e => {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    if (!v('cNombre') || !v('cContacto') || !v('cTelefono') || !v('cCiudad')) {
      return toast('Complete los campos obligatorios (*).', 'error');
    }
    state.clientes.push({
      id: siguienteId(state.clientes, 'C', 1, 3),
      nombre: v('cNombre'), contacto: v('cContacto'), telefono: v('cTelefono'),
      email: v('cEmail'), ciudad: v('cCiudad')
    });
    e.target.reset();
    pintar();
    toast('Cliente registrado correctamente.');
  });
}

/* ---------- Vista: Productos ---------- */
function vProductos() {
  app.innerHTML = `
    <div class="page-head">
      <div><h1>Productos</h1><p>Catálogo e inventario disponible.</p></div>
    </div>

    <section class="card">
      <h2>Registrar nuevo producto</h2>
      <form id="formProducto" novalidate>
        <div class="row">
          <div><label for="pNombre">Nombre del producto *</label><input id="pNombre" required maxlength="60"></div>
          <div><label for="pCategoria">Categoría *</label><input id="pCategoria" required maxlength="30" list="listaCategorias"></div>
          <div><label for="pPrecio">Precio (C$) *</label><input id="pPrecio" type="number" min="0.01" step="0.01" required></div>
          <div><label for="pStock">Stock inicial *</label><input id="pStock" type="number" min="0" step="1" required></div>
        </div>
        <datalist id="listaCategorias">
          ${[...new Set(state.productos.map(p => p.categoria))].map(c => `<option value="${esc(c)}">`).join('')}
        </datalist>
        <div class="acciones"><button class="btn" type="submit">Guardar producto</button></div>
      </form>
    </section>

    <section class="card">
      <h2>Inventario</h2>
      <div class="toolbar">
        <div><label for="buscarProducto">Buscar</label><input id="buscarProducto" type="search" placeholder="Código, nombre o categoría..."></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Código</th><th>Producto</th><th>Categoría</th><th class="num">Precio</th><th class="num">Stock</th><th>Estado</th></tr></thead>
          <tbody id="tbodyProductos"></tbody>
        </table>
      </div>
    </section>`;

  const pintar = () => {
    const q = document.getElementById('buscarProducto').value.trim().toLowerCase();
    const lista = state.productos.filter(p =>
      [p.codigo, p.nombre, p.categoria].join(' ').toLowerCase().includes(q));
    document.getElementById('tbodyProductos').innerHTML = lista.length
      ? lista.map(p => `
        <tr>
          <td>${esc(p.codigo)}</td><td>${esc(p.nombre)}</td><td>${esc(p.categoria)}</td>
          <td class="num">${money(p.precio)}</td><td class="num">${p.stock}</td>
          <td>${p.stock <= STOCK_BAJO
            ? '<span class="badge badge--bajo">Stock bajo</span>'
            : '<span class="badge badge--ok">Disponible</span>'}</td>
        </tr>`).join('')
      : '<tr><td colspan="6" class="vacio">No se encontraron productos.</td></tr>';
  };
  pintar();
  document.getElementById('buscarProducto').addEventListener('input', pintar);

  document.getElementById('formProducto').addEventListener('submit', e => {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    const precio = parseFloat(v('pPrecio'));
    const stock = parseInt(v('pStock'), 10);
    if (!v('pNombre') || !v('pCategoria')) return toast('Complete los campos obligatorios (*).', 'error');
    if (isNaN(precio) || precio <= 0) return toast('Ingrese un precio válido mayor que cero.', 'error');
    if (isNaN(stock) || stock < 0) return toast('Ingrese un stock válido (0 o más).', 'error');
    state.productos.push({
      codigo: siguienteId(state.productos.map(p => ({ id: p.codigo })), 'P', 1, 3),
      nombre: v('pNombre'), categoria: v('pCategoria'), precio, stock
    });
    e.target.reset();
    pintar();
    toast('Producto registrado correctamente.');
  });
}

/* ---------- Vista: Pedidos (listado + filtro) ---------- */
function vPedidos() {
  app.innerHTML = `
    <div class="page-head">
      <div><h1>Pedidos</h1><p>Consulte y dé seguimiento a los pedidos.</p></div>
      <a class="btn" href="#nuevo-pedido">+ Nuevo pedido</a>
    </div>

    <section class="card">
      <div class="toolbar">
        <div>
          <label for="filtroEstado">Filtrar por estado</label>
          <select id="filtroEstado">
            <option value="">Todos</option>
            ${ESTADOS.map(e => `<option>${e}</option>`).join('')}
          </select>
        </div>
        <div><label for="buscarPedido">Buscar por ID o cliente</label><input id="buscarPedido" type="search" placeholder="PED-1001 o nombre..."></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Cliente</th><th>Fecha</th><th class="num">Artículos</th><th>Estado</th><th class="num">Total</th><th></th></tr></thead>
          <tbody id="tbodyPedidos"></tbody>
        </table>
      </div>
    </section>`;

  const pintar = () => {
    const est = document.getElementById('filtroEstado').value;
    const q = document.getElementById('buscarPedido').value.trim().toLowerCase();
    const lista = [...state.pedidos].reverse().filter(p =>
      (!est || p.estado === est) &&
      (p.id + ' ' + getCliente(p.clienteId).nombre).toLowerCase().includes(q));
    document.getElementById('tbodyPedidos').innerHTML = lista.length
      ? lista.map(p => `
        <tr>
          <td><strong>${esc(p.id)}</strong></td>
          <td>${esc(getCliente(p.clienteId).nombre)}</td>
          <td>${esc(p.fecha)}</td>
          <td class="num">${p.items.reduce((s, i) => s + i.cant, 0)}</td>
          <td>${badge(p.estado)}</td>
          <td class="num">${money(totalItems(p.items))}</td>
          <td><a class="btn btn--sec" href="#pedido/${esc(p.id)}">Ver detalle</a></td>
        </tr>`).join('')
      : '<tr><td colspan="7" class="vacio">No hay pedidos con ese criterio.</td></tr>';
  };
  pintar();
  document.getElementById('filtroEstado').addEventListener('change', pintar);
  document.getElementById('buscarPedido').addEventListener('input', pintar);
}

/* ---------- Vista: Detalle de pedido ---------- */
function vDetalle(id) {
  const p = state.pedidos.find(x => x.id === id);
  if (!p) {
    app.innerHTML = `<section class="card"><h2>Pedido no encontrado</h2><a class="btn" href="#pedidos">Volver a pedidos</a></section>`;
    return;
  }
  const c = getCliente(p.clienteId);

  app.innerHTML = `
    <div class="page-head">
      <div><h1>Pedido ${esc(p.id)}</h1><p>Detalle y seguimiento del estado.</p></div>
      <a class="btn btn--sec" href="#pedidos">← Volver</a>
    </div>

    <section class="card">
      <dl class="detalle-grid">
        <div><dt>Cliente</dt><dd>${esc(c.nombre)}</dd></div>
        <div><dt>Contacto</dt><dd>${esc(c.contacto)} · ${esc(c.telefono)}</dd></div>
        <div><dt>Ciudad</dt><dd>${esc(c.ciudad)}</dd></div>
        <div><dt>Fecha</dt><dd>${esc(p.fecha)}</dd></div>
        <div><dt>Estado actual</dt><dd id="estadoActual">${badge(p.estado)}</dd></div>
      </dl>

      <div class="table-wrap">
        <table>
          <thead><tr><th>Código</th><th>Producto</th><th class="num">Cant.</th><th class="num">Precio</th><th class="num">Subtotal</th></tr></thead>
          <tbody>
            ${p.items.map(it => {
              const pr = getProducto(it.codigo);
              return `<tr><td>${esc(pr.codigo)}</td><td>${esc(pr.nombre)}</td><td class="num">${it.cant}</td>
                      <td class="num">${money(pr.precio)}</td><td class="num">${money(pr.precio * it.cant)}</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div class="total-box">Total: ${money(totalItems(p.items))}</div>
    </section>

    <section class="card">
      <h2>Actualizar estado</h2>
      <div class="toolbar">
        <div>
          <label for="nuevoEstado">Nuevo estado</label>
          <select id="nuevoEstado">${ESTADOS.map(e => `<option ${e === p.estado ? 'selected' : ''}>${e}</option>`).join('')}</select>
        </div>
        <div><button class="btn" id="btnEstado" type="button">Guardar estado</button></div>
      </div>
    </section>`;

  document.getElementById('btnEstado').addEventListener('click', () => {
    const nuevo = document.getElementById('nuevoEstado').value;
    if (nuevo === p.estado) return toast('El pedido ya tiene ese estado.', 'error');

    /* Si se cancela un pedido, el stock vuelve al inventario; si se reactiva, se descuenta de nuevo */
    if (nuevo === 'Cancelado') {
      p.items.forEach(it => { getProducto(it.codigo).stock += it.cant; });
    } else if (p.estado === 'Cancelado') {
      const falta = p.items.find(it => getProducto(it.codigo).stock < it.cant);
      if (falta) return toast(`No hay stock suficiente de ${getProducto(falta.codigo).nombre} para reactivar el pedido.`, 'error');
      p.items.forEach(it => { getProducto(it.codigo).stock -= it.cant; });
    }
    p.estado = nuevo;
    document.getElementById('estadoActual').innerHTML = badge(nuevo);
    toast(`Estado actualizado a "${nuevo}".`);
  });
}

/* ---------- Vista: Nuevo pedido ---------- */
function vNuevo() {
  borrador = { items: [] };

  app.innerHTML = `
    <div class="page-head">
      <div><h1>Nuevo pedido</h1><p>Seleccione el cliente y agregue los productos.</p></div>
      <a class="btn btn--sec" href="#pedidos">← Volver</a>
    </div>

    <form id="formPedido" novalidate>
      <section class="card">
        <h2>1. Datos del pedido</h2>
        <div class="row">
          <div>
            <label for="nCliente">Cliente *</label>
            <select id="nCliente" required>
              <option value="">Seleccione un cliente...</option>
              ${state.clientes.map(c => `<option value="${esc(c.id)}">${esc(c.nombre)} — ${esc(c.ciudad)}</option>`).join('')}
            </select>
          </div>
          <div><label for="nFecha">Fecha *</label><input id="nFecha" type="date" value="${hoy()}" required></div>
        </div>
      </section>

      <section class="card">
        <h2>2. Productos</h2>
        <div class="row">
          <div>
            <label for="nProducto">Producto</label>
            <select id="nProducto">
              <option value="">Seleccione un producto...</option>
              ${state.productos.map(p => `<option value="${esc(p.codigo)}">${esc(p.nombre)} — ${money(p.precio)} (stock: ${p.stock})</option>`).join('')}
            </select>
          </div>
          <div><label for="nCantidad">Cantidad</label><input id="nCantidad" type="number" min="1" step="1" value="1"></div>
          <div style="display:flex;align-items:end"><button class="btn btn--sec" id="btnAgregar" type="button">+ Agregar al pedido</button></div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>Producto</th><th class="num">Cant.</th><th class="num">Precio</th><th class="num">Subtotal</th><th></th></tr></thead>
            <tbody id="tbodyBorrador"></tbody>
          </table>
        </div>
        <div class="total-box" id="totalBorrador">Total: ${money(0)}</div>

        <div class="acciones">
          <a class="btn btn--sec" href="#pedidos">Cancelar</a>
          <button class="btn" type="submit">Guardar pedido</button>
        </div>
      </section>
    </form>`;

  const pintar = () => {
    document.getElementById('tbodyBorrador').innerHTML = borrador.items.length
      ? borrador.items.map((it, i) => {
          const pr = getProducto(it.codigo);
          return `<tr>
            <td>${esc(pr.nombre)}</td><td class="num">${it.cant}</td>
            <td class="num">${money(pr.precio)}</td><td class="num">${money(pr.precio * it.cant)}</td>
            <td><button class="btn btn--danger" type="button" data-quitar="${i}">Quitar</button></td>
          </tr>`;
        }).join('')
      : '<tr><td colspan="5" class="vacio">Aún no se han agregado productos.</td></tr>';
    document.getElementById('totalBorrador').textContent = 'Total: ' + money(totalItems(borrador.items));
  };
  pintar();

  document.getElementById('btnAgregar').addEventListener('click', () => {
    const cod = document.getElementById('nProducto').value;
    const cant = parseInt(document.getElementById('nCantidad').value, 10);
    if (!cod) return toast('Seleccione un producto.', 'error');
    if (isNaN(cant) || cant < 1) return toast('La cantidad debe ser un número entero mayor que cero.', 'error');

    const pr = getProducto(cod);
    const existente = borrador.items.find(it => it.codigo === cod);
    const yaPedido = existente ? existente.cant : 0;

    if (yaPedido + cant > pr.stock) {
      return toast(`Stock insuficiente de "${pr.nombre}". Disponible: ${pr.stock}.`, 'error');
    }
    if (existente) existente.cant += cant;
    else borrador.items.push({ codigo: cod, cant });

    document.getElementById('nCantidad').value = 1;
    pintar();
  });

  document.getElementById('tbodyBorrador').addEventListener('click', e => {
    const btn = e.target.closest('[data-quitar]');
    if (!btn) return;
    borrador.items.splice(parseInt(btn.dataset.quitar, 10), 1);
    pintar();
  });

  document.getElementById('formPedido').addEventListener('submit', e => {
    e.preventDefault();
    const clienteId = document.getElementById('nCliente').value;
    const fecha = document.getElementById('nFecha').value;
    if (!clienteId) return toast('Seleccione un cliente.', 'error');
    if (!fecha) return toast('Indique la fecha del pedido.', 'error');
    if (!borrador.items.length) return toast('Agregue al menos un producto.', 'error');

    const id = siguienteId(state.pedidos, 'PED', 1001, 4);
    borrador.items.forEach(it => { getProducto(it.codigo).stock -= it.cant; });
    state.pedidos.push({ id, clienteId, fecha, estado: 'Pendiente', items: borrador.items.map(i => ({ ...i })) });
    borrador = { items: [] };
    toast(`Pedido ${id} guardado correctamente.`);
    location.hash = `#pedido/${id}`;
  });
}

/* ---------- Vista: Reportes ---------- */
function vReportes() {
  const porEstado = ESTADOS.map(e => ({ nombre: e, valor: state.pedidos.filter(p => p.estado === e).length }));
  const maxEstado = Math.max(1, ...porEstado.map(x => x.valor));

  const vendidos = {};
  ventasValidas().forEach(p => p.items.forEach(it => {
    vendidos[it.codigo] = (vendidos[it.codigo] || 0) + it.cant;
  }));
  const top = Object.entries(vendidos)
    .map(([cod, cant]) => ({ nombre: getProducto(cod).nombre, valor: cant }))
    .sort((a, b) => b.valor - a.valor).slice(0, 5);
  const maxTop = Math.max(1, ...top.map(x => x.valor));

  const porCliente = state.clientes.map(c => ({
    nombre: c.nombre,
    pedidos: ventasValidas().filter(p => p.clienteId === c.id).length,
    total: ventasValidas().filter(p => p.clienteId === c.id).reduce((s, p) => s + totalItems(p.items), 0)
  })).filter(x => x.pedidos > 0).sort((a, b) => b.total - a.total);

  const barras = (lista, max) => lista.map(x => `
    <div class="bar-row">
      <span>${esc(x.nombre)}</span>
      <div class="bar" role="img" aria-label="${esc(x.nombre)}: ${x.valor}"><span style="width:${(x.valor / max) * 100}%"></span></div>
      <strong>${x.valor}</strong>
    </div>`).join('');

  app.innerHTML = `
    <div class="page-head">
      <div><h1>Reportes</h1><p>Resumen visual para apoyar decisiones.</p></div>
    </div>

    <div class="grid grid--2" style="grid-template-columns:1fr 1fr">
      <section class="card"><h2>Pedidos por estado</h2>${barras(porEstado, maxEstado)}</section>
      <section class="card"><h2>Productos más vendidos (unidades)</h2>${top.length ? barras(top, maxTop) : '<p>Sin datos.</p>'}</section>
    </div>

    <section class="card">
      <h2>Ventas por cliente (sin pedidos cancelados)</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Cliente</th><th class="num">Pedidos</th><th class="num">Total comprado</th></tr></thead>
          <tbody>
            ${porCliente.map(x => `<tr><td>${esc(x.nombre)}</td><td class="num">${x.pedidos}</td><td class="num">${money(x.total)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

/* ---------- Router por hash ---------- */
function router() {
  const [ruta, param] = (location.hash.slice(1) || 'inicio').split('/');
  const vistas = {
    'inicio': vInicio, 'clientes': vClientes, 'productos': vProductos,
    'pedidos': vPedidos, 'nuevo-pedido': vNuevo, 'reportes': vReportes
  };

  if (ruta === 'pedido') vDetalle(param);
  else (vistas[ruta] || vInicio)();

  const activa = ['pedido', 'nuevo-pedido'].includes(ruta) ? 'pedidos' : (vistas[ruta] ? ruta : 'inicio');
  document.querySelectorAll('.nav a').forEach(a => {
    const esActiva = a.dataset.ruta === activa;
    a.classList.toggle('activo', esActiva);
    if (esActiva) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });

  document.getElementById('nav').classList.remove('abierto');
  document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
}

document.getElementById('menuToggle').addEventListener('click', () => {
  const abierto = document.getElementById('nav').classList.toggle('abierto');
  document.getElementById('menuToggle').setAttribute('aria-expanded', String(abierto));
});

window.addEventListener('hashchange', router);
router();
