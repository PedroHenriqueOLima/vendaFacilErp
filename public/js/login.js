document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const passwordInput = document.getElementById("admin-password").value;
  if (passwordInput.value !== "") {
    fetch("/painel-administrador/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordInput.value,
      }),
    }).then((response) => {
      if (response.ok) {
        window.location.href = "/painel-administrador";
      } else {
        alert("Senha Incorreta!");
      }
    });
  }
});
