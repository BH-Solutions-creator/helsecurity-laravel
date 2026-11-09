(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const waLink = (texto) =>
    `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(texto)}`;

  /* ---------- Datos de contacto ---------- */
  $$("[data-whatsapp]").forEach((a) => {
    a.href = waLink(a.dataset.whatsapp);
    a.target = "_blank";
    a.rel = "noopener";
    if (a.dataset.texto) a.textContent = CONTACTO[a.dataset.texto];
  });
  $$("[data-email]").forEach((a) => {
    a.href = `mailto:${CONTACTO.email}`;
    a.textContent = CONTACTO.email;
  });
  $$("[data-instagram]").forEach((a) => {
    a.href = `https://www.instagram.com/${CONTACTO.instagram}/`;
    a.textContent = `@${CONTACTO.instagram}`;
  });
  // Si todavía no hay mail cargado, se ocultan el link y el botón "Enviar por mail"
  if (!CONTACTO.email) $$("[data-solo-email]").forEach((el) => el.remove());
  $("#anio").textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  const toggle = $(".nav-toggle");
  const nav = $("#nav");
  const cerrarMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const abierto = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(abierto));
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", cerrarMenu));

  /* ---------- ¿Qué necesitás proteger? ---------- */
  $$("[data-perfil]").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$("[data-perfil]").forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
      $$("[data-panel]").forEach((p) => (p.hidden = p.dataset.panel !== btn.dataset.perfil));
    })
  );

  /* ---------- Catálogo ---------- */
  const filtro = { categoria: "Todos", perfil: null };
  const NOMBRE_PERFIL = { vivienda: "Para el hogar", empresa: "Para empresas" };

  function renderFiltros() {
    const cont = $("#filtros");
    const cats = ["Todos", ...CATEGORIAS];
    cont.innerHTML =
      cats
        .map(
          (c) =>
            `<button class="chip" aria-pressed="${filtro.categoria === c}" data-cat="${c}">${c}</button>`
        )
        .join("") +
      (filtro.perfil
        ? `<button class="chip chip--perfil" data-quitar-perfil aria-label="Quitar filtro ${NOMBRE_PERFIL[filtro.perfil]}">${NOMBRE_PERFIL[filtro.perfil]} ✕</button>`
        : "");
  }

  function renderProductos() {
    const lista = PRODUCTOS.filter(
      (p) =>
        (filtro.categoria === "Todos" || p.categoria === filtro.categoria) &&
        (!filtro.perfil || p.para.includes(filtro.perfil))
    );
    $("#lista-productos").innerHTML = lista.length
      ? lista
          .map((p) => {
            const enCarrito = carrito[p.id];
            return `
        <article class="producto">
          <div class="producto__img"><img src="img/${p.imagen}" alt="${p.nombre}" loading="lazy"></div>
          <div class="producto__body">
            <p class="producto__cat">${p.categoria}</p>
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <button class="btn btn--small ${enCarrito ? "btn--added" : "btn--outline"}" data-agregar="${p.id}">
              ${enCarrito ? `✓ En tu presupuesto (${enCarrito})` : "+ Agregar al presupuesto"}
            </button>
          </div>
        </article>`;
          })
          .join("")
      : `<p class="productos__vacio">No hay productos con ese filtro.</p>`;
  }

  $("#filtros").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.hasAttribute("data-quitar-perfil")) filtro.perfil = null;
    else filtro.categoria = b.dataset.cat;
    renderFiltros();
    renderProductos();
  });

  $$("[data-filtrar-perfil]").forEach((a) =>
    a.addEventListener("click", () => {
      filtro.perfil = a.dataset.filtrarPerfil;
      filtro.categoria = "Todos";
      renderFiltros();
      renderProductos();
    })
  );

  /* ---------- Presupuesto (carrito) ---------- */
  const CLAVE = "hel-presupuesto";
  let carrito = {};
  try {
    carrito = JSON.parse(localStorage.getItem(CLAVE)) || {};
  } catch (_) {}
  // descartar productos que ya no existen en el catálogo
  for (const id of Object.keys(carrito)) {
    if (!PRODUCTOS.some((p) => p.id === id)) delete carrito[id];
  }

  const guardar = () => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(carrito));
    } catch (_) {}
  };

  function renderCarrito() {
    const ul = $("#carrito-lista");
    const ids = Object.keys(carrito);
    ul.innerHTML = ids
      .map((id) => {
        const p = PRODUCTOS.find((x) => x.id === id);
        return `
        <li>
          <span class="carrito__nombre">${p.nombre}</span>
          <span class="qty">
            <button type="button" data-menos="${id}" aria-label="Quitar uno de ${p.nombre}">−</button>
            <span aria-live="polite">${carrito[id]}</span>
            <button type="button" data-mas="${id}" aria-label="Agregar uno de ${p.nombre}">+</button>
          </span>
        </li>`;
      })
      .join("");
    $("#carrito-vacio").hidden = ids.length > 0;

    const total = ids.reduce((n, id) => n + carrito[id], 0);
    $$("[data-contador]").forEach((b) => {
      b.textContent = total;
      b.hidden = total === 0;
    });
  }

  function cambiar(id, delta) {
    carrito[id] = (carrito[id] || 0) + delta;
    if (carrito[id] <= 0) delete carrito[id];
    guardar();
    renderCarrito();
    renderProductos();
  }

  let toastTimer;
  function aviso(texto) {
    const t = $("#toast");
    t.innerHTML = `${texto} <a href="#presupuesto">Ver presupuesto</a>`;
    t.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-visible"), 3500);
  }

  $("#lista-productos").addEventListener("click", (e) => {
    const b = e.target.closest("[data-agregar]");
    if (!b) return;
    const p = PRODUCTOS.find((x) => x.id === b.dataset.agregar);
    cambiar(p.id, 1);
    aviso(`Agregaste <strong>${p.nombre}</strong>.`);
  });

  $("#carrito-lista").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.mas) cambiar(b.dataset.mas, 1);
    if (b.dataset.menos) cambiar(b.dataset.menos, -1);
  });

  /* ---------- Envío del formulario ---------- */
  const form = $("#form-presupuesto");
  let via = "whatsapp";
  $$("button[type=submit]", form).forEach((b) =>
    b.addEventListener("click", () => (via = b.dataset.via))
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const error = $("#form-error");

    const faltan = [];
    if (!d.nombre.trim()) faltan.push("tu nombre");
    if (!d.telefono.trim()) faltan.push("un teléfono");
    if (faltan.length) {
      error.textContent = `Por favor completá ${faltan.join(" y ")}.`;
      error.hidden = false;
      form.querySelector(d.nombre.trim() ? "[name=telefono]" : "[name=nombre]").focus();
      return;
    }
    error.hidden = true;

    const items = Object.keys(carrito).map((id) => {
      const p = PRODUCTOS.find((x) => x.id === id);
      return `• ${carrito[id]} x ${p.nombre}`;
    });

    const lineas = [
      "Hola HEL Security, quiero pedir un presupuesto.",
      "",
      `Nombre: ${d.nombre.trim()}`,
      `Teléfono: ${d.telefono.trim()}`,
    ];
    if (d.localidad.trim()) lineas.push(`Localidad: ${d.localidad.trim()}`);
    lineas.push(`Es para: ${d.tipo}`);
    if (items.length) lineas.push("", "Equipos que me interesan:", ...items);
    if (d.mensaje.trim()) lineas.push("", `Mensaje: ${d.mensaje.trim()}`);

    const texto = lineas.join("\n");

    if (via === "email") {
      const asunto = `Pedido de presupuesto - ${d.nombre.trim()}`;
      window.location.href = `mailto:${CONTACTO.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(texto)}`;
    } else {
      window.open(waLink(texto), "_blank", "noopener");
    }
  });

  /* ---------- Inicio ---------- */
  renderFiltros();
  renderCarrito();
  renderProductos();
})();
