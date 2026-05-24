const navButtons = document.querySelectorAll(".nav-button");

navButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const target = button.getAttribute("data-target");

    if (target) {
      window.location.href = target;
    }
  });
});
