let darkMode = true;
let hamMenuShowing = false;
let subMenuShowing = false;
let mouseWheelMoved = false;
let subMenuIsMissing = false;
let toTopButtonVisible = false;
const topButtonYLimit = 300;
let isNorwegian = true;
let hasHamLanguageBeenAdded = false;
const mobileLanguageListElementId = "mobileLanguageId"
let viewPort = window.innerWidth;

console.log("Viewport is now : " + viewPort);
let mobileMode = viewPort <= 500 ? true : false;
let tabletMode = viewPort > 501 && viewPort < 1024 ? true : false;

const mainMenuEng = ["Home", "About", "Ring system", "Moons", "Expeditions", "D/L Lightmode"];
const mainMenuNorsk = ["Hjem", "Om", "Ringene", "Månene", "Romferdene", "D/L Lysmodus"];
const lightModeUrl = "Images/sunblazinglogo.png";
const darkModeUrl = "Images/moonbluelogo2.png";

const pageTitle = document.title;
console.log("du er nå pa side :" +  pageTitle);

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

const cassiniLaunchImgArray = 
[
    "Images/launchcassini.jpg",
    "Images/launchcassini2.jpg",
    "Images/launchcassini3.jpg"
];


function swapCassiniLaunch()
{
   const lowerLimit = 1800;
   const cassiniLaunchImg = document.getElementById("cassiniLaunchImg");
   if(viewPort > lowerLimit) 
   {
     
      cassiniLaunchImg.src = cassiniLaunchImgArray[2];
    } 
    else cassiniLaunchImg.src = cassiniLaunchImgArray[0];
}

// swapCassiniLaunch();

function updateViewportInfo()
{
  viewPort = window.innerWidth;
  console.log("Viewport is now : " + viewPort);
  mobileMode = viewPort <= 426 ? true : false;
  tabletMode = viewPort > 426 && viewPort < 1024 ? true : false;
}

// const chosenLanguage = localStorage.getItem("selectedLanguage");
chosenLanguage = undefined;
if(!chosenLanguage) 
{
    const selectionDiv = document.querySelector("#selectionDiv");
    if(selectionDiv)
    {
      const mainNorwegian = document.querySelector("#mainNorwegian");
      mainNorwegian.classList.add("hidden");

       selectionDiv.classList.remove("hidden");
       
      const lanugugeButton = document.querySelector("#languageButton");
      if(lanugugeButton)
      {
         languageButton.addEventListener("clicked", () =>
        {
            const englishRadio = document.querySelector("#englishRadio");
            // if(englishRadio.checked == true) switchLanguage();
           
        });
      }
    }
    localStorage.setItem("selectedLanguage", isNorwegian ? "norwegian": "english");
    
}

// }
// if(chosenLanguage == "english")
// {
    
//      switchLanguage();
   
    
// } else localStorage.setItem("selectedLanguage", "norwegian");


// her finner jeg ut om brukeren har skiftet til lightMode

const chosenTheme = localStorage.getItem("selectedTheme") 
if(chosenTheme) if(chosenTheme === "lightMode") darkLightModeToggle();
                else localStorage.setItem("selectedTheme", "darkMode");


function animateOutHeaderMenu()
{ 
  const navListElement = document.getElementById("headerMenu");
  console.log(navListElement);
   navListElement.classList.remove("show");
    navListElement.classList.add("hideHeaderMenu");
    navListElement.addEventListener("animationend", () => { navListElement.classList.add("hidden"); navListElement.classList.remove("hideHeaderMenu"); console.log('Animation slutt!');  }, {once: true});

    hamMenuShowing = false;

}

function hamburgerToggle() 
{
  console.log("Hi from hamburgerToggle");

  const navListElement = document.getElementById("headerMenu");
  console.log(navListElement);

  if(hamMenuShowing == false) 
  {
    navListElement.classList.remove("hidden");
    navListElement.classList.add("show");

    // legge inn nytt element...translate to english
    if(hasHamLanguageBeenAdded === false)
    {
      const translateListElement = document.createElement("li");
      translateListElement.id = mobileLanguageListElementId;
      if(isNorwegian) translateListElement.textContent = "Switch to English";
      else translateListElement.textContent = "Bytt til Norsk";
      translateListElement.classList.add("laguageListItemMobile")
      navListElement.appendChild(translateListElement);
      hasHamLanguageBeenAdded = true;
      
      translateListElement.addEventListener("click", ()=>
      {
        if(subMenuShowing)
        { 
          console.log("Sub menu showing is : " + subMenuShowing);
          const subListElement = document.getElementById(isNorwegian ? "subMenu" : "subMenuEng");
          subListElement.classList.remove("showSubMenu");
          subListElement.classList.add("hidden");
          subMenuShowing = false;
          switchLanguage();
          subMenuToggle();
          
        } else switchLanguage();
          isNorwegian ? translateListElement.textContent = "Switch to English" : "Bytt til Norsk";
    
      });
    }

    console.log("showing ham menu");
    hamMenuShowing = true;

  }
  else
  {
    animateOutHeaderMenu();
  }
}

function subMenuToggle()
{
  const subMenuId = isNorwegian ? "subMenu" : "subMenuEng";
  const subListElement = document.getElementById(subMenuId);
  console.log(subListElement);

  if(subMenuShowing == false)
  {
    subListElement.classList.remove("hidden");
    subListElement.classList.add("showSubMenu");
    if(pageTitle == "Expeditions")
    {
      console.log("chaningin position expeditions");
      subListElement.style.right = "21%";
    } else if(pageTitle == "Rings") subListElement.style.right = "29%";
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
        
         subListElement.classList.add("hidden");
    }
 
   
} 


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
   if(mobileMode) setDarkLightModeMobileText();
   if(mobileMode && hamMenuShowing) animateOutHeaderMenu();

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
  
  if(pageTitle == "Home" || pageTite == "About")  return;

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
  if(pageTitle == "Home") return;
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
  updateViewportInfo();
   switchLanguage(true);
 
 
});


function switchLanguage()
{
  isNorwegian = !isNorwegian;
  const languageSelected = isNorwegian ? mainMenuNorsk : mainMenuEng;
  const toTopRef = document.getElementById("toTopRef");

  // sett i local storage hva språk som er valgt
  const textWSCreated = document.getElementById("textWSCreated");
  
  if(isNorwegian)
  { 
      localStorage.setItem("selectedLanguage", "norwegian");
      translateButton.textContent = "Tranlate to English";
      if(currentPage === "/ringene.html") toTopRef.href = "#beskrivelse";
      else if(currentPage === "/maanene.html") toTopRef.href = "#generelt";
          else if(currentPage === "/romferdene.html") toTopRef.href = "#pioneer11";
            else if(currentPage === "/om.html") toTopRef.href ="#om";

     textWSCreated.textContent = "Web side laget av";
  }
  else 
  { 
      localStorage.setItem("selectedLanguage", "english");
      translateButton.textContent = "Oversett til Norsk";
      if(currentPage === "/ringene.html") toTopRef.href = "#beskrivelseEng";
      else if(currentPage === "/maanene.html") toTopRef.href = "#genereltEng";
           else if(currentPage === "/romferdene.html") toTopRef.href = "#pioneer11Eng";
              else if(currentPage === "/om.html") toTopRef.href ="#omEng";
      textWSCreated.textContent = "Web page created by";
  }

  for(let i = 0; i < 6; ++i)
  {
      refArray[i].textContent = languageSelected[i];
  }


  const mainNorwegian = document.querySelector("#mainNorwegian");
  const mainEnglishId = pageTitle == "Home" ? "#mainNorwegian" : "#mainEnglish";
  const mainEnglish = document.querySelector(mainEnglishId);


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
  darkMode = !darkMode;
  darkLightModeToggle();

    // legge inn nytt element...translate to english
    if(mobileMode)
    {
      const translateListElement = document.getElementById(mobileLanguageListElementId);
      console.log(translateListElement);
      if(translateListElement)
      {
        if(isNorwegian) translateListElement.textContent = "Switch to English";
        else translateListElement.textContent = "Bytt til Norsk";
      }
      if(hamMenuShowing) animateOutHeaderMenu();
      // if(subMenuShowing)
      // {
       
      //   const subMenuId = isNorwegian ? "subMenEng" : "subMenu";
      //   const subListElement = document.getElementById(subMenuId);
      //   console.log(subListElement);

      //   subListElement.classList.remove("showSubMenu");
      //   subListElement.classList.add("hidden"); 
      //   subMenuShowing = false;
      //   subMenuToggle();
       
      // }


    }

}

function setDarkLightModeMobileText()
{
  const darkLightMenuItem = document.getElementById("darklighthamburger");
  darkLightMenuItem.textContent = isNorwegian ? darkMode ? "Lys modus" : "Mørk modus" : darkMode ? "Light mode": "Dark mode";

}

setDarkLightModeMobileText();