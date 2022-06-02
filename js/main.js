const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const toggler = document.querySelector(".toggler");
const body = document.querySelector("body");
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  // e.preventDefault();
  if (
    modal.classList.contains("hidden") &&
    overlay.classList.contains("hidden") &&
    !body.classList.contains("noscroll")
  ) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    body.classList.add("noscroll");
  } else {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    body.classList.remove("noscroll");
  }
};

toggler.addEventListener("click", openModal);

// Items reveal
const signUp = document.querySelector(".sign_up");
const reveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("item--hidden");
  entry.target.classList.add("fade-in-element");
  observer.unobserve(entry.target);
};
const observer = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.1,
});
observer.observe(signUp);
signUp.classList.add("item--hidden");
