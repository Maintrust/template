function ready(callback) {
  // in case the document is already rendered
  if (document.readyState != "loading") callback();
  // modern browsers
  else if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", callback);
  // IE <= 8
  else
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState == "complete") callback();
    });
}

ready(function () {
  // Фиксированный хедер
  const header = document.querySelector(".header");
  const introHeight = document.querySelector(".intro").clientHeight;

  window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    if (scrollHeight > introHeight - 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });

  /* Smooth scroll */
  const dataScrollElements = document.querySelectorAll("[data-scroll]");

  const navLinks = document.querySelectorAll(".header__nav a");

  for (let elem of dataScrollElements) {
    elem.addEventListener("click", smoothScroll);
  }

  function smoothScroll(e) {
    e.preventDefault();

    for (let link of navLinks) {
      link.classList.remove("active");
    }

    e.target.classList.add("active");
    const dataScroll = e.target.dataset.scroll;
    const currentBlock = document.querySelector(dataScroll);

    currentBlock.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  /// Burger menu
  /* burger menu */
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".header__nav");
  navToggle.addEventListener("click", (e) => {
    e.preventDefault();
    navToggle.classList.contains("active")
      ? navToggle.classList.remove("active")
      : navToggle.classList.add("active");
    nav.classList.contains("active")
      ? nav.classList.remove("active")
      : nav.classList.add("active");
  });

  /// ГАЛЕРЕЯ

  // const reviews = document.getElementById("reviews__inner");
  const reviewsNav = document.getElementById("reviews__nav");
  // console.log(reviews);

  // console.log(getWidth(reviews));

  reviewsNav.addEventListener("click", changeSlide);

  function changeSlide(e) {
    let target = e.target;

    const slider = document.getElementById("reviews__inner");

    if (target.nodeName == "SPAN") target = e.target.parentElement;

    if (target.nodeName == "DIV") return;

    const reviewsBtnArray = [...document.querySelectorAll(".reviews__btn")];

    const position = reviewsBtnArray.indexOf(target);

    changeActive(position);

    moveElementX(slider, position);

    function changeActive(position) {
      for (let button of reviewsBtnArray) {
        button.classList.remove("active");
      }
      reviewsBtnArray[position].classList.add("active");
    }
  }

  function moveElementX(elem, position) {
    const elemLength = getWidth(elem.children[0]);
    elemCurrentPosition = Math.round(elemLength * position);
    elem.style.transform = `translateX(${-elemCurrentPosition}px)`;
  }

  function getWidth(item) {
    return item.clientWidth;
  }

  /// РАСКРЫТИЕ РАБОТ
  const worksBtn = document.getElementById("works__btn");
  const hidedWorks = document.querySelectorAll(".works__item-extra");
  const textBtn = worksBtn.firstElementChild.innerText;
  worksBtn.addEventListener("click", showHideWorks);

  function showHideWorks(e) {
    if (worksBtn.firstElementChild.innerText == textBtn) {
      for (let work of hidedWorks) {
        work.style.display = "block";
      }
      worksBtn.firstElementChild.innerText = "Hide extra works";
    } else {
      for (let work of hidedWorks) {
        work.style.display = "";
      }
      worksBtn.firstElementChild.innerText = textBtn;
    }
  }
});
