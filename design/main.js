const data = [
  {
    title: "100 Grad Bar Lounge Kerkon Staf ",
    link: "https://www.njoftimefalas.com/23/oferta-njoftime-pune/id-239830",
  },
  {
    title: "Eden Breeze Fish Restaurant Kerkon Ndihmese Kamariere",
    link: "https://www.njoftimefalas.com/23/oferta-njoftime-pune/id-238798",
  },
  {
    title: "Vila 7 Kerkon Te Punesoje Kamarier/e",
    link: "https://www.njoftimefalas.com/23/oferta-njoftime-pune/id-239730",
  },
  {
    title: "Kerkoj Kamarier/e - Banakier/e",
    link: "https://www.njoftimefalas.com/23/oferta-njoftime-pune/id-240687",
  },
  {
    title: "Kerkohen 2 Banakiere 1 Kamariere ",
    link: "https://www.njoftimefalas.com/23/oferta-njoftime-pune/id-216338",
  },
  {
    title:
      "Gjermanie ofroj vend pune ne Gastronomi  e Picier e Kuzhinier me eksperience pune ne kuzhinen italiane e Kamariere e",
    link: "http://njoftime.com/showthread.php?477024",
  },
  {
    title: "Tiranee ofroj vend pune Banakieree  e  Kamarieree",
    link: "http://njoftime.com/showthread.php?482779",
  },
  {
    title: "Vloree kerkohet Kamariere",
    link: "http://njoftime.com/showthread.php?483371",
  },
  {
    title: "Tiranee ofroj vend pune kamariere e banakiere",
    link: "http://njoftime.com/showthread.php?482549",
  },
  {
    title: "Tiranee ofroj vend pune Kamarieree",
    link: "http://njoftime.com/showthread.php?483075",
  },
  {
    title: "Tiranee ofroj vend pune turni i dyte Kamarieree",
    link: "http://njoftime.com/showthread.php?483382",
  },
  {
    title: "Tiranee ofroj vend pune Kamarier",
    link: "http://njoftime.com/showthread.php?437887",
  },
  {
    title: "Tiranee ofroj vend pune  Kamarieree dhe  Banakieree",
    link: "http://njoftime.com/showthread.php?294414",
  },
  {
    title: "Tiranee ofroj vend pune Kamariere",
    link: "http://njoftime.com/showthread.php?369246",
  },
  {
    title:
      "Gjermanie ofroj vend pune ne Gastronomi  e Picier e Kuzhinier me eksperience pune ne kuzhinen italiane e Kamariere e",
    link: "http://njoftime.com/showthread.php?477024",
  },
  {
    title: "Tiranee ofroj vend pune Banakieree  e  Kamarieree",
    link: "http://njoftime.com/showthread.php?482779",
  },
  {
    title: "Vloree kerkohet Kamariere",
    link: "http://njoftime.com/showthread.php?483371",
  },
  {
    title: "Tiranee ofroj vend pune kamariere e banakiere",
    link: "http://njoftime.com/showthread.php?482549",
  },
  {
    title: "Tiranee ofroj vend pune Kamarieree",
    link: "http://njoftime.com/showthread.php?483075",
  },
  {
    title: "Tiranee ofroj vend pune turni i dyte Kamarieree",
    link: "http://njoftime.com/showthread.php?483382",
  },
  {
    title: "Tiranee ofroj vend pune Kamarier",
    link: "http://njoftime.com/showthread.php?437887",
  },
  {
    title: "Tiranee ofroj vend pune  Kamarieree dhe  Banakieree",
    link: "http://njoftime.com/showthread.php?294414",
  },
  {
    title: "Tiranee ofroj vend pune Kamariere",
    link: "http://njoftime.com/showthread.php?369246",
  },
];

const jobs = document.querySelector(".jobs");
const jobcontent = document.querySelector(".job-content");

const header = document.querySelector(".job-info-header");

data.forEach((e) => {
  const li = document.createElement("li");
  li.textContent = e.title;

  li.addEventListener("click", () => {
    jobcontent.style.display = "block";
    header.style.display = "block";
  });

  jobs.appendChild(li);
});

const dropdown = document.querySelector(".dropdown-button");
const links = document.querySelector(".dropdown-menu");
const background = document.querySelector(".bc");
let drop = false;

dropdown.addEventListener("click", () => {
  drop = !drop;
  links.style.top = drop ? "40px" : "-80px";
  background.style.display = drop ? "block" : "none";
});

background.addEventListener("click", () => {
  drop = !drop;
  links.style.top = drop ? "40px" : "-80px";
  background.style.display = drop ? "block" : "none";
});

const closeContent = document.querySelector(".close");

closeContent.addEventListener("click", () => {
  jobcontent.style.display = "none";
  header.style.display = "none";
});
