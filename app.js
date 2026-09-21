import bank from './questions.js';
import extra from './extra-questions.js';
import { createSession, shuffle, score } from './engine.js';

const root = document.querySelector('#app');
const letters = ['A','B','C','D'];
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const allQuestions = [...bank, ...extra];
const defaultConfig = {source:'Todo', topic:'Todos', count:'20'};
let state = { mode: 'practice', config:{...defaultConfig}, draft:{...defaultConfig}, questions: createSession(allQuestions,defaultConfig), index: 0, selections: {}, answers: {}, finished: false, onlyErrors: false, retry: false };
const current = () => state.questions[state.index];
const optionText = (q, option) => q.code ? `<pre>${esc(option.text)}</pre>` : esc(option.text);
const context = q => q.context ? `<div class="context"><span class="context-label">${q.context.startsWith('db.') ? 'CONSULTA PARA ANALIZAR' : 'CONTEXTO DEL EJERCICIO'}</span><pre>${esc(q.context)}</pre></div>` : '';
const source = () => `<div class="sourcebox"><details><summary>Material incluido</summary><p>Banco de ${allQuestions.length} preguntas elaborado a partir de los cinco PDF de clase:</p><p>• Generalidades e historia de las BDNR<br>• BD no relacionales · Generalidades<br>• Consultas básicas en Mongo · 50 ejemplos<br>• Mongo · 20 ejercicios de operadores lógicos<br>• Taller de facturación · 16 ejercicios find()</p><p>Los ejemplos de los documentos se convirtieron en preguntas de única respuesta. Los datos numéricos de facturación son casos de práctica para aplicar las fórmulas.</p><p>En facturación, cada documento representa una línea; descuento e iva guardan porcentajes: 10 significa 10 %.</p><a href="https://www.mongodb.com/docs/manual/reference/method/db.collection.find/" target="_blank" rel="noopener noreferrer">Referencia adicional: find() · MongoDB</a></details></div>`;
const optionTags = values => values.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join('');
function availableTopics(sourceValue){return [...new Set(allQuestions.filter(q=>sourceValue==='Todo'||q.source===sourceValue).map(q=>q.topic))].sort((a,b)=>a.localeCompare(b,'es'));}
function sessionBuilder(){
 const sources=['Todo',...new Set(allQuestions.map(q=>q.source))];
 const topics=availableTopics(state.draft.source);
 const pool=allQuestions.filter(q=>(state.draft.source==='Todo'||q.source===state.draft.source)&&(state.draft.topic==='Todos'||q.topic===state.draft.topic));
 return `<div class="sidebox builder"><h3>Arma tu sesión</h3><label>Material<select id="source-select">${optionTags(sources)}</select></label><label>Tema<select id="topic-select">${optionTags(['Todos',...topics])}</select></label><label>Cantidad<select id="count-select"><option value="20">20 preguntas</option><option value="50">50 preguntas</option><option value="all">Todas las disponibles</option></select></label><p class="available">${pool.length} preguntas disponibles con este filtro</p><button data-action="build" class="primary full">Comenzar nueva sesión</button></div>`;
}
function syncBuilder(){
 const s=document.querySelector('#source-select'),t=document.querySelector('#topic-select'),c=document.querySelector('#count-select');
 if(s)s.value=state.draft.source;if(t)t.value=state.draft.topic;if(c)c.value=state.draft.count;
}

function heading(results = false) {
  return `<div class="heading"><div><p class="eyebrow">${results ? 'SESIÓN COMPLETADA' : state.retry ? 'REPASO DE ERRORES' : 'PREPARACIÓN PARA EL EXAMEN'}</p><h1>${results ? 'Así te fue' : 'MongoDB: teoría y práctica'}</h1><p class="subtitle">${results ? 'Revisa el razonamiento y vuelve a intentar lo que necesitas reforzar.' : 'Generalidades de NoSQL, consultas, operadores y ejercicios de facturación.'}</p></div>${results ? '' : `<div class="modes" role="group" aria-label="Modo de estudio"><button data-action="mode" data-mode="practice" class="${state.mode === 'practice' ? 'active' : ''}" aria-pressed="${state.mode === 'practice'}">Práctica guiada</button><button data-action="mode" data-mode="exam" class="${state.mode === 'exam' ? 'active' : ''}" aria-pressed="${state.mode === 'exam'}">Simulacro</button></div>`}</div>`;
}

function sidebar() {
  const answered = Object.keys(state.answers).length;
  return `<aside class="side" aria-label="Progreso de la sesión"><div class="sidebox"><h3>Tu recorrido</h3><div class="session-meta"><span>${answered} de ${state.questions.length}</span><span>${state.mode === 'practice' ? 'confirmadas' : 'respondidas'}</span></div><div class="progress" role="progressbar" aria-label="Respuestas registradas" aria-valuemin="0" aria-valuemax="${state.questions.length}" aria-valuenow="${answered}"><div style="width:${answered/state.questions.length*100}%"></div></div><nav class="question-grid" aria-label="Ir a una pregunta">${state.questions.map((q,i) => {
    const a = state.answers[q.id];
    const status = a == null ? '' : state.mode === 'exam' ? 'answered' : a === q.correct ? 'right' : 'wrong';
    const label = a == null ? 'sin responder' : state.mode === 'exam' ? 'respondida' : a === q.correct ? 'correcta' : 'incorrecta';
    return `<button data-action="jump" data-index="${i}" class="${status} ${i === state.index ? 'current' : ''}" ${i===state.index ? 'aria-current="step"' : ''} aria-label="Pregunta ${i+1}, ${label}">${i+1}</button>`;
  }).join('')}</nav><div class="legend">${state.mode === 'practice' ? '<span class="right">Correcta</span><span class="wrong">Por reforzar</span>' : '<span class="done">Respondida</span>'}<span>Pendiente</span></div><button data-action="finish" class="secondary full">Finalizar y calificar</button></div>${sessionBuilder()}<div class="sidebox"><h3>${state.mode === 'practice' ? 'Aprende con cada respuesta' : 'Como en el examen escrito'}</h3><p class="mode-note">${state.mode === 'practice' ? 'Confirma tu elección para ver la explicación. Cada pregunta cuenta una vez; podrás repetir los errores al terminar.' : 'Una sola respuesta por pregunta. Puedes cambiarla antes de finalizar. La calificación y las explicaciones aparecerán al terminar.'}</p></div>${source()}</aside>`;
}

function renderQuestion(focusTitle = false, focusId = '') {
  const q = current();
  const answer = state.answers[q.id];
  const locked = state.mode === 'practice' && answer != null;
  const selected = state.selections[q.id];
  const good = locked && answer === q.correct;
  const chosenOption = q.options.find(o => o.id === answer);
  const correctOption = q.options.find(o => o.id === q.correct);
  const correctLetter = letters[q.options.findIndex(o => o.id === q.correct)];
  const itemRef=q.exercise ? ` · Ejercicio ${q.exercise}` : '';
  root.innerHTML = heading() + `<div class="workspace"><section class="question-card" aria-labelledby="question-title"><div class="card-bar"><div class="qcounter">Pregunta ${String(state.index+1).padStart(2,'0')} <span>/ ${state.questions.length}</span></div><span class="badge">${esc(q.kind)}${esc(itemRef)}</span></div><div class="question-body"><span class="topic">${esc(q.source)} · ${esc(q.topic)}</span><h2 id="question-title" tabindex="-1">${esc(q.prompt)}</h2>${context(q)}<p class="help-label">Selecciona una única respuesta.</p><fieldset class="options"><legend class="sr-only">Opciones de respuesta</legend>${q.options.map((o,i) => `<label class="option ${locked ? 'locked' : ''} ${locked && o.id === q.correct ? 'correct' : ''} ${locked && o.id === answer && !good ? 'wrong' : ''}" for="option-${o.id}"><input type="radio" id="option-${o.id}" name="answer" value="${o.id}" ${selected===o.id ? 'checked' : ''} ${locked ? 'disabled' : ''}><span class="letter" aria-hidden="true">${letters[i]}</span><span class="sr-only">Opción ${letters[i]}: </span><span class="option-text">${optionText(q,o)}${locked && (o.id === q.correct || o.id === answer) ? `<span class="option-status">${o.id === q.correct ? (good ? 'Tu respuesta · Correcta' : 'Respuesta correcta') : 'Tu respuesta'}</span>` : ''}</span></label>`).join('')}</fieldset>${locked ? `<div class="feedback ${good ? '' : 'error'}" role="status"><h3>${good ? '✓ Bien resuelto' : 'Vamos a revisar esa respuesta'}</h3><p>${esc(chosenOption.feedback)}</p>${!good ? `<p><strong>La respuesta correcta es ${correctLetter}.</strong></p>` : ''}<p>${esc(q.explanation)}</p></div>` : state.mode === 'practice' ? `<details class="hint"><summary>Necesito una pista</summary><p>${esc(q.hint)}</p></details>` : ''}</div><div class="card-footer"><button data-action="previous" class="quiet" ${state.index === 0 ? 'disabled' : ''}>← Anterior</button><div class="actions">${state.mode === 'practice' && !locked ? `<button data-action="next" class="secondary">${state.index === state.questions.length-1 ? 'Finalizar' : 'Saltar por ahora'}</button><button data-action="check" class="primary" ${selected==null ? 'disabled' : ''}>Comprobar respuesta</button>` : `<button data-action="next" class="primary">${state.index===state.questions.length-1 ? 'Ver resultados' : 'Siguiente pregunta →'}</button>`}</div></div></section>${sidebar()}</div><p class="footnote">${allQuestions.length} preguntas disponibles · Selección múltiple con única respuesta · Sin límite de tiempo</p>`;
  syncBuilder();
  if (focusTitle) document.querySelector('#question-title').focus({preventScroll:true});
  if (focusId) document.getElementById(focusId)?.focus({preventScroll:true});
}

function reviewItem(q,i) {
  const a = state.answers[q.id];
  const good = a === q.correct;
  const selected = q.options.find(o => o.id === a);
  const correct = q.options.find(o => o.id === q.correct);
  const chosenLetter = letters[q.options.findIndex(o => o.id === a)];
  const correctLetter = letters[q.options.findIndex(o => o.id === q.correct)];
  return `<details class="review-item" ${!good ? 'open' : ''}><summary><span class="review-icon ${good ? '' : 'bad'}" aria-label="${good ? 'Correcta' : a == null ? 'Sin responder' : 'Incorrecta'}">${good ? '✓' : a == null ? '–' : '×'}</span><span class="review-title">${i+1}. ${esc(q.prompt)}<small>${esc(q.source)} · ${esc(q.topic)}${q.exercise ? ` · Ejercicio ${esc(q.exercise)}` : ''}</small></span></summary><div class="review-body">${context(q)}<div class="review-answer ${good ? '' : 'bad'}"><small>${selected ? `TU RESPUESTA · ${chosenLetter}` : 'SIN RESPUESTA REGISTRADA'}</small>${selected ? optionText(q,selected) : '<p>Esta pregunta cuenta como cero puntos. En práctica hay que confirmar la elección antes de finalizar.</p>'}</div>${selected ? `<p>${esc(selected.feedback)}</p>` : ''}${!good ? `<div class="review-answer"><small>RESPUESTA CORRECTA · ${correctLetter}</small>${optionText(q,correct)}</div>` : ''}<p><strong>Cómo resolverlo:</strong> ${esc(q.explanation)}</p><details class="hint"><summary>Ver explicación de las cuatro opciones</summary>${q.options.map((o,j) => `<p><strong>${letters[j]}.</strong> ${esc(o.feedback)}</p>`).join('')}</details></div></details>`;
}

function renderResults(focusTitle = false) {
  const result = score(state.questions,state.answers);
  const groups = [...new Set(state.questions.map(q=>q.topic))].map(topic => {
    const qs = state.questions.filter(q=>q.topic === topic);
    return {topic,...score(qs,state.answers)};
  });
  const errors = state.questions.filter(q=>state.answers[q.id] !== q.correct);
  root.innerHTML = heading(true) + `<div class="results-top"><div class="score-big"><strong>${result.percent}%</strong><span>${result.correct} de ${result.total} correctas</span></div><div class="result-intro"><h2 id="result-title" tabindex="-1">${result.correct===result.total ? '¡Todas correctas!' : result.percent>=70 ? 'Vas por buen camino' : 'Ya sabes qué necesitas repasar'}</h2><p>${result.correct===result.total ? 'Prueba otra sesión para resolver más preguntas del banco.' : 'Abajo encontrarás tu elección, la respuesta correcta y una explicación de cada paso.'}</p><div class="stats"><div><strong>${result.grade.replace('.',',')} <span style="font-size:15px">/ 5</span></strong>Nota de práctica</div><div><strong>${result.wrong}</strong>Incorrectas</div><div><strong>${result.unanswered}</strong>Sin responder</div></div><div class="actions">${errors.length ? '<button data-action="retry" class="primary">Practicar mis errores</button>' : ''}<button data-action="restart" class="secondary">Nueva sesión</button></div></div></div><div class="workspace"><section><div class="review-head"><h2>Revisa tus respuestas</h2><label class="review-filter"><input id="error-filter" type="checkbox" ${state.onlyErrors ? 'checked' : ''}>Solo errores y pendientes</label></div><div class="review-list">${state.questions.map((q,i) => state.onlyErrors && state.answers[q.id]===q.correct ? '' : reviewItem(q,i)).join('') || '<div class="empty">No tienes errores ni preguntas pendientes en esta sesión.</div>'}</div></section><aside class="side"><div class="sidebox"><h3>Resultado por tema</h3><ul class="topic-results">${groups.map(g=>`<li><div><span>${esc(g.topic)}</span><strong>${g.correct}/${g.total}</strong></div><div class="progress"><div style="width:${g.percent}%"></div></div></li>`).join('')}</ul></div><div class="sidebox"><h3>Cómo se calcula</h3><p class="mode-note">Cada acierto vale un punto. Las respuestas incorrectas y pendientes valen cero. Nota de práctica = aciertos ÷ preguntas × 5. No representa la escala oficial del docente.</p></div>${source()}</aside></div>`;
  if (focusTitle) document.querySelector('#result-title').focus({preventScroll:true});
}

async function confirmAction(title, description, label) {
  const dialog = document.querySelector('#confirm-dialog');
  document.querySelector('#confirm-title').textContent=title;
  document.querySelector('#confirm-description').textContent=description;
  dialog.querySelector('[value="confirm"]').textContent=label;
  dialog.returnValue='cancel';
  dialog.showModal();
  return new Promise(resolve=>dialog.addEventListener('close',()=>resolve(dialog.returnValue==='confirm'),{once:true}));
}
function move(index) {
  state.index = Math.max(0,Math.min(state.questions.length-1,index));
  renderQuestion(true);
  window.scrollTo({top:0,behavior:'instant'});
}
async function finish() {
  const pending = score(state.questions,state.answers).unanswered;
  if (pending && !await confirmAction('¿Finalizar con preguntas pendientes?', `Quedan ${pending} de ${state.questions.length} sin ${state.mode==='practice' ? 'confirmar' : 'responder'}. Contarán como cero puntos. Puedes volver a ellas antes de calificar.`, 'Finalizar y calificar')) return;
  state.finished = true;
  renderResults(true);
  window.scrollTo({top:0,behavior:'instant'});
}
function restart(mode = state.mode, errors = null, config = state.config) {
  const nextConfig={...config};
  state={mode, config:nextConfig, draft:{...nextConfig}, questions: errors ? shuffle(errors).map(q=>({...q,options:shuffle(q.options)})) : createSession(allQuestions,nextConfig), index:0, selections:{},answers:{},finished:false,onlyErrors:false,retry:!!errors};
  renderQuestion(true);
  window.scrollTo({top:0,behavior:'instant'});
}
root.addEventListener('change', e=> {
  if (e.target.name==='answer' && !state.finished) {
    const q=current();
    if (state.mode==='practice' && state.answers[q.id]!=null) return;
    state.selections[q.id]=e.target.value;
    if(state.mode==='exam') state.answers[q.id]=e.target.value;
    renderQuestion(false,e.target.id);
  }
  if(e.target.id==='source-select') {
    state.draft.source=e.target.value;state.draft.topic='Todos';
    const t=document.querySelector('#topic-select');t.innerHTML=optionTags(['Todos',...availableTopics(state.draft.source)]);t.value='Todos';
    const pool=allQuestions.filter(q=>state.draft.source==='Todo'||q.source===state.draft.source);document.querySelector('.available').textContent=`${pool.length} preguntas disponibles con este filtro`;
  }
  if(e.target.id==='topic-select') {
    state.draft.topic=e.target.value;const pool=allQuestions.filter(q=>(state.draft.source==='Todo'||q.source===state.draft.source)&&(state.draft.topic==='Todos'||q.topic===state.draft.topic));document.querySelector('.available').textContent=`${pool.length} preguntas disponibles con este filtro`;
  }
  if(e.target.id==='count-select') state.draft.count=e.target.value;
  if(e.target.id==='error-filter') {state.onlyErrors=e.target.checked;renderResults();document.querySelector('#error-filter').focus({preventScroll:true});}
});
root.addEventListener('click', async e=> {
  const button=e.target.closest('button[data-action]');
  if(!button || button.disabled) return;
  const action=button.dataset.action;
  if(action==='check') {
    const q=current();
    if(state.answers[q.id]!=null || state.selections[q.id]==null) return;
    state.answers[q.id]=state.selections[q.id];
    renderQuestion();
    const feedback=document.querySelector('.feedback');
    feedback.tabIndex=-1;feedback.focus({preventScroll:true});feedback.scrollIntoView({block:'nearest'});
  }
  else if(action==='next') {if(state.index===state.questions.length-1) await finish();else move(state.index+1);}
  else if(action==='previous') move(state.index-1);
  else if(action==='jump') move(Number(button.dataset.index));
  else if(action==='finish') await finish();
  else if(action==='mode' && button.dataset.mode!==state.mode) {
    if(Object.keys(state.selections).length && !await confirmAction('¿Cambiar de modo?', 'Empezará una nueva sesión y se descartarán las respuestas de esta sesión.', 'Cambiar de modo')) return;
    restart(button.dataset.mode);
  }
  else if(action==='restart') restart();
  else if(action==='retry') restart('practice',state.questions.filter(q=>state.answers[q.id]!==q.correct));
  else if(action==='build') {
    if(Object.keys(state.selections).length && !await confirmAction('¿Comenzar una nueva sesión?', 'Se descartarán las respuestas de la sesión actual y se aplicarán los filtros seleccionados.', 'Comenzar')) return;
    restart(state.mode,null,state.draft);
  }
});
renderQuestion();
