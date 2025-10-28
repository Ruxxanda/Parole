function trimite() {
  const nume = document.getElementById("nume").value.trim();
  const parola = document.getElementById("parola").value;
  const eroriDiv = document.getElementById("erori");
  eroriDiv.innerHTML = "";

  let erori = [];

  if (!/[A-Z]/.test(parola)) erori.push("• Lipsește o literă mare");
  if (!/[a-z]/.test(parola)) erori.push("• Lipsește o literă mică");
  if (!/[0-9]/.test(parola)) erori.push("• Lipsește o cifră");
  if (!/[.\-_]/.test(parola)) erori.push("• Lipsește un semn special (., -, _)");

  if (erori.length > 0) {
    erori.forEach(e => {
      const p = document.createElement("p");
      p.textContent = e;
      eroriDiv.appendChild(p);
    });
  } else {
    // trimitem la Google Sheets
    fetch("https://script.google.com/macros/s/AKfycbx7IHeU-5dOyRAG6Rmh3uazuVZBFUv9oDXKDx8D8NkXZmMseyPyWTfbiwSedR9oGWM/exec", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ nume: nume, parola: parola }),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.text())
    .then(() => {
      window.location.href = "gata.html";
    })
    .catch(err => {
      alert("Eroare la trimitere: " + err);
    });
  }
}
