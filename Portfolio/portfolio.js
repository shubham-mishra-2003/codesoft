let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

let navbar = document.querySelector(".navigation");

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

//Typing animation
const words = ["Student.", "Web Developer.", "Computer Science Enthusiast."];
const typingSpeed = 200;
const erasingSpeed = 100;
const delayBetweenWords = 1500;

let wordIndex = 0;
let charIndex = 0;
let isErasing = false;

const spanElement = document.querySelector(".me-as");

function type() {
  const currentWord = words[wordIndex];
  if (isErasing) {
    if (charIndex > 0) {
      spanElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, erasingSpeed);
    } else {
      isErasing = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed);
    }
  } else {
    if (charIndex < currentWord.length) {
      spanElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      isErasing = true;
      setTimeout(type, delayBetweenWords);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, delayBetweenWords);
});

//contact form
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async response => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = "Form submitted successfully";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function() {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});
