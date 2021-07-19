/**
 * Start Global Variables
 */

const sections = document.querySelectorAll("section"),
  nav = document.querySelector("#nav-list"),
  header = document.querySelector("header"),
  scrollToTop = document.getElementById("scroll"),
  fragmentlists = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Main Functions
 */

// Build the nav menu
for (const sec of sections) {
  const list = document.createElement("li");
  list.insertAdjacentHTML(
    "beforeend",
    `<a href="#${sec.getAttribute("id")}">${sec.getAttribute("data-nav")}</a>`
  );
  fragmentlists.appendChild(list);
}
nav.appendChild(fragmentlists);

// Add active class to section when it on viewport and its link
const option = {
    threshold: 0.6,
  },
  observer = new IntersectionObserver((sections) => {
    for (const sec of sections) {
      if (sec.isIntersecting) {
        sec.target.classList.add("active");
        nav
          .querySelector(`[href = "#${sec.target.id}"]`)
          .parentElement.classList.add("active");
      } else {
        sec.target.classList.remove("active");
        nav
          .querySelector(`[href = "#${sec.target.id}"]`)
          .parentElement.classList.remove("active");
      }
    }
  }, option);
// Setup function to execute the observer
const callObserver = () => {
  for (const sec of document.querySelectorAll("section")) observer.observe(sec);
};
callObserver();

/**
 * End Main Functions
 * Start Events
 *
 */

// Scroll to Top when click on button
scrollToTop.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
);

// Listen for scroll events
let scrolling;
window.addEventListener("scroll", () => {
  // Show header while scrolling
  header.style.visibility = "visible";
  clearTimeout(scrolling);
  // Set a timeout to run after scrolling ends then hide header if The dimension Y is greater then 300 pixels
  scrolling = setTimeout(() => {
    scrollY < 300 || toggleIcon.classList.contains("togglee")
      ? (header.style.visibility = "visible")
      : (header.style.visibility = "hidden");
  }, 2000);
  // show & hide Scroll Button
  scrollY > 500
    ? (scrollToTop.style.visibility = "visible")
    : (scrollToTop.style.visibility = "hidden");
});

// Scroll to section when click on its link in nav bar in header
nav.addEventListener("click", (e) => {
  if (e.target.firstChild.hash)
    document
      .getElementById(e.target.firstChild.hash.slice(1))
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  else if (e.target.hash) {
    // don't run anything ...
    // it's will be scroll to section dynamically because it has the 'href' attribute
  } else e.preventDefault();
});

// Open menu list when click on toggle icon
const toggleIcon = document.querySelector(".toggle");
toggleIcon.addEventListener("click", () =>
  toggleIcon.classList.toggle("menu_list")
);
// When click on body in everywhere close menu list if it is open
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu_list")) {
    // Don't run if click on the toggle icon
    // the toggle icon will close the menu list by itself
  } else toggleIcon.classList.remove("menu_list");
});

// Set background image for landing page every 5 seconds
const backgImage = document.querySelector(".background"),
  imgs = ["img/bg1.png", "img/bg2.png", "img/bg3.png"];
// Start from second image
let i = 1;
setInterval(() => {
  // If the number of images in the array runs out, start from 0 index
  if (i > imgs.length - 1) i = 0;
  //Every time, post a new photo
  backgImage.style.backgroundImage = `url(${imgs[i++]})`;
  backgImage.classList.toggle("animation_go");
  backgImage.classList.toggle("animation_back");
}, 5000);

// Make sections collapsible
const collapsible = (sections) => {
  for (const sec of sections) {
    sec.querySelector(".collapsible").addEventListener("click", () => {
      sec.classList.toggle("collapsible_section");
    });
  }
};
collapsible(sections);

/**
 * (Add new Section) form
 */

// Get values from form and setup them in variables
const form = document.querySelector(".form_container"),
  headingSection = document.getElementById("heading"),
  para = document.getElementById("para"),
  add = document.getElementById("add"),
  update = document.getElementById("update"),
  error = document.getElementById("error"),
  // Reset form
  reset = () => {
    headingSection.value = "";
    para.value = "";
  };

// Show form when click on add new section button
document.getElementById("new").addEventListener("click", () => {
  form.style.display = "flex";
  reset();
});

// Close form
document.getElementById("cancel").addEventListener("click", () => {
  form.style.display = "none";
  error.textContent = "";
  reset();
});

// reset form
document.querySelector("input[type=reset]").addEventListener("click", () => {
  reset();
});

//Add new Section when click on button 'add'
add.addEventListener("click", (e) => {
  /*
 Setup variable (newSecId) to Get what is length of section in landing page and
  increment 1 to make new section has a uninqe ID
  */
  let newSecId = document.querySelectorAll("section").length + 1,
    headingValue = headingSection.value,
    paraValue = para.value;

  // if the form 'add new sction' has errors
  if (headingValue == false && paraValue == false) {
    e.preventDefault();
    error.textContent = "The Heading and The Paragraph is Empty ";
  } else if (headingValue == false) {
    e.preventDefault();
    error.textContent = "The Heading is Empty ";
  } else if (paraValue == false) {
    e.preventDefault();
    error.textContent = "The Paragraph is Empty ";
  } else if (headingValue.length > 15) {
    e.preventDefault();
    error.textContent = "The Heading is long ";
  } else {
    // Setup variable has a created section
    let AddnewSection = `
  <!-- Start Section ${newSecId} -->
        <section id="section${newSecId}" data-nav="${headingValue}">
            <div class="container">
                <div class="top">
                    <h2>${headingValue}</h2></span>
                </div>
                <p>${paraValue}</p>
            </div>
        </section>
  <!-- End Section ${newSecId} -->
  `;

    // append a new section in landing page after last section
    document
      .querySelector("main")
      .querySelector("section:last-of-type")
      .insertAdjacentHTML("afterend", AddnewSection);

    // Setup variable has a new link of new section and append it in nav
    let addnewLink = `<li><a href="#section${newSecId}">${headingValue}</a>`;
    nav.insertAdjacentHTML("beforeend", addnewLink);

    // Reset & close form after created new section
    error.textContent = "";
    form.style.display = "none";
    reset();
    callObserver();
  }
});
