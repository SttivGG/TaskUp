export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function createSession(bank, settings = {}, random = Math.random) {
  if (typeof settings === 'function') { random = settings; settings = {}; }
  let pool = bank.filter(q => (settings.source == null || settings.source === 'Todo' || q.source === settings.source) &&
    (settings.topic == null || settings.topic === 'Todos' || q.topic === settings.topic));
  const count = settings.count === 'all' || settings.count == null ? pool.length : Math.min(Number(settings.count), pool.length);
  return shuffle(pool, random).slice(0, count).map(q => ({ ...q, options: shuffle(q.options, random) }));
}
export function score(questions, answers) {
  const correct = questions.filter(q => answers[q.id] === q.correct).length;
  const unanswered = questions.filter(q => answers[q.id] == null).length;
  return { correct, unanswered, wrong: questions.length - correct - unanswered, total: questions.length,
    percent: questions.length ? Math.round(correct / questions.length * 100) : 0,
    grade: questions.length ? (5 * correct / questions.length).toFixed(2) : '0.00' };
}
