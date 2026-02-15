const MESAS = [
  { mesa: 1, grupo: ["Familia Ocampo", "Familia Limas"], personas: 9 },
  { mesa: 2, grupo: ["Amigos"], personas: 15, nota: "Mesa compartida con Mesa 3 (15 amigos)." },
  { mesa: 3, grupo: ["Amigos"], personas: 15, nota: "Mesa compartida con Mesa 2 (15 amigos)." },
  { mesa: 4, grupo: ["Carlos","Deisy","Daniel","Carmen","Blanca","Jose","Paola","Wally","David","Luz"], personas: 10 },
  { mesa: 5, grupo: ["Familia Arevalo Serrato","Familia Arevalo Bernal","Tio Tavo","Alfonso y Patricia"], personas: 12 },
  { mesa: 6, grupo: ["Familia Sanchez Arevalo","Familia Parra Sanchez","Familia Toloza Sanchez"], personas: 10 },
  { mesa: 7, grupo: ["Rodrigo","Graciela","Elvira","Alfredo","Otilia","Yolanda","Alex","Pilar","Zoraida","Ricardo","Humberto","Blanca"], personas: 12 },
  { mesa: 8, grupo: ["Sandy","David","Stevan","Mirian","Matias","Jose","Jenny","Rocha","Chaparro","Johana"], personas: 12, nota: "Si faltan 2 nombres en esta mesa, se pueden agregar." },
  { mesa: 9, grupo: ["Diego","Andrea","Fm Cayetanos","Juan y esposa"], personas: 9 },
  { mesa: 10, grupo: ["Adela","Rubiela","Giovanny","Yuri","Andres","Vanesa","Stefy","Valentina","Nicolas","Santiago"], personas: 10 },
];

const normalize = (s) =>
  (s || "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

const grid = document.getElementById("grid");
const q = document.getElementById("q");
const clearBtn = document.getElementById("clearBtn");
const count = document.getElementById("count");
const pill = document.getElementById("pill");

function escapeHtml(str) {
  return (str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render(filter = "") {
  const f = normalize(filter);

  const filtered = MESAS.filter((m) => {
    if (!f) return true;
    const inMesa = normalize("mesa " + m.mesa).includes(f);
    const inItems = m.grupo.some((x) => normalize(x).includes(f));
    return inMesa || inItems;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty">
      No se encontró nada con <b>${escapeHtml(filter)}</b>.<br/>
      Prueba con el apellido o con el nombre de la familia.
    </div>`;
  } else {
    grid.innerHTML = filtered
      .map((m) => {
        const items = m.grupo.map((x) => `<li class="item">${escapeHtml(x)}</li>`).join("");
        const nota = m.nota ? `<div class="people" style="margin-top:10px;">${escapeHtml(m.nota)}</div>` : "";
        const persons = m.personas ? `${escapeHtml(String(m.personas))} personas` : "";
        return `
          <article class="card">
            <div class="cardTop">
              <div>
                <h2 class="mesa">Mesa ${m.mesa}</h2>
                <div class="people">Busca tu nombre o familia</div>
              </div>
              <div class="meta">
                <div class="tag">15 AÑOS</div>
                <div class="people">${persons}</div>
              </div>
            </div>
            <ul class="list">${items}</ul>
            ${nota}
          </article>
        `;
      })
      .join("");
  }

  count.textContent = `${filtered.length} mesa${filtered.length === 1 ? "" : "s"}`;
  pill.textContent = f ? `Filtrado por: "${filter}"` : "Mostrando todas las mesas";
}

q.addEventListener("input", () => render(q.value));
clearBtn.addEventListener("click", () => {
  q.value = "";
  q.focus();
  render("");
});

render("");
