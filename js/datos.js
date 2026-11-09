/*
 * DATOS DEL SITIO — editá este archivo para cambiar contacto, servicios y productos.
 * No hace falta tocar el HTML.
 */

const CONTACTO = {
  whatsapp: "5491145635190",          // sin "+", espacios ni guiones
  whatsappVisible: "+54 9 11 4563-5190",
  email: "",                         // cuando crees el mail, ponelo acá (ej.: "info@helsecurity.com")
  instagram: "helsecurity",
};

/* Categorías del catálogo (el orden es el de los filtros) */
const CATEGORIAS = ["Kits", "Cámaras", "Alarmas", "Accesorios"];

/*
 * Productos del catálogo.
 * - id: único, sin espacios
 * - imagen: archivo dentro de /img
 * - para: "vivienda", "empresa" o ambos
 */
const PRODUCTOS = [
  {
    id: "kit-4-camaras",
    nombre: "Kit 4 cámaras + DVR",
    categoria: "Kits",
    imagen: "kit-4-camaras.webp",
    descripcion: "2 cámaras bullet y 2 domo con grabador digital. Ves todo desde el celular.",
    para: ["vivienda", "empresa"],
  },
  {
    id: "kit-monitor-camara",
    nombre: "Kit monitor + cámaras",
    categoria: "Kits",
    imagen: "kit-monitor-2.webp",
    descripcion: "Monitor con cámaras listas para instalar. Ideal para comercios.",
    para: ["empresa"],
  },
  {
    id: "kit-monitor-portero",
    nombre: "Kit monitor compacto",
    categoria: "Kits",
    imagen: "kit-monitor-1.webp",
    descripcion: "Monitor compacto con cámara exterior para entradas y garajes.",
    para: ["vivienda"],
  },
  {
    id: "camara-bullet",
    nombre: "Cámara bullet infrarroja",
    categoria: "Cámaras",
    imagen: "camara-bullet.webp",
    descripcion: "Visión nocturna y detección de movimiento. Para exterior.",
    para: ["vivienda", "empresa"],
  },
  {
    id: "camaras-monitor-mini",
    nombre: "Set de cámaras con monitor",
    categoria: "Cámaras",
    imagen: "kit-monitor-3.webp",
    descripcion: "Dos cámaras con monitor y control remoto.",
    para: ["vivienda"],
  },
  {
    id: "panel-alarma",
    nombre: "Central de alarma con teclado",
    categoria: "Alarmas",
    imagen: "panel-alarma.webp",
    descripcion: "Panel con teclado LCD, sensores y control desde la app del celular.",
    para: ["vivienda", "empresa"],
  },
  {
    id: "niebla-disuasiva",
    nombre: "Generador de niebla disuasiva",
    categoria: "Alarmas",
    imagen: "niebla.webp",
    descripcion: "Llena el ambiente de niebla en segundos: lo que no se ve, no se roba.",
    para: ["empresa"],
  },
  {
    id: "bateria-12v",
    nombre: "Batería 12V 7Ah",
    categoria: "Accesorios",
    imagen: "bateria-12v.webp",
    descripcion: "Respaldo para centrales de alarma y sistemas de cámaras.",
    para: ["vivienda", "empresa"],
  },
];
