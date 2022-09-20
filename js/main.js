const optionList = document.querySelector(".option-list");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const toggler = document.querySelector(".toggler");
const body = document.querySelector("body");
const menuLinks = document.querySelector(".menu_links");

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

////////////////////////////////////////////////////////////////////////////////
//  Render page
const searchItems = async () => {
  const getItems = await fetch("js/items.json");
  const itemData = await getItems.json();
  renderAllOptions(itemData), selectSpecOpt(itemData);
};
searchItems();

const renderMenu = () => {
  const html = `
  <div class="specific-option "><p class="hidden">All</p></div>
  <div class="border hidden"></div>
  <div class="specific-option tumbler"><p>Tumblers</p></div>
  <div class="border"></div>
  <div class="specific-option cup"><p>Cups</p></div>
  <div class="border"></div>
  <div class="specific-option shirt"><p>Shirts</p></div>
  <div class="border"></div>
  <div class="specific-option other-item"><p>Other Items</p></div>
`;
  menuLinks.insertAdjacentHTML("beforeend", html);
};
renderMenu();

const renderAllOptions = (itemData) => {
  itemData.forEach((item) => {
    renderOptions(item);
  });
};

const renderOptions = (item) => {
  const html = `
  <div data-id="${item.id}"class="item">
    <img src="${item.image}" alt="${item.title}" />
    <div class="description">
      <h3>${item.title}</h3>
      <p>$${item.price}.00</p>
    </div>
  </div>
  `;
  optionList.insertAdjacentHTML("beforeend", html);
};

const hiddenMenu = (hiddenOptions) => {
  hiddenOptions.forEach((option) => {
    if (option.classList.contains("hidden")) {
      option.classList.remove("hidden");
    } else {
      option.classList.add("hidden");
    }
  });
};

const hiddenOptions = document.querySelectorAll(".specific-option p, .border");
const specificOptions = document.querySelectorAll(".specific-option");

const selectSpecOpt = (itemData) => {
  specificOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // console.log(itemData);
      checkDis(option, itemData);
    });
  });
};
// selectSpecOpt();

const checkDis = (option, itemData) => {
  if (option.classList.contains("tumbler")) {
    let itemDis = "tumbler";
    loadOpPage(itemData, itemDis, hiddenOptions);
  } else if (option.classList.contains("cup")) {
    let itemDis = "cup";
    loadOpPage(itemData, itemDis, hiddenOptions);
  } else if (option.classList.contains("shirt")) {
    let itemDis = "shirt";
    loadOpPage(itemData, itemDis, hiddenOptions);
  } else if (option.classList.contains("other-item")) {
    let itemDis = "other-item";
    loadOpPage(itemData, itemDis, hiddenOptions);
  } else {
    optionList.innerHTML = "";
    renderAllOptions(itemData);
    hiddenMenu(hiddenOptions);
  }
};

const loadOpPage = (itemData, itemDis, hiddenOptions) => {
  optionList.innerHTML = "";
  loopData(itemData, itemDis);
  hiddenMenu(hiddenOptions);
};

const loopData = (itemData, itemDis) => {
  itemData.forEach((item) => {
    if (item.description === itemDis) {
      renderOptions(item);
    }
  });
};
