const extra = [];
function add(id, source, topic, kind, prompt, choices, answer, explanation, hint, context = '', code = false, exercise = '') {
  extra.push({id, source, topic, kind, prompt, exercise, options:choices.map(([text,feedback],i)=>({id:`${id}-${i}`,text,feedback})),correct:`${id}-${answer}`,explanation,hint,context,code});
}
function concept(id, topic, prompt, correct, wrongs, explanation, source='Generalidades e historia') {
  add(id,source,topic,'Teoría',prompt,[[correct,explanation],...wrongs.map(([t,f])=>[t,f])],0,explanation,'Busca la opción que coincide literalmente con la definición o comparación presentada en el material.');
}

concept('g01','Fundamentos de NoSQL','¿Qué significa NoSQL según el material?','Not Only SQL',[["No Structured Query Language",'Esa expansión no aparece en el material.'],['New Object SQL','NoSQL no se define como una nueva variante orientada a objetos de SQL.'],['Network Only Storage Query','No corresponde al significado presentado.']],'NoSQL significa “Not Only SQL”: no se limita al modelo tabular relacional.');
concept('g02','Fundamentos de NoSQL','¿Qué distingue inicialmente a las bases NoSQL de las relacionales?','No siguen necesariamente el modelo tabular tradicional',[["Siempre almacenan información en tablas",'Eso describe el modelo relacional tradicional.'],['Solo admiten números y texto plano','NoSQL puede manejar datos heterogéneos y estructuras variadas.'],['Necesitan un esquema fijo antes de guardar datos','La flexibilidad de esquema es una característica destacada de NoSQL.']],'Las bases NoSQL abarcan modelos documentales, clave-valor, columnares y de grafos, en lugar de depender únicamente de tablas.');
concept('g03','Fundamentos de NoSQL','¿Qué tipo de datos pueden manejar especialmente bien las bases NoSQL?','Datos semiestructurados o no estructurados',[["Únicamente datos tabulares normalizados",'El material destaca precisamente estructuras distintas a las tablas rígidas.'],['Solo archivos de imagen sin metadatos','NoSQL no se limita a un formato de archivo.'],['Exclusivamente transacciones bancarias','Las transacciones bancarias aparecen más asociadas a casos relacionales.']],'El material presenta NoSQL como una opción adecuada para datos semiestructurados, no estructurados y heterogéneos.');
concept('g04','Fundamentos de NoSQL','¿En qué escenario resultan ideales las bases NoSQL según el texto?','Grandes volúmenes de información y cambios frecuentes en la estructura',[["Pocos datos con estructura que nunca cambia",'Ese escenario no aprovecha las fortalezas destacadas de NoSQL.'],['Solo operaciones sin conexión a internet','La conexión no define por sí sola el modelo de base de datos.'],['Únicamente cálculos matemáticos pequeños','El material se centra en volumen, heterogeneidad y evolución del esquema.']],'NoSQL resulta útil cuando crece mucho la información o su estructura cambia con frecuencia.');
concept('g05','Características de NoSQL','¿Qué significa flexibilidad de esquema?','Cada documento o registro puede tener una estructura diferente',[["Todos los documentos deben tener exactamente los mismos campos",'Eso corresponde a un esquema rígido.'],['La base elimina automáticamente los campos vacíos','Esa no es la definición de flexibilidad de esquema.'],['El usuario no puede modificar la estructura','La flexibilidad permite precisamente cambios y diferencias estructurales.']],'No se exige un esquema fijo idéntico para todos los registros o documentos.');
concept('g06','Características de NoSQL','¿Qué describe la escalabilidad horizontal?','Distribuir datos y carga entre varios servidores',[["Comprar un procesador más potente para un único servidor",'Eso corresponde a escalabilidad vertical.'],['Reducir la cantidad de documentos almacenados','Eliminar datos no define la escalabilidad.'],['Convertir documentos BSON en tablas SQL','La conversión de modelo no es escalabilidad horizontal.']],'Escalar horizontalmente significa añadir servidores y distribuir el trabajo.');
concept('g07','Características de NoSQL','¿Con qué se relacionan la alta disponibilidad y la tolerancia a fallos en NoSQL?','Con su diseño distribuido',[["Con prohibir datos semiestructurados",'No tiene relación con disponibilidad.'],['Con usar un solo servidor sin copias','Un único punto de fallo reduce la tolerancia.'],['Con escribir todas las consultas en SQL estándar','El lenguaje de consulta no produce por sí mismo tolerancia a fallos.']],'Al distribuir datos y servicios, el sistema puede seguir disponible ante ciertos fallos.');
concept('g08','Tipos de bases NoSQL','¿Qué modelo NoSQL almacena datos en documentos similares a JSON o BSON?','Documental',[["Clave-valor",'Guarda pares de clave y valor.'],['Columnar','Organiza y optimiza información por columnas.'],['Grafos','Representa relaciones mediante nodos y aristas.']],'Las bases documentales guardan documentos flexibles; MongoDB y CouchDB son los ejemplos del material.');
concept('g09','Tipos de bases NoSQL','¿Qué pareja contiene únicamente bases documentales?','MongoDB y CouchDB',[["Redis y DynamoDB",'Ambas aparecen como ejemplos clave-valor.'],['Cassandra y HBase','Ambas aparecen como bases columnares.'],['Neo4j y ArangoDB','Ambas aparecen como bases de grafos.']],'MongoDB y CouchDB son los ejemplos documentales del material.');
concept('g10','Tipos de bases NoSQL','¿Cómo almacena información una base clave-valor?','Mediante pares formados por una clave y su valor',[["En filas relacionadas mediante joins",'Ese enunciado se asocia al modelo relacional.'],['Solo en nodos y aristas','Eso corresponde a grafos.'],['Únicamente en columnas anchas','Eso corresponde al modelo columnar.']],'El modelo clave-valor recupera un valor por medio de una clave.');
concept('g11','Tipos de bases NoSQL','¿Qué pareja corresponde al modelo clave-valor?','Redis y DynamoDB',[["MongoDB y CouchDB",'Son documentales.'],['Cassandra y HBase','Son columnares.'],['Neo4j y ArangoDB','Son de grafos.']],'Redis y DynamoDB aparecen en el material como ejemplos clave-valor.');
concept('g12','Tipos de bases NoSQL','¿Para qué están optimizadas las bases columnares según el material?','Para grandes volúmenes de datos organizados por columna',[["Para dibujar relaciones exclusivamente",'Las relaciones mediante nodos y aristas corresponden a grafos.'],['Para exigir documentos idénticos', 'La rigidez no define el modelo columnar.'],['Para almacenar solo una clave y un valor','Eso define el modelo clave-valor.']],'Las bases columnares se orientan a grandes volúmenes y acceso eficiente por columnas.');
concept('g13','Tipos de bases NoSQL','¿Qué pareja corresponde a bases columnares?','Cassandra y HBase',[["Redis y DynamoDB",'Son clave-valor.'],['MongoDB y CouchDB','Son documentales.'],['Neo4j y ArangoDB','Son de grafos.']],'Cassandra y HBase son los ejemplos columnares presentados.');
concept('g14','Tipos de bases NoSQL','¿Cuáles son los elementos principales del modelo de grafos mencionados?','Nodos, aristas y propiedades',[["Filas, columnas y llaves foráneas",'Es vocabulario típico del modelo relacional.'],['Claves, valores y hojas','No es la terna indicada para grafos.'],['Documentos, colecciones y BSON','Es vocabulario del modelo documental de MongoDB.']],'Los grafos modelan entidades como nodos, conexiones como aristas y datos adicionales como propiedades.');
concept('g15','Tipos de bases NoSQL','¿Qué pareja corresponde a bases de grafos?','Neo4j y ArangoDB',[["MongoDB y CouchDB",'Son documentales.'],['Redis y DynamoDB','Son clave-valor.'],['Cassandra y HBase','Son columnares.']],'Neo4j y ArangoDB aparecen como ejemplos del modelo de grafos.');
concept('g16','Historia de NoSQL','¿Cuándo se popularizó NoSQL según los documentos?','A mediados de la década de 2000',[["Durante la década de 1950",'El material ubica la popularización mucho después.'],['A finales del siglo XIX','Las bases de datos informáticas no pertenecen a ese periodo.'],['Únicamente después de 2020','El auge descrito comenzó en los años 2000.']],'El crecimiento de aplicaciones web y datos generados por usuarios y dispositivos impulsó NoSQL a mediados de los 2000.');
concept('g17','Historia de NoSQL','¿Qué necesidad impulsó la popularización de NoSQL?','Escalar aplicaciones web de alta demanda y manejar datos heterogéneos',[["Reducir todas las aplicaciones a un único equipo",'El problema descrito exigía distribuir y escalar.'],['Eliminar por completo las bases relacionales','El material no afirma que SQL dejara de utilizarse.'],['Guardar únicamente documentos impresos','El impulso provino de aplicaciones web y datos digitales masivos.']],'La escala de internet y la variedad de datos exigieron soluciones distribuidas y flexibles.');
concept('g18','Historia de NoSQL','¿Qué empresas se mencionan como parte del auge que exigió nuevos sistemas de datos?','Google, Amazon y Facebook',[["Nintendo, Adobe y Oracle",'Esa terna no aparece en la explicación histórica.'],['Tesla, Intel y IBM', 'No es la terna presentada.'],['Netflix, Spotify y Fortnite','Aparecen en casos de uso, no como la terna del origen histórico.']],'Google, Amazon y Facebook se usan para ilustrar aplicaciones de internet que necesitaban escalar.');
concept('g19','Historia de NoSQL','¿Qué caracteriza la primera etapa histórica indicada para los años 2000?','Bases orientadas a objetos y almacenamiento distribuido',[["Dominio exclusivo de grafos desde 1980",'Los grafos se sitúan en una etapa posterior.'],['Desaparición de las aplicaciones web','El crecimiento web fue parte del impulso.'],['Uso obligatorio de joins complejos','Los joins se asocian a consultas relacionales.']],'El documento ubica bases orientadas a objetos y almacenamiento distribuido como primera etapa, y menciona CouchDB y Redis.');
concept('g20','Historia de NoSQL','¿Qué tecnologías ganaron popularidad entre 2005 y 2010 según el material?','MongoDB, Cassandra y DynamoDB',[["Neo4j, ArangoDB y HBase únicamente",'Los grafos se destacan desde 2010 en adelante.'],['MySQL, PostgreSQL y Oracle','Son sistemas relacionales y no son la terna indicada.'],['HTML, CSS y JavaScript','Son tecnologías web, no modelos de base de datos.']],'La etapa 2005–2010 destaca bases documentales y clave-valor con flexibilidad y escalabilidad.');
concept('g21','Historia de NoSQL','¿Qué avance se destaca desde 2010 en adelante?','Bases de grafos para modelar relaciones complejas',[["Regreso obligatorio a esquemas fijos",'No corresponde a la evolución descrita.'],['Abandono de sistemas distribuidos','La distribución siguió siendo una fortaleza.'],['Eliminación de redes sociales','Las redes sociales son un caso ideal para grafos.']],'Neo4j y tecnologías similares facilitaron modelar conexiones complejas para redes y recomendaciones.');
concept('g22','SQL frente a NoSQL','¿Qué comparación de modelos de datos es correcta?','SQL usa tablas; NoSQL puede usar documentos, clave-valor, columnas anchas o grafos',[["SQL usa únicamente grafos; NoSQL únicamente tablas",'Los modelos están invertidos.'],['Ambos exigen únicamente pares clave-valor','Ninguno se limita de esa forma.'],['NoSQL carece de cualquier modelo de datos','Sí posee varios modelos según la necesidad.']],'La tabla comparativa contrapone filas y columnas con los cuatro modelos principales de NoSQL.');
concept('g23','SQL frente a NoSQL','¿Cómo compara el material los esquemas?','SQL: fijo y predefinido; NoSQL: flexible y dinámico',[["SQL: flexible; NoSQL: siempre fijo",'La comparación está invertida.'],['Ambos carecen de esquema', 'Las bases relacionales sí usan esquemas definidos.'],['Ambos exigen documentos BSON','BSON se asocia a bases documentales como MongoDB.']],'La estructura relacional suele definirse de antemano; NoSQL permite mayor variación.');
concept('g24','SQL frente a NoSQL','¿Cuál comparación de escalabilidad coincide con el material?','SQL suele escalar verticalmente; NoSQL horizontalmente',[["SQL horizontal; NoSQL solo vertical",'La comparación está invertida.'],['Ambos escalan únicamente borrando datos','Borrar datos no define la escalabilidad.'],['NoSQL no puede distribuirse','La distribución en múltiples servidores es una característica destacada.']],'Vertical significa mejorar un servidor; horizontal significa añadir servidores.');
concept('g25','SQL frente a NoSQL','¿Cómo compara el material la consistencia?','SQL se asocia con ACID; NoSQL con consistencia eventual y CAP',[["SQL con CAP; NoSQL exclusivamente con ACID",'La asociación presentada está invertida.'],['Ambos carecen de modelos de consistencia','Ambos poseen principios para el comportamiento de los datos.'],['NoSQL garantiza siempre que todos los nodos cambien al mismo instante','La consistencia eventual acepta sincronización posterior en entornos distribuidos.']],'La comparación presenta alta consistencia ACID en SQL y consistencia eventual relacionada con CAP en NoSQL.');
concept('g26','SQL frente a NoSQL','¿Cómo se comparan los tipos de consulta?','SQL usa un lenguaje estándar y joins; NoSQL usa consultas propias de cada tipo',[["NoSQL exige siempre SQL estándar",'NoSQL puede tener interfaces y lenguajes propios.'],['SQL no permite relacionar datos','Los joins complejos son una capacidad destacada de SQL.'],['Ninguno de los dos permite consultas','Ambos permiten recuperar y trabajar con datos.']],'Las consultas NoSQL dependen del modelo y del sistema gestor; SQL dispone de un estándar común.');
concept('g27','Casos de uso','¿Qué caso se asocia a bases relacionales en la tabla?','ERP, bancos y contabilidad',[["Redes sociales, IoT y analítica web",'Esos aparecen como casos NoSQL.'],['Catálogos flexibles y logs masivos','Se relacionan con fortalezas NoSQL.'],['Relaciones de grafos en redes sociales','Es un caso NoSQL de grafos.']],'La estructura y consistencia relacional encajan con ERP, banca y contabilidad.');
concept('g28','Casos de uso','¿Por qué los grafos son útiles en redes sociales?','Permiten consultar conexiones entre usuarios de manera eficiente',[["Obligan a guardar cada usuario en una tabla aislada",'Eso impediría aprovechar las relaciones del grafo.'],['Eliminan publicaciones y comentarios','No es una función del modelo.'],['Solo almacenan métricas numéricas por columna','Eso describe más un uso columnar.']],'Usuarios, publicaciones, comentarios y relaciones pueden modelarse; los grafos destacan al recorrer conexiones.');
concept('g29','Casos de uso','¿Qué uso de NoSQL se menciona para comercio electrónico?','Catálogos, recomendaciones personalizadas y sesiones de usuario',[["Solo balances contables con esquema invariable",'Ese ejemplo se acerca a un caso relacional.'],['Únicamente dibujar topologías de red','No es el caso presentado.'],['Compilar el código de una tienda','La compilación no es una tarea de una base de datos.']],'Amazon y Alibaba aparecen como ejemplos; MongoDB puede manejar catálogos flexibles.');
concept('g30','Casos de uso','¿Qué modelos NoSQL se señalan para datos masivos de dispositivos IoT?','Columnares o clave-valor',[["Únicamente hojas de cálculo locales",'No corresponde a la arquitectura señalada.'],['Solo bases relacionales sin distribución','El caso destaca volumen y tiempo real.'],['Exclusivamente bases de grafos para cada medición','El material menciona columnares o clave-valor.']],'Los dispositivos generan grandes flujos en tiempo real que pueden almacenarse eficientemente en sistemas columnares o clave-valor.');
concept('g31','Casos de uso','¿Qué información se menciona para analítica y Big Data?','Logs, preferencias de usuario y métricas de uso',[["Solo nombres de tablas vacías",'No corresponde al caso descrito.'],['Únicamente documentos impresos digitalizados','El foco está en comportamiento y uso digital.'],['Solo contraseñas sin actividad','No es la lista del material.']],'Netflix y Spotify se citan como plataformas que alimentan recomendaciones y análisis de comportamiento con esos datos.');
concept('g32','Casos de uso','¿Qué aprovechan los juegos en línea de las bases NoSQL?','Manejo de jugadores, partidas y estadísticas en tiempo real con escalabilidad horizontal',[["Conversión obligatoria de cada partida en una hoja de cálculo",'No es el enfoque descrito.'],['Eliminación de las estadísticas del jugador','Las estadísticas forman parte de los datos administrados.'],['Uso de un único equipo sin capacidad de crecer','Contradice la escalabilidad horizontal mencionada.']],'Fortnite y Clash of Clans aparecen como ejemplos de juegos con información en tiempo real y alta escala.');

function mutateComparator(q){
  const pairs=[['$gt','$gte'],['$gte','$gt'],['$lt','$lte'],['$lte','$lt'],['$eq','$ne'],['$ne','$eq']];
  for(const [a,b] of pairs) if(q.includes(a)) return q.replace(a,b);
  if(q.includes('tipo: "')) return q.replace(/tipo: "([^"]+)"/, 'tipo: { $ne: "$1" }');
  if(q.includes('precio: 30')) return q.replace('precio: 30','precio: { $ne: 30 }');
  if(q.includes('stock: 30')) return q.replace('stock: 30','stock: { $ne: 30 }');
  return q.replace('find(', 'findOne(');
}
function findQ(n,prompt,query){
  const changed=mutateComparator(query);
  add(`b${String(n).padStart(2,'0')}`,'Consultas básicas','Consultas find()','Código',prompt,[[query,'Usa la colección, el método y todas las condiciones indicadas.'],[query.replace('.find(','.findOne('),'findOne() devolvería como máximo una coincidencia; el enunciado pide mostrar todos los productos.'],[changed,'Cambia al menos un límite, igualdad o negación del enunciado.'],[query.replace('db.inventario','db.productos'),'El material trabaja con la colección inventario, no con productos.']],0,`La consulta correcta es ${query}. Cada condición del filtro debe conservar el campo, el operador y el límite del enunciado.`,'Traduce “mayor”, “menor”, “igual”, “diferente” y las uniones Y/O antes de comparar el código.','',true,n);
}
const finds=[
['Mostrar todos los productos cuyo precio sea mayor que 50.','db.inventario.find({ precio: { $gt: 50 } })'],
['Mostrar todos los productos cuyo precio sea menor que 50.','db.inventario.find({ precio: { $lt: 50 } })'],
['Mostrar todos los productos cuyo precio sea exactamente 50.','db.inventario.find({ precio: { $eq: 50 } })'],
['Mostrar todos los productos cuyo precio sea diferente de 50.','db.inventario.find({ precio: { $ne: 50 } })'],
['Mostrar todos los productos cuyo precio sea mayor o igual a 100.','db.inventario.find({ precio: { $gte: 100 } })'],
['Mostrar todos los productos cuyo precio sea menor o igual a 30.','db.inventario.find({ precio: { $lte: 30 } })'],
['Mostrar todos los productos cuyo stock sea mayor que 100.','db.inventario.find({ stock: { $gt: 100 } })'],
['Mostrar todos los productos cuyo stock sea menor que 20.','db.inventario.find({ stock: { $lt: 20 } })'],
['Mostrar todos los productos cuyo stock sea exactamente 30.','db.inventario.find({ stock: { $eq: 30 } })'],
['Mostrar todos los productos cuyo stock sea diferente de 30.','db.inventario.find({ stock: { $ne: 30 } })'],
['Mostrar productos con precio mayor que 50 y stock mayor que 50.','db.inventario.find({ $and: [ { precio: { $gt: 50 } }, { stock: { $gt: 50 } } ] })'],
['Mostrar productos con precio menor que 50 y stock mayor que 100.','db.inventario.find({ $and: [ { precio: { $lt: 50 } }, { stock: { $gt: 100 } } ] })'],
['Mostrar productos con precio entre 50 y 100, incluyendo ambos límites.','db.inventario.find({ precio: { $gte: 50, $lte: 100 } })'],
['Mostrar productos con stock mayor o igual a 100 y precio menor que 50.','db.inventario.find({ $and: [ { stock: { $gte: 100 } }, { precio: { $lt: 50 } } ] })'],
['Mostrar productos con stock menor o igual a 20 y precio mayor que 50.','db.inventario.find({ $and: [ { stock: { $lte: 20 } }, { precio: { $gt: 50 } } ] })'],
['Mostrar productos con precio igual a 30 y stock mayor que 50.','db.inventario.find({ $and: [ { precio: 30 }, { stock: { $gt: 50 } } ] })'],
['Mostrar productos con precio diferente de 50 y stock menor que 50.','db.inventario.find({ $and: [ { precio: { $ne: 50 } }, { stock: { $lt: 50 } } ] })'],
['Mostrar productos con precio mayor o igual a 80 y stock menor o igual a 50.','db.inventario.find({ $and: [ { precio: { $gte: 80 } }, { stock: { $lte: 50 } } ] })'],
['Mostrar productos con precio menor que 100 y stock mayor o igual a 100.','db.inventario.find({ $and: [ { precio: { $lt: 100 } }, { stock: { $gte: 100 } } ] })'],
['Mostrar productos con precio mayor que 25 y stock menor que 100.','db.inventario.find({ $and: [ { precio: { $gt: 25 } }, { stock: { $lt: 100 } } ] })'],
['Mostrar todos los productos de tipo "perecedero".','db.inventario.find({ tipo: "perecedero" })'],
['Mostrar todos los productos de tipo "no perecedero".','db.inventario.find({ tipo: "no perecedero" })'],
['Mostrar productos cuyo tipo sea diferente de "perecedero".','db.inventario.find({ tipo: { $ne: "perecedero" } })'],
['Mostrar productos de tipo "limpieza" con precio mayor que 40.','db.inventario.find({ tipo: "limpieza", precio: { $gt: 40 } })'],
['Mostrar productos de tipo "aseo" con stock mayor que 100.','db.inventario.find({ tipo: "aseo", stock: { $gt: 100 } })'],
['Mostrar productos "perecedero" con stock menor que 10.','db.inventario.find({ tipo: "perecedero", stock: { $lt: 10 } })'],
['Mostrar productos "no perecedero" con precio mayor o igual a 100.','db.inventario.find({ tipo: "no perecedero", precio: { $gte: 100 } })'],
['Mostrar productos "limpieza" con stock menor o igual a 100.','db.inventario.find({ tipo: "limpieza", stock: { $lte: 100 } })'],
['Mostrar productos distintos de "limpieza" con precio menor que 50.','db.inventario.find({ tipo: { $ne: "limpieza" }, precio: { $lt: 50 } })'],
['Mostrar productos "perecedero", con precio mayor que 50 y stock menor que 20.','db.inventario.find({ tipo: "perecedero", precio: { $gt: 50 }, stock: { $lt: 20 } })']
];
finds.forEach(([p,q],i)=>findQ(i+1,p,q));

function updateQ(n,prompt,filter,set){
 const q=`db.inventario.updateOne(${filter}, { $set: ${set} })`;
 add(`b${n}`,'Consultas básicas','Actualizaciones','Código',prompt,[[q,'updateOne() localiza una coincidencia y $set cambia únicamente el campo indicado.'],[q.replace('updateOne','updateMany'),'updateMany() podría modificar todos los documentos coincidentes; el ejercicio pide un producto.'],[`db.inventario.find(${filter}, ${set})`,'find() consulta datos y no actualiza el documento.'],[`db.inventario.updateOne(${filter}, ${set})`,'Falta $set; los ejercicios usan ese operador para modificar un campo sin reemplazar el documento.']],0,`Se filtra el producto con ${filter} y se aplica { $set: ${set} } mediante updateOne().`,'Separa el documento de filtro del documento que contiene $set.','',true,n);
}
[
[31,'Actualizar el precio de "Arroz Diana 500g" a 35.','{ nombre: "Arroz Diana 500g" }','{ precio: 35 }'],
[32,'Actualizar el stock de "Arroz Diana 1kg" a 100.','{ nombre: "Arroz Diana 1kg" }','{ stock: 100 }'],
[33,'Cambiar el tipo de "Detergente 1kg" de limpieza a aseo.','{ nombre: "Detergente 1kg" }','{ tipo: "aseo" }'],
[34,'Actualizar el precio de "Café Premium 250g" a 280.','{ nombre: "Café Premium 250g" }','{ precio: 280 }'],
[35,'Cambiar el stock de "Carne Molida 500g" a 10.','{ nombre: "Carne Molida 500g" }','{ stock: 10 }'],
[36,'Establecer en 220 el precio de "Aceite de Oliva 500ml".','{ nombre: "Aceite de Oliva 500ml" }','{ precio: 220 }'],
[37,'Modificar a 20 el stock de "Leche Entera 1L".','{ nombre: "Leche Entera 1L" }','{ stock: 20 }'],
[38,'Buscar un producto cuyo precio sea 25 y cambiar su stock a 100.','{ precio: 25 }','{ stock: 100 }'],
[39,'Buscar un producto con stock menor que 5 y establecer su stock en 10.','{ stock: { $lt: 5 } }','{ stock: 10 }'],
[40,'Buscar un producto perecedero con stock menor que 10 y modificar su precio a 60.','{ tipo: "perecedero", stock: { $lt: 10 } }','{ precio: 60 }']
].forEach(x=>updateQ(...x));

function insertOneQ(n,name,price,stock,type){
 const doc=`{ nombre: "${name}", precio: ${price}, stock: ${stock}, tipo: "${type}" }`,q=`db.inventario.insertOne(${doc})`;
 add(`b${n}`,'Consultas básicas','Inserciones','Código',`Insertar “${name}” con precio ${price}, stock ${stock} y tipo “${type}” usando insertOne().`,[[q,'insertOne() recibe directamente el documento que se desea guardar.'],[`db.inventario.insertMany(${doc})`,'insertMany() espera un arreglo de documentos, no un documento suelto.'],[`db.inventario.insertOne([ ${doc} ])`,'insertOne() recibe un documento, no un arreglo de documentos.'],[q.replace('db.inventario','db.productos'),'El ejercicio usa la colección inventario.']],0,'insertOne() recibe un objeto con los cuatro campos y valores indicados.','Comprueba si el método espera un documento o un arreglo.','',true,n);
}
insertOneQ(41,'Harina de Trigo 1kg',40,70,'no perecedero');
insertOneQ(42,'Yogur de Fresa 1L',55,15,'perecedero');
insertOneQ(43,'Lavaloza 500ml',35,80,'limpieza');
function manyQ(n,prompt,docs){
 const inside=docs.join(',\n  '),q=`db.inventario.insertMany([\n  ${inside}\n])`;
 add(`b${n}`,'Consultas básicas','Inserciones','Código',prompt,[[q,'insertMany() recibe un arreglo que contiene todos los documentos.'],[`db.inventario.insertOne([\n  ${inside}\n])`,'insertOne() no es el método para insertar varios documentos del arreglo.'],[`db.inventario.insertMany(\n  ${inside}\n)`,'Faltan los corchetes del arreglo requerido por insertMany().'],[q.replace('insertMany','updateMany'),'updateMany() modifica documentos existentes; no realiza inserciones.']],0,'Para insertar varios productos se usa insertMany([ documento1, documento2, ... ]).','Busca los corchetes que agrupan todos los documentos.','',true,n);
}
manyQ(44,'Insertar con insertMany() un producto no perecedero y uno de limpieza.',['{ nombre: "Pasta Espagueti 500g", precio: 45, stock: 90, tipo: "no perecedero" }','{ nombre: "Cloro 1L", precio: 35, stock: 60, tipo: "limpieza" }']);
manyQ(45,'Insertar con insertMany() tres productos con precios y stocks diferentes.',['{ nombre: "Atún 170g", precio: 65, stock: 55, tipo: "no perecedero" }','{ nombre: "Fresas 500g", precio: 70, stock: 14, tipo: "perecedero" }','{ nombre: "Pan de Molde", precio: 75, stock: 22, tipo: "perecedero" }']);
function deleteQ(n,prompt,filter){
 const q=`db.inventario.deleteOne(${filter})`;
 add(`b${n}`,'Consultas básicas','Eliminaciones','Código',prompt,[[q,'deleteOne() elimina una sola coincidencia del filtro.'],[q.replace('deleteOne','deleteMany'),'deleteMany() puede eliminar todas las coincidencias, no una sola.'],[q.replace('deleteOne','find'),'find() únicamente consulta los documentos.'],[q.replace('db.inventario','db.productos'),'La colección usada en el ejercicio es inventario.']],0,`deleteOne(${filter}) elimina como máximo un documento que cumpla el filtro.`,'Verifica el método, la colección y el documento de filtro.','',true,n);
}
deleteQ(46,'Eliminar mediante deleteOne() el producto "Escoba".','{ nombre: "Escoba" }');
deleteQ(47,'Eliminar mediante deleteOne() el producto "Banano 1kg".','{ nombre: "Banano 1kg" }');
deleteQ(48,'Eliminar un producto cuyo precio sea exactamente 200.','{ precio: 200 }');
deleteQ(49,'Eliminar un producto cuyo stock sea menor que 5.','{ stock: { $lt: 5 } }');
deleteQ(50,'Eliminar un producto perecedero cuyo stock sea menor o igual a 5.','{ tipo: "perecedero", stock: { $lte: 5 } }');

function logicalMutation(q){
 if(q.includes('$and'))return q.replace('$and','$or');
 if(q.includes('$nor'))return q.replace('$nor','$or');
 if(q.includes('$or'))return q.replace('$or','$and');
 return q.replace(/\$not: \{ (\$\w+): ([^}]+) \}/,'$1: $2');
}
function logicalQ(n,prompt,q){
 add(`l${String(n).padStart(2,'0')}`,'Operadores lógicos','Operadores lógicos','Código',prompt,[[q,'Representa exactamente las uniones, alternativas o negaciones del enunciado.'],[logicalMutation(q),'Cambia el operador lógico principal o elimina la negación y altera el conjunto de resultados.'],[q.replace('.find(','.findOne('),'findOne() devolvería como máximo un documento, aunque varios puedan cumplir.'],[q.replace('db.inventario','db.productos'),'El ejercicio consulta la colección inventario.']],0,`La consulta traduce Y con $and, O con $or, NO con $not y NI con $nor, conservando los comparadores indicados.`,'Agrupa primero las condiciones unidas por Y, O, NO o NI.','',true,n);
}
const logicals=[
['Precio mayor que 50 Y stock mayor que 50.','db.inventario.find({ $and: [ { precio: { $gt: 50 } }, { stock: { $gt: 50 } } ] })'],
['Precio menor que 50 O stock menor que 20.','db.inventario.find({ $or: [ { precio: { $lt: 50 } }, { stock: { $lt: 20 } } ] })'],
['Tipo perecedero Y precio mayor que 50.','db.inventario.find({ $and: [ { tipo: "perecedero" }, { precio: { $gt: 50 } } ] })'],
['Tipo limpieza O tipo aseo.','db.inventario.find({ $or: [ { tipo: "limpieza" }, { tipo: "aseo" } ] })'],
['Precio mayor o igual a 100 Y stock menor o igual a 50.','db.inventario.find({ $and: [ { precio: { $gte: 100 } }, { stock: { $lte: 50 } } ] })'],
['Precio igual a 30 O stock igual a 30.','db.inventario.find({ $or: [ { precio: 30 }, { stock: 30 } ] })'],
['Tipo NO igual a perecedero.','db.inventario.find({ tipo: { $not: { $eq: "perecedero" } } })'],
['Precio NO mayor que 100.','db.inventario.find({ precio: { $not: { $gt: 100 } } })'],
['Productos que NO tengan stock menor que 20.','db.inventario.find({ stock: { $not: { $lt: 20 } } })'],
['Productos que no sean de limpieza NI tengan precio 50.','db.inventario.find({ $nor: [ { tipo: "limpieza" }, { precio: 50 } ] })'],
['Precio no menor que 50 NI stock mayor que 100.','db.inventario.find({ $nor: [ { precio: { $lt: 50 } }, { stock: { $gt: 100 } } ] })'],
['(Tipo perecedero Y stock menor que 10) O precio mayor que 100.','db.inventario.find({ $or: [ { $and: [ { tipo: "perecedero" }, { stock: { $lt: 10 } } ] }, { precio: { $gt: 100 } } ] })'],
['Precio mayor que 25 Y (tipo no perecedero O stock mayor que 100).','db.inventario.find({ $and: [ { precio: { $gt: 25 } }, { $or: [ { tipo: "no perecedero" }, { stock: { $gt: 100 } } ] } ] })'],
['Precio entre 50 y 100, incluidos, Y stock mayor que 20.','db.inventario.find({ $and: [ { precio: { $gte: 50, $lte: 100 } }, { stock: { $gt: 20 } } ] })'],
['(Tipo aseo O limpieza) Y stock menor o igual a 100.','db.inventario.find({ $and: [ { $or: [ { tipo: "aseo" }, { tipo: "limpieza" } ] }, { stock: { $lte: 100 } } ] })'],
['Tipo NO perecedero Y precio menor que 50.','db.inventario.find({ $and: [ { tipo: { $not: { $eq: "perecedero" } } }, { precio: { $lt: 50 } } ] })'],
['(Precio 50 O 200) Y stock NO menor que 10.','db.inventario.find({ $and: [ { $or: [ { precio: 50 }, { precio: 200 } ] }, { stock: { $not: { $lt: 10 } } } ] })'],
['Productos que NO sean de limpieza NI tengan stock 30.','db.inventario.find({ $nor: [ { tipo: "limpieza" }, { stock: 30 } ] })'],
['Tipo perecedero Y precio mayor que 50 Y stock menor que 20.','db.inventario.find({ $and: [ { tipo: "perecedero" }, { precio: { $gt: 50 } }, { stock: { $lt: 20 } } ] })'],
['(Precio menor o igual a 30 O stock mayor o igual a 150) Y tipo NO limpieza.','db.inventario.find({ $and: [ { $or: [ { precio: { $lte: 30 } }, { stock: { $gte: 150 } } ] }, { tipo: { $not: { $eq: "limpieza" } } } ] })']
];
logicals.forEach(([p,q],i)=>logicalQ(i+1,p,q));
concept('l21','Operadores lógicos','¿Qué traducción de los operadores lógicos coincide con el resumen del material?','$and = Y; $or = O; $not = NO; $nor = NI',[["$and = O; $or = Y; $not = NI; $nor = NO",'Intercambia los significados.'],['$and = mayor; $or = menor; $not = igual; $nor = diferente','Esos significados corresponden a comparadores, no a operadores lógicos.'],['Los cuatro significan Y','Cada operador construye una relación lógica diferente.']],'El resumen del PDF asocia $and con Y, $or con O, $not con NO y $nor con NI.','Operadores lógicos');
concept('l22','Operadores lógicos','¿Con qué operadores se combinan $and, $or, $not y $nor para crear consultas más específicas?','$gt, $lt, $eq, $ne, $gte y $lte',[["$set, $unset y $rename",'Son operadores de actualización, no la lista de comparación del resumen.'],['insertOne, updateOne y deleteOne','Son métodos de colección.'],['JSON, BSON y SQL','Son formatos o lenguajes, no comparadores.']],'El material combina operadores lógicos con operadores de comparación para precisar los filtros.','Operadores lógicos');

export default extra;
