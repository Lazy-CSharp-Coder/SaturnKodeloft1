let darkMode = true;
let hamMenuShowing = false;
let subMenuShowing = false;
let mouseWheelMoved = false;
let subMenuIsMissing = false;
let toTopButtonVisible = false;
const topButtonYLimit = 300;
let isNorwegian = true;



const mainMenuEng = ["Home", "About", "Ring system", "Moons", "Expeditions", "D/L Lightmode"];
const mainMenuNorsk = ["Hjem", "Om", "Ringene", "Månene", "Romferdene", "D/L Lysmodus"];



let languageSelected = mainMenuNorsk;
 const refArray = [];
  refArray[0] = document.getElementById("homeref");
  refArray[1] = document.getElementById("aboutref");
  refArray[2] = document.getElementById("ringsref");
  refArray[3] = document.getElementById("moonsref");
  refArray[4] = document.getElementById("expeditionsref");
  refArray[5] = document.getElementById("darklighthamburger");
  console.log(refArray);

const translateButton = document.querySelector("#languageButton");
let  currentMain = document.getElementById("mainNorwegian");


const currentPage = window.location.pathname;
console.log(translateButton);


const chosenLanguage = localStorage.getItem("selectedLanguage");
if(chosenLanguage != null) 
if(chosenLanguage == "english")
{
    switchLanguage();
} else localStorage.setItem("selectedLanguage", "norwegian");


// her finner jeg ut om brukeren har skiftet til lightMode

// const chosenTheme = localStorage.getItem("selectedTheme") ;
const chosenTheme = null;

if(chosenTheme != null) 
  if(chosenTheme === "lightMode") darkLightModeToggle();
  else localStorage.setItem("selectedTheme", "darkMode");



function hamburgerToggle() 
{
  console.log("Hi from hamburgerToggle");

  const navListElement = document.getElementById("headerMenu");
  console.log(navListElement);

  if(hamMenuShowing == false) 
  {
    navListElement.classList.remove("hidden");
    navListElement.classList.add("show");

    console.log("showing ham menu");
    hamMenuShowing = true;

  }
  else
  {
    navListElement.classList.remove("show");
    navListElement.classList.add("hideHeaderMenu");
    navListElement.addEventListener("animationend", () => { navListElement.classList.add("hidden"); navListElement.classList.remove("hideHeaderMenu"); console.log('Animation slutt!');  }, {once: true});

    hamMenuShowing = false;
  }
}

function subMenuToggle()
{
  const subListElement = document.getElementById("subMenu");
  console.log(subListElement);

  if(subMenuShowing == false)
  {
    subListElement.classList.remove("hidden");
    subListElement.classList.add("showSubMenu");
    subMenuShowing = true;
  }
  else 
  {
    subListElement.classList.remove("showSubMenu");
    subListElement.classList.add("hideSubMenu");
    subListElement.addEventListener("animationend", () => { 

        subListElement.classList.add("hidden"); 
        subListElement.classList.remove("hideSubMenu"); 
        console.log('Animation slutt!');  }, {once: true});
    
    subMenuShowing = false;
  }
} 

const lightModeUrl = "Images/sunblazinglogo.png";
const darkModeUrl = "Images/moonbluelogo2.png";


function darkLightModeToggle() 
{
  console.log("hi from darkLight mode");
  
  
  const imageElement = document.querySelector("#darkLightIcon");

  // const imgElements = document.querySelector(".imgClass");
  if(darkMode)
  {
    currentMain.classList.add("lightMode");
    // imgElements.classList.add("ligthModeImages");
    darkMode = false;
    imageElement.src = darkModeUrl;

    // console.log(imageElement);
    localStorage.setItem("selectedTheme", "lightMode");
  }
  else
  {
     currentMain.classList.remove("lightMode");
     imageElement.src = lightModeUrl;

     localStorage.setItem("selectedTheme", "darkMode");
     darkMode = true;

   }
}

// event listener for mousemove

let prevScrollPos = window.scrollY;

function animateSubMenu () 
{
  const currentScrollPos = window.scrollY;
  const chosenSub = isNorwegian ? "subMenuDivNorwegian" : "subMenuDivEnglish";
  const subMenu = document.getElementById(chosenSub);

    const toTopButton = document.getElementById("toTop");



  // rutine for å få frem to top button når man har scrollet langt nok ned
  
  if(currentScrollPos > topButtonYLimit && toTopButtonVisible == false)
  {
    toTopButton.classList.remove("removeToTopButton");
    toTopButton.classList.remove("hidden");
    toTopButton.classList.add("showToTopButton");
    toTopButtonVisible = true;
  }
  else
  { 
    if(currentScrollPos < topButtonYLimit && toTopButtonVisible == true)
    {
      toTopButton.classList.remove("showToTopButton"); 
      toTopButton.classList.remove("hidden");
      toTopButton.classList.add("removeToTopButton");
      toTopButton.addEventListener("animationend", () =>  { toTopButton.classList.add("hidden");}, {once: true} );
      toTopButtonVisible = false;
    }
  }
  
  // skjekker hvis det er mobil - da skal meny ikke fjernes ved scroll down

  if(window.innerWidth < 427)
  {
    if(subMenuIsMissing)
    {
      subMenu.classList.remove("slideOutSubMenu");
      subMenu.classList.remove("hidden");
      subMenu.classList.add("slideInMenuTop");
      mouseWheelMoved = false;
      subMenuIsMissing = false; 
    }
    return;
  }
  // går tilbake hvis det ikkke finnes en undermeny
  
  if(currentPage == "/om.html" || currentPage == "/index.html")  return;

  // rutine for å legge til og fjerne undermeny til ringene.html, maanene.html og romferdene.html hvis man scroller opp/ned
  
  if(prevScrollPos > currentScrollPos)
  {
      subMenu.classList.remove("slideOutSubMenu");
      subMenu.classList.remove("hidden");
      subMenu.classList.add("slideInMenuTop");
      mouseWheelMoved = false;
      subMenuIsMissing = false;
  }
  else if(mouseWheelMoved)
  {
    subMenu.classList.remove("slideInMenuTop");
    subMenu.classList.add("slideOutSubMenu");
    subMenu.addEventListener("animationend",  () => { subMenu.classList.add("hidden");
    subMenuIsMissing = true; }, { once: true});
    mouseWheelMoved = false;
  
  }  
  prevScrollPos = currentScrollPos;

}

// event listeners for wheel og scroll

window.addEventListener("wheel", () => { mouseWheelMoved = true; } );
window.addEventListener("scroll" ,animateSubMenu);



// intersection observer - skal animere inn månene først når de kommer til syne

const observerOptions =
{
  root: null, 
  rootMargin : "10px 0px",
  threshold : 0.3
}


function observerCallback(entries, observer)
{
  if(currentPage == "/index.html")  return;
  console.log(entries);
  entries.forEach((entry) => 
  {
    if(entry.isIntersecting) 
    {
      // legg inn fadeInFromBelowAnim
      entry.target.classList.remove("notVisible");
      entry.target.classList.add("fadeInFromBelowAnim");

      

       console.log("element is visible", entry.target.id);
    }
    else{
      console.log("element not visbile", entry.target.id);
    }
  });

}

const observer = new IntersectionObserver(observerCallback, observerOptions);

const allSections = document.querySelectorAll("section");
allSections.forEach((section) => 
{
  observer.observe(section);
});

translateButton.addEventListener("click", () =>
{
   switchLanguage();
  //   isNorwegian = !isNorwegian;

  //   languageSelected = isNorwegian ? mainMenuNorsk : mainMenuEng;

  //   if(isNorwegian)
  //     { localStorage.setItem("selectedLanguage", "norwegian");
  //        translateButton.textContent = "Tranlate to English";
  //       }
  //   else {
  //     localStorage.setItem("selectedLanguage", "english");
  //     translateButton.textContent = "Oversett til Norsk";
  //   }

  //   for(let i = 0; i < 6; ++i)
  //   {
  //      refArray[i].textContent = languageSelected[i];
  //   }
    
  // if(currentPage === "/ringene.html")
  // {
  //   const ringLanguageSelected = isNorwegian ? ringsMenuNorsk : ringsMenuEng;
  //   ringsMenuArray.forEach((item, index) =>
  //   { 
  //     item.textContent = ringLanguageSelected[index];
      
  //   })
  // } else  if(currentPage === "/maanene.html") moonsGeneral.textContent = isNorwegian ? moonsNorsk : moonsEng;
 
});


function switchLanguage()
{
  isNorwegian = !isNorwegian;
  const languageSelected = isNorwegian ? mainMenuNorsk : mainMenuEng;
  const toTopRef = document.getElementById("toTopRef");

  // sett i local storage hva språk som er valgt

  if(isNorwegian)
  { 
      localStorage.setItem("selectedLanguage", "norwegian");
      translateButton.textContent = "Tranlate to English";
      if(currentPage === "/ringene.html") toTopRef.href = "#beskrivelse";
      else if(currentPage === "/maanene.html") toTopRef.href = "#generelt";
          else if(currentPage === "/romferdene.html") toTopRef.href = "#pioneer11";
            else if(currentPage === "/om.html") toTopRef.href ="#om";
      
  }
  else 
  { 
      localStorage.setItem("selectedLanguage", "english");
      translateButton.textContent = "Oversett til Norsk";
      if(currentPage === "/ringene.html") toTopRef.href = "#beskrivelseEng";
      else if(currentPage === "/maanene.html") toTopRef.href = "#genereltEng";
           else if(currentPage === "/romferdene.html") toTopRef.href = "#pioneer11Eng";
              else if(currentPage === "/om.html") toTopRef.href ="#omEng";
  }

  for(let i = 0; i < 6; ++i)
  {
      refArray[i].textContent = languageSelected[i];
  }

  if(currentPage != "/index.html") 
  {
      const mainNorwegian = document.querySelector("#mainNorwegian");
      const mainEnglish = document.querySelector("#mainEnglish");

      if(!isNorwegian)
      {

        mainNorwegian.classList.add("hidden");
        mainEnglish.classList.remove("hidden");
        currentMain = mainEnglish;

      
        
      }
      else
      { 
        mainEnglish.classList.add("hidden");
        mainNorwegian.classList.remove("hidden");
        currentMain = mainNorwegian;
      }
  }
  
 

}