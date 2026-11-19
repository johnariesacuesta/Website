
const form = document.getElementById("contactForm");
const responseText = document.getElementById("response");

// Check backend connection
fetch("/api/status")
  .then(res => res.json())
  .then(data => console.log(data.message))
  .catch(err => console.error("Backend connection failed:", err));

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    responseText.textContent = result.message;
    responseText.style.color = result.success ? "green" : "red";

    if (result.success) form.reset();

  } catch (error) {
    responseText.textContent = "Unable to connect to server.";
    responseText.style.color = "red";
  }
});
