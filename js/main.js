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
