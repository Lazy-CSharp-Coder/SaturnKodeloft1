let darkMode = true;
let hamMenuShowing = false;
let subMenuShowing = false;
let mouseWheelMoved = false;
let subMenuIsMissing = false;
let toTopButtonVisible = false;
const topButtonYLimit = 300;

// her finner jeg ut om brukeren har skiftet til lightMode

const chosenTheme = localStorage.getItem("selectedTheme") ;

if(chosenTheme != null) if(chosenTheme === "lightMode") darkLightModeToggle();
else localStorage.setItem("selectedTheme", "darkMode");

// ********************************************************

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

function darkLightModeToggle() 
{
  console.log("hi from darkLight mode");
  
  const mainElement = document.querySelector(".mainClass");
  // const imgElements = document.querySelector(".imgClass");
  if(darkMode)
  {
    mainElement.classList.add("lightMode");
    // imgElements.classList.add("ligthModeImages");
    darkMode = false;
    localStorage.setItem("selectedTheme", "lightMode");
  }
  else
  {  mainElement.classList.remove("lightMode");
     localStorage.setItem("selectedTheme", "darkMode");
     darkMode = true;

   }
}

// event listener for mousemove

let prevScrollPos = window.scrollY;

function animateSubMenu () 
{
  const currentScrollPos = window.scrollY;
  const subMenu = document.getElementById("subMenuDiv");
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
    return :
  }
  // går tilbake hvis det ikkke finnes en undermeny
  
  if(window.location.pathname == "/om.html" || window.location.pathname == "/index.html")  return;

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
