const $tabContainer = document.querySelector("#tabs");
const $tablist = $tabContainer.querySelectorAll(".tab");

const today = new Date();
let weekday = today.getDay();

const week = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

function nextDay(day) {
  if (weekday === 6) {
    return 0;
  }
  return day + 1;
}

$tablist.forEach(($tab, index) => {
  $tab.addEventListener("click", handleEventListener);
  if (index === 0) {
    $tab.textContent = "Hoy";
    weekday = nextDay(weekday);
    return false;
  }
  $tab.textContent = week[weekday];
  weekday = nextDay(weekday);
});

function handleEventListener(event) {
  const $tabSelected = event.target;
  const $tabActive = document.querySelector('.tab[aria-selected="true"]');
  $tabActive.removeAttribute("aria-selected");
  $tabSelected.setAttribute("aria-selected", true);

  const id = $tabSelected.id;
  const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`);
  const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`);
  $tabPanel.hidden = false;
  $tabPanelSelected.hidden = true;
}
