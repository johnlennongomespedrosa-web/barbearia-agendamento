const dataInput = document.getElementById("data");
const horarioSelect = document.getElementById("horario");
const form = document.getElementById("agendamentoForm");
const lista = document.getElementById("listaAgendamentos");

const horarios = [
  "09:00", "10:00", "11:00",
  "13:00", "14:00", "15:00",
  "16:00", "17:00"
];

let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

// Bloqueia dias que não são sábado ou domingo
dataInput.addEventListener("change", () => {
  horarioSelect.innerHTML = "<option value=''>Selecione</option>";
  const dia = new Date(dataInput.value).getDay();

  if (dia !== 6 && dia !== 0) {
    alert("Agendamentos apenas aos sábados e domingos!");
    dataInput.value = "";
    return;
  }

  horarios.forEach(h => {
    const ocupado = agendamentos.some(a => a.data === dataInput.value && a.horario === h);
    if (!ocupado) {
      horarioSelect.innerHTML += `<option value="${h}">${h}</option>`;
    }
  });
});

// Enviar agendamento
form.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = dataInput.value;
  const horario = horarioSelect.value;

  agendamentos.push({ nome, data, horario });
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

  alert("Agendamento realizado!");
  form.reset();
  mostrarAgendamentos();
});

function mostrarAgendamentos() {
  lista.innerHTML = "";
  agendamentos.forEach(a => {
    lista.innerHTML += `<li>${a.nome} - ${a.data} às ${a.horario}</li>`;
  });
}

mostrarAgendamentos();
