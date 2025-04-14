const authForm = document.getElementById("auth-form");
const authCard = document.getElementById("auth-card");
const predictCard = document.getElementById("predict-card");
const predictForm = document.getElementById("predict-form");
const authBtn = document.getElementById("auth-btn");
const formTitle = document.getElementById("form-title");
const toggleBtn = document.getElementById("toggle-btn");
const toggleText = document.getElementById("toggle-text");
const message = document.getElementById("message");
const result = document.getElementById("result");

let isLogin = true;

toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.innerText = isLogin ? "Login" : "Signup";
  authBtn.innerText = isLogin ? "Login" : "Signup";
  toggleText.innerText = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  toggleBtn.innerText = isLogin ? "Signup" : "Login";
});

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(authForm);
  const payload = Object.fromEntries(data.entries());
  try {
    const response = await fetch(
      `http://localhost:5000/${isLogin ? "login" : "signup"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    message.textContent = result.message;
    authCard.style.display = "none";
    predictCard.style.display = "block";
  } catch (err) {
    message.textContent = err.message;
  }
});
predictForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(predictForm);
  const payload = Object.fromEntries(data.entries());

  // Show loader and hide result
  document.getElementById("loading").style.display = "block";
  result.innerText = "";
  result.innerHTML = "";

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const resData = await response.json();

    document.getElementById("loading").style.display = "none";

    // Show toast
    showToast("Prediction successful!");

    // Show result
    const prediction = resData.prediction;
    result.innerHTML = `<h3>Prediction: ${prediction}</h3>`;

    if (prediction == 0) {
      result.innerHTML += `<p style="font-size:40px;">☀️</p><p>No Rain Expected</p>`;
      // You can also use image instead of emoji:
      // result.innerHTML += `<img src="sun.png" class="result-image" alt="No Rain" />`;
    } else if (prediction == 1) {
      result.innerHTML += `<p style="font-size:40px;">🌧️</p><p>Rain Expected</p>`;
      // result.innerHTML += `<img src="rain.png" class="result-image" alt="Rain Expected" />`;
    }
  } catch (err) {
    document.getElementById("loading").style.display = "none";
    result.innerText = "Prediction Failed!";
  }
});

// Toast function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
