const name   = sessionStorage.getItem("name");
const msg    = sessionStorage.getItem("msg");
const sender = sessionStorage.getItem("sender");
const theme  = sessionStorage.getItem("theme");
const photo  = sessionStorage.getItem("photo");

if (!name || !msg || !sender) {
  document.body.innerHTML =
    "<h2 style='color:#fff;text-align:center'>Invalid session or page opened directly</h2>";
  throw new Error("Session data missing");
}

wishName.innerText = "Happy Birthday 🎂 " + name;
wishMsg.innerText  = msg;
senderName.innerText = sender;

// Photo
if (photo) {
  senderPhoto.src = photo;
  senderPhoto.style.display = "block";
}

// Theme
if (theme) {
  document.body.className = theme;
}

function openCard(){
  tap.style.display = "none";
  card.style.display = "block";

  bgMusic.volume = 0.6;
  bgMusic.play().catch(()=>{});

  confetti();
}

function saveImage(){
  const cardEl = document.getElementById("card");

  // Hide buttons during export
  cardEl.classList.add("exporting");

  html2canvas(cardEl, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "birthday-wish.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    // Show buttons again
    cardEl.classList.remove("exporting");
  }).catch(err => {
    console.error(err);
    cardEl.classList.remove("exporting");
  });
}
// how to Share...
// function share(){
//   const text = "🎉 I made a special birthday card for you 💖";

//   // ✅ Native share (mobile)
//   if (navigator.share) {
//     navigator.share({
//       title: "Birthday Surprise 🎂",
//       text: text
//     }).catch(()=>{});
//     return;
//   }

//   // ✅ Desktop fallback
//   navigator.clipboard.writeText(location.href);
//   alert("Link copied! Share it anywhere 😊");
// }

async function share(){
  const card = document.getElementById("card");

  // Hide buttons
  card.classList.add("exporting");

  try {
    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: "#ffffff"
    });

    card.classList.remove("exporting");

    canvas.toBlob(async blob => {
      const file = new File(
        [blob],
        "birthday-card.png",
        { type: "image/png" }
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file]   // ✅ ONLY IMAGE, NO TEXT
        });
      } else {
        alert("Image sharing works only on mobile devices.");
      }
    });

  } catch (err) {
    card.classList.remove("exporting");
    console.error(err);
  }
}


