// Doc type entity..
const nameInput   = document.getElementById("name");
const msgInput    = document.getElementById("msg");
const senderInput = document.getElementById("sender");
const themeInput  = document.getElementById("themeInput");
const photoInput  = document.getElementById("photo");
const previewCard = document.getElementById("previewCard");
const previewName = document.getElementById("previewName");
const previewMsg  = document.getElementById("previewMsg");

function updatePreview(){
  previewName.innerText =
    nameInput.value
      ? "Happy Birthday 🎂 " + nameInput.value
      : "Happy Birthday 🎂 Name";

  previewMsg.innerText =
    msgInput.value
      ? msgInput.value
      : "Your message will appear here ✨";
}

// Theme selector
function selectTheme(theme, el){
  themeInput.value = theme;

  // Remove active class
  document
    .querySelectorAll(".theme-card")
    .forEach(card => card.classList.remove("active"));

  // Add active to selected
  el.classList.add("active");

  // Apply theme to preview
  previewCard.className = "preview-card " + theme;
}

// Generate button
function go(){
  const name   = document.getElementById("name").value.trim();
  const msg    = document.getElementById("msg").value.trim();
  const sender = document.getElementById("sender").value.trim();
  const theme  = document.getElementById("themeInput").value;
  const photoFile = document.getElementById("photo").files[0];

  if(!name || !msg || !sender){
    alert("Please fill name, message and sender");
    return;
  }

  // Store text data
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("msg", msg);
  sessionStorage.setItem("sender", sender);
  sessionStorage.setItem("theme", theme);

  if(photoFile){
    const reader = new FileReader();
    reader.onload = () => {
      sessionStorage.setItem("photo", reader.result);
      window.location.href = "view.html";
    };
    reader.readAsDataURL(photoFile);
  } else {
    sessionStorage.removeItem("photo");
    window.location.href = "view.html";
  }
}

