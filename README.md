# HEL Security — sitio web

Sitio oficial de HEL Security (seguridad electrónica). Es un sitio estático: HTML, CSS y JavaScript, sin servidor ni base de datos. Se puede alojar gratis en GitHub Pages, Netlify o Cloudflare Pages.

## Qué tiene

- Servicios: alarmas, cámaras/CCTV, monitoreo, control de acceso, perímetro y niebla disuasiva.
- Catálogo de productos con filtros por categoría y por tipo de cliente (casa / empresa).
- **Armado de presupuesto**: el visitante elige equipos, completa sus datos y envía el pedido por WhatsApp (o por mail, cuando haya uno cargado).
- Botón flotante de WhatsApp y diseño adaptado a celulares.

## Cómo editar

Casi todo se cambia desde **`js/datos.js`**:

- `CONTACTO`: WhatsApp, mail e Instagram. Si `email` está vacío, el sitio oculta el mail y el botón "Enviar por mail".
- `PRODUCTOS`: para agregar un producto, copiá un bloque, cambiá los datos y subí la foto a `img/`.

## Verlo en tu computadora

Abrí `index.html` en el navegador, o levantá un servidor local:

```bash
python3 -m http.server
```
