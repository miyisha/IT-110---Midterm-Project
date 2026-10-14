const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const errorContainer = document.getElementById('error-container');

async function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  // user input validation
  if (!amount || amount <= 0) {
    errorContainer.textContent = "Please enter a valid amount.";
    resultContainer.style.display = "none";
    return;
  }

  // loading
  errorContainer.textContent = "Fetching live exchange rates...";
  resultContainer.style.display = "none";

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.result === "error") {
      throw new Error("Currency conversion failed");
    }

    const rate = data.rates[to];
    const convertedAmount = (amount * rate).toFixed(2);

    // display success
    resultText.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    resultContainer.style.display = "block";
    errorContainer.textContent = ""; // Clear any error messages
    
  } catch (error) {
    // error handling
    errorContainer.textContent = "Could not fetch data. Please try again.";
    resultContainer.style.display = "none";
  }
}

// event listing
convertBtn.addEventListener('click', convertCurrency);

amountInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    convertCurrency();
  }
});

