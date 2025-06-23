document.getElementById("bookingForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById("formStatus");

  try {
    const res = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      status.textContent = "✅ Your booking has been received successfully!";
      status.style.color = "green";
      form.reset();
    } else {
      const data = await res.json();
      if (data.errors) {
        status.textContent = "❌ " + data.errors.map(err => err.message).join(", ");
      } else {
        status.textContent = "❌ Something went wrong. Please try again.";
      }
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "❌ Network error. Please check your connection.";
    status.style.color = "red";
  }
});
