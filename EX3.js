const apiUrl = "https://api.frankfurter.app";
const form = document.getElementById("convert-form");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultEl = document.getElementById("result");

function setResult(text) {
  resultEl.textContent = text;
}

async function loadCurrencies() {
  const response = await fetch(`${apiUrl}/currencies`);
  const data = await response.json();
  const codes = Object.keys(data);

  codes.forEach((code) => {
    const opt1 = document.createElement("option");
    opt1.value = code;
    opt1.textContent = code;
    fromSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = code;
    opt2.textContent = code;
    toSelect.appendChild(opt2);
  });

  fromSelect.value = "USD";
  toSelect.value = "EUR";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const amount = Number(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount || !from || !to) {
    setResult("Please fill all fields.");
    return;
  }

  const response = await fetch(
    `${apiUrl}/latest?amount=${amount}&from=${from}&to=${to}`,
  );
  const data = await response.json();
  const converted = data.rates[to];
  setResult(`${amount} ${from} = ${converted} ${to}`);
});

loadCurrencies();
