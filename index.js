const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx2ZBtzo5eT5ZkpeytTlDifsjtp5dChrImxRsOpU7DAS5zc1VKAMxQP3yAIMH7VpAqt/exec";

const sendBtn = document.querySelector(".send");

sendBtn.addEventListener("click", async () => {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const phoneEl = document.getElementById("phone");
  const messageEl = document.getElementById("message");

  // Your HTML has no <form>, so the browser's "required" check won't run. Do it here.
  if (!nameEl.value.trim() || !emailEl.value.trim() || !phoneEl.value.trim() || !messageEl.value.trim()) {
    alert("Please fill in all fields.");
    return;
  }
  if (!emailEl.checkValidity()) {
    alert("Please enter a valid email address.");
    return;
  }

  const data = new URLSearchParams({
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    phone: phoneEl.value.trim(),
    message: messageEl.value.trim()
  });

  sendBtn.disabled = true;
  const originalText = sendBtn.textContent;
  sendBtn.textContent = "Sending...";

  try {
    await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", body: data });
    alert("Thanks! Your message has been sent.");
    nameEl.value = emailEl.value = phoneEl.value = messageEl.value = "";
  } catch (err) {
    alert("Something went wrong. Please try again.");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = originalText;
  }
});