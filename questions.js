const bank = [];
function add(id, exercise, topic, kind, prompt, choices, answer, explanation, hint, context = '', code = false) {
  bank.push({id, exercise, source:'Facturación con find()', topic, kind, prompt, options: choices.map(([text,feedback],i) => ({id: `${id}-${i}`, text, feedback})), correct: `${id}-${answer}`, explanation, hint, context, code});
}
add('e1a',1,'Filtros y proyección','Código','Se necesitan solo producto, precio y cantidad de las ventas de «frijol kilo», sin _id. ¿Qué consulta cumple todo?',[
['db.ventas.find(\n  { producto: "frijol kilo" },\n  { _id: 0, producto: 1, precio: 1, cantidad: 1 }\n)','El primer documento filtra el producto; el segundo incluye los tres campos y excluye _id.'],
['db.ventas.find(\n  { producto: "frijol kilo" },\n  { producto: 1, precio: 1, cantidad: 1 }\n)','Falta _id: 0: el identificador se devuelve de forma predeterminada.'],
['db.ventas.find(\n  { producto: "frijol kilo" },\n  { _id: 0, producto: 0, precio: 0, cantidad: 0 }\n)','Los ceros excluyen precisamente los campos que se quieren mostrar y dejan otros campos.'],
['db.ventas.find(\n  { producto: 1, precio: 1, cantidad: 1 },\n  { producto: "frijol kilo", _id: 0 }\n)','El filtro busca valores numéricos iguales a 1; no busca las ventas del producto indicado.']
],0,'find(filtro, proyección): el filtro decide qué documentos salen; la proyección decide qué campos se muestran. _id: 0 permite ocultar el identificador.','Revisa por separado el producto buscado y los campos que aparecen.', '',true);
add('e1b',1,'Filtros y proyección','Teoría','Al ejecutar esta consulta sobre una venta que tiene los tres campos, ¿qué campos aparecen?',[
['producto, precio e _id','_id se incluye de forma predeterminada, aunque no se escriba en la proyección.'],
['Únicamente producto y precio','Para mostrar únicamente esos dos campos es necesario agregar _id: 0.'],
['Todos los campos del documento','La proyección de inclusión limita la salida a los campos indicados y al _id predeterminado.'],
['Únicamente _id','producto: 1 y precio: 1 incluyen ambos campos en la salida.']
],0,'La inclusión de campos no oculta automáticamente _id. Para quitarlo se usa { _id: 0, producto: 1, precio: 1 }.','Hay un campo especial que MongoDB muestra de forma predeterminada.','db.ventas.find({ producto: "frijol kilo" }, { producto: 1, precio: 1 })');
add('e2a',2,'Filtros y proyección','Código','factura se almacena como texto. ¿Qué filtro recupera todas las líneas de la factura "F-102"?',[
['{ factura: "F-102" }','La igualdad selecciona cada documento cuyo campo factura coincide con ese texto.'],
['{ factura: 1 }','Esto busca documentos cuyo valor de factura sea el número 1.'],
['{ cliente: "F-102" }','Compara el valor con cliente, no con el número de factura.'],
['{ factura: { $gt: "F-102" } }','$gt selecciona valores mayores según la comparación de cadenas; no exige igualdad.']
],0,'Cada documento es una línea. Varias líneas pueden compartir factura y find() las selecciona mediante el mismo filtro.','Piensa qué campo identifica la factura, independientemente de sus productos.','db.ventas.find(FILTRO, { factura: 1, cliente: 1, producto: 1, precio: 1, cantidad: 1 })',true);
add('e2b',2,'Filtros y proyección','Teoría','En el taller, tres documentos tienen factura: "F-102". ¿Qué hace find({ factura: "F-102" })?',[
['Selecciona las tres líneas como documentos separados','find() selecciona todas las coincidencias y conserva un resultado por documento.'],
['Fusiona las tres líneas en una sola factura','El filtro no agrupa ni fusiona documentos.'],
['Selecciona únicamente la primera línea','find() no se limita a la primera coincidencia.'],
['Suma los importes de las tres líneas automáticamente','find() no calcula un total entre documentos automáticamente.']
],0,'El modelo del PDF guarda una línea por documento. Consultar una factura no convierte sus líneas en un único documento ni suma sus valores.','Recuerda qué representa un documento dentro de ventas.');
add('e3a',3,'Filtros y proyección','Código','¿Qué consulta muestra solo producto, categoría, precio, cantidad e iva de la categoría "granos", ocultando _id?',[
['db.ventas.find(\n { "categoría": "granos" },\n { _id: 0, producto: 1, "categoría": 1, precio: 1, cantidad: 1, iva: 1 }\n)','Filtra por el campo categoría y proyecta exactamente los cinco campos solicitados.'],
['db.ventas.find(\n { producto: "granos" },\n { _id: 0, producto: 1, "categoría": 1, precio: 1, cantidad: 1, iva: 1 }\n)','El filtro usa producto; el enunciado pide seleccionar por categoría.'],
['db.ventas.find(\n { "categoría": "granos" },\n { _id: 0, producto: 1, "categoría": 1, precio: 1, cantidad: 1, iva: 0 }\n)','Mezcla inclusiones con la exclusión de iva. En esta proyección solo _id puede excluirse junto a inclusiones.'],
['db.ventas.find(\n { "categoría": "granos" },\n { _id: 0, producto: 1, "categoría": 1, precio: 1, cantidad: 1 }\n)','Omite iva, que sí se solicitó en la salida.']
],0,'Los nombres de los campos deben coincidir con los almacenados. Aquí se usa categoría, con tilde, como en el escenario del taller.','Comprueba que el filtro y los cinco campos requeridos estén presentes.','En estos ejercicios el nombre del campo es "categoría", con tilde.',true);
add('e3b',3,'Filtros y proyección','Teoría','¿Qué problema tiene esta proyección?',[
['Mezcla inclusión y exclusión de campos distintos de _id','producto: 1 incluye y precio: 0 excluye; esa combinación no es válida.'],
['Usa _id: 0 junto a producto: 1','Excluir _id sí es la excepción permitida en una proyección de inclusión.'],
['Usa un filtro vacío en find()','El filtro vacío es válido y selecciona todos los documentos.'],
['Usa números para indicar los campos','Los números 1 y 0 son indicadores válidos para incluir o excluir campos.']
],0,'En una proyección de inclusión se indican los campos deseados con 1. Los demás se omiten sin ponerlos en 0; _id es la excepción.','Distingue la regla general de la excepción del identificador.','db.ventas.find({}, { _id: 0, producto: 1, precio: 0 })');
add('e4a',4,'Filtros y proyección','Código','¿Qué filtro selecciona las ventas cuya forma de pago es exactamente "efectivo"?',[
['{ forma_pago: "efectivo" }','Compara forma_pago con el texto solicitado.'],
['{ estado: "efectivo" }','estado indica la situación de la venta, no su forma de pago.'],
['{ forma_pago: 1 }','En un filtro, 1 es un valor buscado; no significa mostrar el campo.'],
['{ vendedor: "efectivo" }','vendedor es un campo diferente de forma_pago.']
],0,'El filtro usa la igualdad campo: valor. La proyección puede incluir factura, cliente, forma_pago y estado.','El primer documento de find() contiene condiciones, no indicadores de inclusión.','db.ventas.find(FILTRO, { factura: 1, cliente: 1, forma_pago: 1, estado: 1 })',true);
add('e4b',4,'Filtros y proyección','Lectura','¿Qué significa el número 1 que aparece en forma_pago dentro del segundo argumento?',[
['Incluir forma_pago en cada documento mostrado','En la proyección, forma_pago: 1 pide mostrar ese campo.'],
['Seleccionar solo pagos cuyo valor sea el número 1','La selección se define en el primer argumento, no en esta proyección.'],
['Cambiar la forma de pago almacenada a 1','find() lee; la proyección no actualiza el documento almacenado.'],
['Mostrar únicamente una venta','El indicador 1 no limita la cantidad de documentos.']
],0,'El mismo campo: 1 significa cosas distintas según su ubicación: en el filtro compara con 1; en la proyección incluye el campo.','Ubica primero en cuál de los dos argumentos está forma_pago: 1.','db.ventas.find({ forma_pago: "efectivo" }, { factura: 1, forma_pago: 1 })');
add('e5a',5,'Operaciones aritméticas','Código','¿Qué expresión calcula el valor de la línea a partir de los campos precio y cantidad?',[
['{ $multiply: ["$precio", "$cantidad"] }','$multiply multiplica los valores leídos de ambos campos.'],
['{ $add: ["$precio", "$cantidad"] }','Suma precio y cantidad; no calcula el precio de todas las unidades.'],
['{ $multiply: ["precio", "cantidad"] }','Sin $, las cadenas son textos literales y no los valores numéricos de los campos.'],
['{ $divide: ["$precio", "$cantidad"] }','Divide el precio entre la cantidad en lugar de multiplicarlos.']
],0,'Las referencias a campos dentro de expresiones se escriben como "$precio". El valor de línea es precio × cantidad.','Revisa la operación y cómo se leen valores desde el documento.','db.ventas.find({ producto: "frijol kilo" }, { _id: 0, producto: 1, precio: 1, cantidad: 1, valor_linea: EXPRESIÓN })',true);
add('e5b',5,'Operaciones aritméticas','Cálculo','Una venta tiene precio: 8000 y cantidad: 3. ¿Cuál es el valor de la línea antes de otros ajustes?',[
['24.000','8.000 × 3 = 24.000.'],['8.003','8.000 + 3 suma magnitudes distintas; hacen falta tres unidades al precio indicado.'],['8.000','Ese es el precio de una unidad, pero se compraron tres.'],['16.000','16.000 corresponde a dos unidades, no a las tres de la venta.']
],0,'Valor de línea = precio × cantidad = 8.000 × 3 = 24.000. Todavía no se aplica descuento, IVA ni envío.','El precio es unitario y la cantidad indica cuántas unidades se compraron.');
add('e6a',6,'Operaciones aritméticas','Código','Para mostrar ventas con más de una unidad y su valor antes de ajustes, ¿qué consulta cumple?',[
['db.ventas.find(\n { cantidad: { $gt: 1 } },\n { _id: 0, valor_linea: { $multiply: ["$precio", "$cantidad"] } }\n)','$gt: 1 excluye una unidad y $multiply calcula el valor de la línea.'],
['db.ventas.find(\n { cantidad: { $gte: 1 } },\n { _id: 0, valor_linea: { $multiply: ["$precio", "$cantidad"] } }\n)','$gte: 1 también admite una unidad; el enunciado exige más de una.'],
['db.ventas.find(\n { cantidad: { $gt: 1 } },\n { _id: 0, valor_linea: { $add: ["$precio", "$cantidad"] } }\n)','El filtro es apropiado, pero sumar precio y cantidad no calcula el valor de la línea.'],
['db.ventas.find(\n { cantidad: 1 },\n { _id: 0, valor_linea: { $multiply: ["$precio", "$cantidad"] } }\n)','cantidad: 1 selecciona exactamente una unidad, no más de una.']
],0,'$gt significa mayor que y excluye el límite. Antes de descuento, IVA y envío solo se calcula precio × cantidad.','Presta atención a si el límite de una unidad queda incluido.', '',true);
add('e6b',6,'Operaciones aritméticas','Lectura','Tres ventas tienen cantidad 1, 2 y 5. ¿Cuáles pasan este filtro?',[
['Las de cantidad 2 y 5','Ambos valores son estrictamente mayores que 1.'],['Las de cantidad 1, 2 y 5','El valor 1 queda excluido porque $gt no incluye el límite.'],['Solo la de cantidad 1','La igualdad a 1 no satisface mayor que 1.'],['Solo la de cantidad 5','La cantidad 2 también es mayor que 1.']
],0,'$gt: 1 permite 2 y 5, pero no 1. $gte: 1 sí incluiría las tres ventas.','Lee $gt como una desigualdad estricta.','db.ventas.find({ cantidad: { $gt: 1 } })');
add('e7a',7,'Descuentos','Código','descuento guarda porcentajes: 10 significa 10 %. ¿Qué expresión calcula el descuento en dinero de toda la línea?',[
['{ $multiply: [\n  { $multiply: ["$precio", "$cantidad"] },\n  { $divide: ["$descuento", 100] }\n] }','Multiplica el valor de toda la línea por la fracción del descuento.'],
['{ $multiply: ["$precio", "$cantidad", "$descuento"] }','No divide el porcentaje entre 100 y produce un descuento cien veces mayor.'],
['{ $divide: ["$descuento", 100] }','Solo convierte el porcentaje en fracción; falta multiplicarlo por el valor de la línea.'],
['{ $subtract: [\n  { $multiply: ["$precio", "$cantidad"] },\n  "$descuento"\n] }','Resta un porcentaje como si fuera dinero y tampoco devuelve el importe del descuento.']
],0,'Descuento en dinero = (precio × cantidad) × (descuento / 100). El filtro para ventas con descuento positivo es { descuento: { $gt: 0 } }.','Primero convierte el porcentaje guardado en una fracción.', '',true);
add('e7b',7,'Descuentos','Cálculo','precio: 12000, cantidad: 5 y descuento: 10. ¿Cuánto dinero se descuenta de la línea?',[
['6.000','12.000 × 5 = 60.000; 60.000 × 10 / 100 = 6.000.'],['600.000','Multiplicar 60.000 por 10 sin dividir entre 100 confunde porcentaje y factor.'],['1.200','Ese es el descuento de una sola unidad; la línea contiene cinco.'],['54.000','Ese es el valor restante después del descuento; se pregunta cuánto se descuenta.']
],0,'Línea: 60.000. Descuento: 60.000 × 0,10 = 6.000. Base después del descuento: 54.000.','Distingue el dinero que se resta del dinero que queda por pagar.');
add('e8a',8,'Descuentos','Cálculo','Una línea vale 50.000 y tiene un descuento del 20 %. ¿Cuál es su valor después del descuento y antes de IVA?',[
['40.000','El descuento es 50.000 × 20 / 100 = 10.000; quedan 40.000.'],['10.000','Ese es el dinero descontado, no el valor que queda por pagar.'],['49.980','El 20 expresa un porcentaje; no se restan 20 unidades monetarias.'],['60.000','Sumar el descuento aumenta el valor; el descuento se resta.']
],0,'Primero se obtiene el descuento en dinero y después se resta: 50.000 − 10.000 = 40.000.','Calcula el 20 % y decide si ese importe aumenta o reduce el valor.');
add('e8b',8,'Descuentos','Código','¿Qué expresión calcula precio × cantidad menos su descuento porcentual?',[
['{ $subtract: [\n { $multiply: ["$precio", "$cantidad"] },\n { $multiply: ["$precio", "$cantidad", { $divide: ["$descuento", 100] }] }\n] }','Resta al valor de la línea el descuento monetario calculado sobre esa misma línea.'],
['{ $subtract: [\n { $multiply: ["$precio", "$cantidad", { $divide: ["$descuento", 100] }] },\n { $multiply: ["$precio", "$cantidad"] }\n] }','Invierte la resta: descuento menos valor de línea, lo que no representa el saldo.'],
['{ $add: [\n { $multiply: ["$precio", "$cantidad"] },\n { $multiply: ["$precio", "$cantidad", { $divide: ["$descuento", 100] }] }\n] }','Suma el descuento al valor de la línea en lugar de restarlo.'],
['{ $subtract: [\n { $multiply: ["$precio", "$cantidad"] },\n "$descuento"\n] }','El campo descuento contiene un porcentaje y debe convertirse primero a dinero.']
],0,'$subtract recibe [valor inicial, importe que se resta]. Para este ejercicio se muestra además descuento: 1 en la proyección.','En una resta, el orden de los dos argumentos cambia el resultado.', '',true);
add('e9a',9,'IVA y totales','Código','El campo descuento siempre existe y es numérico. ¿Qué filtro selecciona ventas sin descuento para calcular su IVA?',[
['{ descuento: 0 }','Selecciona documentos cuyo porcentaje de descuento es exactamente cero.'],
['{ descuento: { $gt: 0 } }','Selecciona ventas con descuento positivo.'],
['{ iva: 0 }','Selecciona un IVA de cero; no indica que no haya descuento.'],
['{ descuento: 1 }','En el filtro selecciona un descuento del 1 %, no la ausencia de descuento.']
],0,'Sin descuento equivale a descuento: 0 en el escenario del taller. El IVA de esa línea es (precio × cantidad) × (iva / 100).','La condición se refiere al descuento, no al impuesto.', '',true);
add('e9b',9,'IVA y totales','Cálculo','precio: 10000, cantidad: 2, descuento: 0 e iva: 19. ¿Cuál es únicamente el valor del IVA de la línea?',[
['3.800','10.000 × 2 = 20.000; el 19 % de 20.000 es 3.800.'],['23.800','Ese es el total con IVA incluido; se pregunta solo por el impuesto.'],['1.900','Es el IVA de una unidad, pero la línea contiene dos.'],['380.000','Es 20.000 × 19 sin convertir el porcentaje a fracción.']
],0,'Valor de línea: 20.000. IVA: 20.000 × 19 / 100 = 3.800. El total, si se pidiera, sería 23.800.','Distingue impuesto y total con impuesto.');
add('e10a',10,'IVA y totales','Código','Para una línea sin descuento ni envío, ¿qué expresión calcula el total con IVA?',[
['{ $add: [\n { $multiply: ["$precio", "$cantidad"] },\n { $multiply: ["$precio", "$cantidad", { $divide: ["$iva", 100] }] }\n] }','Suma el valor de la línea y su IVA en dinero.'],
['{ $multiply: ["$precio", "$cantidad", { $divide: ["$iva", 100] }] }','Calcula únicamente el impuesto, sin sumar el valor de los productos.'],
['{ $add: [\n { $multiply: ["$precio", "$cantidad"] },\n "$iva"\n] }','Añade el número del porcentaje como dinero, en vez de calcular el impuesto.'],
['{ $subtract: [\n { $multiply: ["$precio", "$cantidad"] },\n { $multiply: ["$precio", "$cantidad", { $divide: ["$iva", 100] }] }\n] }','Resta el impuesto; el total con IVA requiere sumarlo.']
],0,'Total sin descuento = valor de línea + IVA en dinero. En el ejercicio 10 se filtra por la categoría solicitada; aquí se supone descuento: 0.','El total debe contener el valor de los productos y el impuesto.', '',true);
add('e10b',10,'IVA y totales','Cálculo','En la categoría "granos", una venta tiene precio: 20000, cantidad: 3, descuento: 0 e iva: 5. Sin envío, ¿cuál es su total con IVA?',[
['63.000','Línea: 60.000. IVA: 3.000. Total: 63.000.'],['3.000','Es únicamente el IVA de la línea.'],['60.005','Suma 5 como dinero; el impuesto es el 5 % de 60.000.'],['57.000','Resta el IVA al valor de la línea, pero debe sumarlo.']
],0,'20.000 × 3 = 60.000; 60.000 × 5 / 100 = 3.000; total = 60.000 + 3.000 = 63.000. El porcentaje de este caso es un dato del ejercicio.','Obtén primero el valor de las tres unidades.');
add('e11a',11,'Descuentos','Teoría','Según el taller, ¿qué representa la base gravable cuando hay descuento?',[
['El valor de la línea menos el descuento en dinero','Es el importe sobre el cual se calcula el IVA después del descuento.'],
['El valor de la línea más el IVA','Eso corresponde a un total con impuesto, no a la base previa al IVA.'],
['El porcentaje de descuento dividido entre 100','Eso es la tasa decimal del descuento, no una base monetaria.'],
['El valor de la línea más el costo de envío','El taller suma el envío al final, después de calcular descuento e IVA.']
],0,'Base gravable = precio × cantidad − descuento en dinero. En este taller, el IVA se calcula sobre esa base y el envío se añade al final.','La base es un importe en dinero anterior al cálculo del impuesto.');
add('e11b',11,'Descuentos','Cálculo','precio: 15000, cantidad: 4 y descuento: 25. ¿Cuál es la base gravable de la línea?',[
['45.000','Línea: 60.000. Descuento: 15.000. Base: 45.000.'],['15.000','Es el descuento monetario, no la base que queda.'],['59.975','Resta 25 unidades monetarias, pero 25 representa un porcentaje.'],['60.000','Es el valor antes de aplicar el descuento.']
],0,'15.000 × 4 = 60.000. Descuento: 60.000 × 25 / 100 = 15.000. Base gravable: 60.000 − 15.000 = 45.000.','Separa el cálculo del descuento y la resta posterior.');
add('e12a',12,'IVA y totales','Código','¿Qué expresión calcula el IVA de la línea después del descuento, usando solo campos originales?',[
['{ $multiply: [\n { $subtract: [\n  { $multiply: ["$precio", "$cantidad"] },\n  { $multiply: ["$precio", "$cantidad", { $divide: ["$descuento", 100] }] }\n ] },\n { $divide: ["$iva", 100] }\n] }','Calcula la base después del descuento y después le aplica la tasa del IVA.'],
['{ $multiply: ["$precio", "$cantidad", { $divide: ["$iva", 100] }] }','Calcula el IVA sobre el valor bruto e ignora el descuento.'],
['{ $multiply: [\n { $subtract: [ { $multiply: ["$precio", "$cantidad"] }, "$descuento" ] },\n { $divide: ["$iva", 100] }\n] }','Resta el número del porcentaje como dinero; no calcula el descuento monetario.'],
['{ $multiply: [\n { $subtract: [\n  { $multiply: ["$precio", "$cantidad"] },\n  { $multiply: ["$precio", "$cantidad", { $divide: ["$descuento", 100] }] }\n ] },\n "$iva"\n] }','La base es correcta, pero falta dividir iva entre 100.']
],0,'IVA = [(precio × cantidad) − (precio × cantidad × descuento / 100)] × iva / 100. El ejercicio 12 aplica el filtro del cliente solicitado.','Resuelve la base gravable dentro de la expresión antes de aplicar la tasa.', '',true);
add('e12b',12,'IVA y totales','Cálculo','Una venta de Ana tiene precio: 10000, cantidad: 10, descuento: 10 e iva: 19. ¿Cuál es su IVA después del descuento?',[
['17.100','La base es 100.000 − 10.000 = 90.000; 90.000 × 19 / 100 = 17.100.'],['19.000','Aplica el IVA a los 100.000 originales sin descontar.'],['107.100','Es la base más el IVA; se solicita solo el impuesto.'],['1.710','Es diez veces menor que el IVA correcto de la línea completa.']
],0,'Línea: 100.000. Descuento: 10.000. Base: 90.000. IVA: 17.100. Los valores se calculan por línea, aunque un cliente tenga varias ventas.','El impuesto se calcula sobre lo que queda después del descuento.');
add('e13a',13,'IVA y totales','Cálculo','Una línea tiene precio: 20000, cantidad: 2, descuento: 10 e iva: 19. Sin envío, ¿qué resultado es correcto?',[
['Línea 40.000; descuento 4.000; base 36.000; IVA 6.840; total 42.840','40.000 × 10 % = 4.000; la base de 36.000 produce un IVA de 6.840.'],
['Línea 40.000; descuento 4.000; base 36.000; IVA 7.600; total 43.600','El IVA de 7.600 se calcula sobre 40.000, antes del descuento.'],
['Línea 40.000; descuento 10; base 39.990; IVA 7.598,10; total 47.588,10','Interpreta el porcentaje 10 como si fueran 10 unidades monetarias de descuento.'],
['Línea 40.000; descuento 4.000; base 36.000; IVA 6.840; total 29.160','El último paso resta 6.840; el IVA debe sumarse a la base.']
],0,'20.000 × 2 = 40.000 → descuento 4.000 → base 36.000 → IVA 6.840 → total 42.840. Cada paso usa la base correspondiente.','Verifica especialmente sobre qué importe se calcula el IVA.');
add('e13b',13,'IVA y totales','Teoría','Una factura tiene dos líneas. Una proyección de find() calcula total_final con los campos de cada documento. ¿Qué se obtiene?',[
['Un total calculado por cada línea seleccionada','Cada expresión de la proyección se evalúa sobre el documento de esa línea.'],
['Un único total que suma las dos líneas','La proyección por documento no suma los resultados entre documentos.'],
['Una actualización de los totales guardados en la colección','find() no escribe esos campos calculados en la colección.'],
['El total de todas las facturas existentes','El filtro limita las líneas y la proyección no acumula valores entre facturas.']
],0,'El PDF pide resultados por línea y prohíbe agrupaciones y acumuladores. El total proyectado pertenece a cada documento seleccionado.','Distingue calcular dentro de un documento de reunir datos de varios.');
add('e14a',14,'Envío y valor unitario','Cálculo','Una línea vale 100.000, tiene 10 % de descuento, 19 % de IVA y costo_envio: 5000. Siguiendo el taller, ¿cuál es el total final?',[
['112.100','Base: 90.000; IVA: 17.100; total: 90.000 + 17.100 + 5.000 = 112.100.'],
['113.050','Incluye el envío en la base del IVA; el taller pide sumarlo después del impuesto.'],
['107.100','Es el total antes de añadir los 5.000 del envío.'],
['124.000','Suma el IVA al valor sin descuento y luego el envío; omite descontar los 10.000.']
],0,'Según el orden del taller: 100.000 − 10.000 = 90.000; IVA = 17.100; total = 90.000 + 17.100 + 5.000 = 112.100. El envío de este ejercicio se suma una vez a la línea.','Ubica el costo de envío en el último paso.');
add('e14b',14,'Envío y valor unitario','Lectura','Las líneas A, B y C tienen costo_envio de 0, 3000 y 5000. ¿Cuáles selecciona la consulta?',[
['B y C','3.000 y 5.000 son mayores que cero.'],['A, B y C','A tiene envío cero y no cumple la desigualdad estricta.'],['Solo A','El filtro pide un valor positivo, no cero.'],['Solo C','3.000 también cumple ser mayor que cero.']
],0,'{ costo_envio: { $gt: 0 } } selecciona líneas con costo de envío positivo. Luego se puede proyectar el total de cada línea añadiendo ese campo.','El filtro establece un mínimo exclusivo; no busca el envío más caro.','db.ventas.find({ costo_envio: { $gt: 0 } })');
add('e15a',15,'Envío y valor unitario','Cálculo','precio: 10000, cantidad: 2, descuento: 10, iva: 19 y costo_envio: 2000. ¿Cuál es el valor unitario final, incluido el envío?',[
['11.710','Línea 20.000; descuento 2.000; base 18.000; IVA 3.420; total 23.420; 23.420 / 2 = 11.710.'],
['10.710','Es el unitario con descuento e IVA, pero sin repartir el envío.'],
['23.420','Es el total de la línea; falta dividirlo entre las dos unidades.'],
['12.710','Añade los 2.000 completos de envío a cada unidad en vez de dividir el envío entre dos.']
],0,'Total de línea = 18.000 + 3.420 + 2.000 = 23.420. Valor unitario final = 23.420 / 2 = 11.710.','El total incluye el envío y después se reparte entre todas las unidades.');
add('e15b',15,'Envío y valor unitario','Teoría','Ya calculaste un total por línea de 48.000 que incluye descuento, IVA y envío. La cantidad es 4. ¿Qué operación obtiene el valor unitario final?',[
['Dividir 48.000 entre 4: 12.000','Distribuye el total de la línea entre sus cuatro unidades.'],
['Multiplicar 48.000 por 4: 192.000','48.000 ya es el total de las cuatro unidades; multiplicarlo vuelve a contar la cantidad.'],
['Dividir 4 entre 48.000: 1/12.000','Invierte el dividendo y el divisor; no produce el precio por unidad.'],
['Restar 4 a 48.000: 47.996','La cantidad de unidades se usa como divisor, no como descuento monetario.']
],0,'$divide recibe primero el dividendo y luego el divisor. Para repartir un total entre unidades se usa total / cantidad.','La operación debe conservar el total si luego multiplicas el resultado por cuatro.');
add('e16a',16,'Revisión integral','Código','Para revisar únicamente las líneas de la factura "F-205" que estén en estado "pagado", ¿qué filtro cumple ambas condiciones?',[
['{ factura: "F-205", estado: "pagado" }','Los dos campos en el mismo filtro exigen simultáneamente esa factura y ese estado.'],
['{ $or: [ { factura: "F-205" }, { estado: "pagado" } ] }','Admite cualquier venta pagada, aunque sea de otra factura, y líneas de F-205 que no estén pagadas.'],
['{ factura: "F-205" }','Filtra la factura, pero no verifica que el estado sea pagado.'],
['{ estado: "pagado" }','Filtra ventas pagadas de todas las facturas, no solo F-205.']
],0,'Escribir factura y estado en el mismo documento de filtro aplica un AND implícito. Deben cumplirse las dos condiciones a la vez.','Una línea solo debe entrar si coincide tanto la factura como el estado.', '',true);
add('e16b',16,'Revisión integral','Depuración','El documento original no tiene valor_linea. ¿Por qué esta proyección no calcula correctamente base_gravable?',[
['"$valor_linea" busca un campo del documento original, no el alias creado al lado','Los campos hermanos de una proyección no se evalúan como asignaciones sucesivas.'],
['find() siempre prohíbe las expresiones aritméticas en la proyección','La proyección de find() sí admite expresiones aritméticas en versiones que soportan proyecciones calculadas.'],
['$subtract requiere tres argumentos en su arreglo','$subtract utiliza exactamente dos argumentos: valor inicial y valor que se resta.'],
['_id: 0 elimina físicamente el identificador de la colección','La proyección solo modifica la salida de la consulta, no el documento guardado.']
],0,'Debe repetirse { $multiply: ["$precio", "$cantidad"] } donde aparece "$valor_linea". No se puede usar un alias hermano recién calculado como si ya estuviera almacenado. Se mantiene una consulta find() con expresiones anidadas.','Las expresiones leen el documento de entrada; el orden de escritura de los campos no crea pasos sucesivos.','db.ventas.find(\n { factura: "F-205", estado: "pagado" },\n {\n  _id: 0,\n  valor_linea: { $multiply: ["$precio", "$cantidad"] },\n  base_gravable: { $subtract: [\n   "$valor_linea",\n   { $multiply: ["$precio", "$cantidad", { $divide: ["$descuento", 100] }] }\n  ] }\n }\n)');
export default bank;
