// JavaScript for handling sticky and responsive behavior
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const content = document.getElementById("content");
  const sticky = navbar.offsetTop;

  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    content.style.marginTop = navbar.offsetHeight + "px";
  } else {
    navbar.classList.remove("sticky");
    content.style.marginTop = 0;
  }
});

window.addEventListener("resize", function () {
  const navbar = document.getElementById("navbar");
  const content = document.getElementById("content");

  if (navbar.classList.contains("sticky")) {
    content.style.marginTop = navbar.offsetHeight + "px";
  }
});

function toggleDrawer() {
  const drawer = document.querySelector(".drawer");
  drawer.classList.toggle("show-drawer");
}
