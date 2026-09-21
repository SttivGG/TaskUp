# TaskUp Mongo práctica local

Esta carpeta contiene una copia local de la práctica completa de MongoDB. Conserva las 136 preguntas, los filtros por material y tema, los modos de práctica guiada y simulacro, la calificación sobre 5, la revisión de respuestas y la opción de repetir errores.

## Requisitos

- Visual Studio Code.
- Node.js instalado en el equipo.

No se debe ejecutar `npm install`. El proyecto no utiliza paquetes externos ni necesita una base de datos para esta versión.

## Abrir y ejecutar en Visual Studio Code

1. Clona el repositorio con `git clone https://github.com/SttivGG/TaskUp.git` o descarga y descomprime su ZIP.
2. Abre Visual Studio Code.
3. Selecciona `Archivo` y después `Abrir carpeta`.
4. Selecciona la carpeta descargada o clonada (`TaskUp` si usaste Git).
5. Abre la terminal integrada con `Ctrl + ñ` o desde `Terminal > Nueva terminal`.
6. Ejecuta:

```bash
npm start
```

7. Abre en el navegador:

```text
http://localhost:5173
```

Para detener la aplicación, vuelve a la terminal y presiona `Ctrl + C`.

También puedes iniciarla desde VS Code presionando `Ctrl + Shift + B` y escogiendo la tarea `Iniciar TaskUp Mongo práctica`.

## Por qué no se abre directamente index.html

La aplicación utiliza módulos de JavaScript. Algunos navegadores bloquean esos módulos cuando el archivo se abre con una dirección `file:///`. El servidor local evita ese bloqueo y permite que la aplicación funcione igual que la versión publicada.

## Archivos principales

| Archivo | Función |
| --- | --- |
| `index.html` | Estructura inicial, título, cabecera y carga de archivos |
| `style.css` | Diseño principal, preguntas, botones, resultados y adaptación móvil |
| `extra.css` | Estilos adicionales de filtros y detalles de la sesión |
| `app.js` | Interfaz, navegación, selección de preguntas, modos y retroalimentación |
| `engine.js` | Mezcla de preguntas, creación de sesiones y cálculo de calificación |
| `questions.js` | Preguntas del taller de facturación con consultas `find()` |
| `extra-questions.js` | Preguntas de generalidades, consultas básicas y operadores lógicos |
| `server.mjs` | Servidor local que funciona únicamente con Node.js |

## Cambiar textos y diseño

- El nombre y la cabecera están en `index.html`.
- Los títulos de la pantalla principal están en la función `heading` de `app.js`.
- Los colores, tamaños y distribución están en `style.css` y `extra.css`.
- La fórmula de la nota está en la función `score` de `engine.js`.

Guarda los cambios y actualiza el navegador con `Ctrl + R`. El servidor desactiva la caché para que los cambios se reflejen inmediatamente.

## Agregar una pregunta sencilla

En `extra-questions.js`, agrega una llamada a `add` antes de la línea `export default extra;`.

```js
add(
  'personal-001',
  'Material personal',
  'Consultas find()',
  'Código',
  '¿Qué consulta muestra los productos con stock mayor que 20?',
  [
    ['db.productos.find({ stock: { $gt: 20 } })', 'Usa $gt para buscar valores mayores que 20.'],
    ['db.productos.find({ stock: { $lt: 20 } })', '$lt busca valores menores que 20.'],
    ['db.productos.find({ stock: 20 })', 'Esta consulta busca exactamente el valor 20.'],
    ['db.productos.find({ stock: { $gte: 20 } })', '$gte también incluye el valor 20.']
  ],
  0,
  'La respuesta correcta utiliza $gt porque la condición es estrictamente mayor que 20.',
  'Recuerda que $gt significa greater than.',
  '',
  true,
  'Personal 1'
);
```

El número `0` indica que la primera opción es la correcta. Si la opción correcta fuera la segunda, se escribiría `1`; para la tercera, `2`; y para la cuarta, `3`.

Cada pregunta debe tener un identificador único. No repitas valores como `personal-001` porque la aplicación usa ese identificador para guardar la respuesta durante la sesión.

## Comprobar los archivos

Ejecuta esta verificación después de hacer cambios importantes:

```bash
npm run check
```

Si no aparece ningún error, la sintaxis de los archivos JavaScript es válida.

## Limitaciones de esta versión

- Las preguntas están guardadas en archivos JavaScript.
- Las respuestas y resultados permanecen en la memoria del navegador durante la sesión.
- Al recargar la página se inicia una sesión nueva.
- Todavía no existen usuarios, inicio de sesión ni almacenamiento en una base de datos.

Estas limitaciones son adecuadas para conservar exactamente la práctica actual. La evolución hacia TaskUp puede incorporar después los backends, bases de datos, usuarios, carga de materiales y planes de estudio sin perder este módulo de cuestionarios.
