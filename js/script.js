const cards = document.querySelectorAll(".room__card");
const contents = document.querySelectorAll(".room-content");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => {
      c.classList.remove("active");
    });

    contents.forEach((content) => {
      content.classList.remove("active");
    });

    card.classList.add("active");

    const room = card.dataset.room;

    document.querySelector(`.room__${room}`).classList.add("active");
  });
});

//section 5 box
const images = [
  "./images/box1.png",
  "./images/box2.png",
  "./images/box3.png"
];

let currentImage = 0;

const galleryImage = document.getElementById("gallery-image");
const boxSection = document.getElementById("box");
function updateImage() {

  galleryImage.style.opacity = "0";

  setTimeout(() => {

    galleryImage.src = images[currentImage];

    boxSection.style.backgroundImage =
      `linear-gradient(rgba(10,15,35,.65), rgba(10,15,35,.65)),
       url('${images[currentImage]}')`;

    boxSection.style.backgroundSize = "cover";
    boxSection.style.backgroundPosition = "center";

    galleryImage.style.opacity = "1";

  }, 300);

}

document.querySelector(".next").addEventListener("click", () => {

  currentImage++;

  if (currentImage >= images.length) {
    currentImage = 0;
  }

  updateImage();
});

document.querySelector(".prev").addEventListener("click", () => {

  currentImage--;

  if (currentImage < 0) {
    currentImage = images.length - 1;
  }

  updateImage();
});

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });
  },
  {
    threshold: 0.2
  }
);

hiddenElements.forEach((el) => {
  observer.observe(el);
});

//navigation
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

navToggle.addEventListener("click", () => {
  navMenu.classList.add("show-menu");
});

navClose.addEventListener("click", () => {
  navMenu.classList.remove("show-menu");
});

/* ReSPONSIVE HOTEL */
const roomSelect = document.getElementById("room-select");

roomSelect.addEventListener("change", () => {

  document
    .querySelectorAll(".room-content")
    .forEach(room => room.classList.remove("active"));

  document
    .querySelector(".room__" + roomSelect.value)
    .classList.add("active");

});

/* message du contact */
const bookingButtons = document.querySelectorAll(".btn-book");
const messageField = document.getElementById("contact-message");

bookingButtons.forEach(button => {

  button.addEventListener("click", () => {

    const type = button.dataset.type;
    const name = button.dataset.name;

    if (type === "hotel") {

      messageField.value =
`Bonjour,

Je souhaite réserver une chambre ${name}.

du [date d'arrivée] au [date de départ].

Merci beaucoup !`;

    } else if (type === "box") {

      messageField.value =
`Bonjour,

Je souhaite louer le local commercial ${name}.

Merci beaucoup !`;

    }

    document
      .getElementById("contact")
      .scrollIntoView({
        behavior: "smooth"
      });

  });

});

/* emailjs */

  emailjs.init("iZEDCAK2ythCLU7Vf");

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_f89kr3y",
      "template_it0t5oh",
      this
    )
    .then(() => {
      alert("Message envoyé avec succès !");
      form.reset();
    })
    .catch((error) => {
      console.log(error);
      alert("Erreur lors de l'envoi");
    });
  });
