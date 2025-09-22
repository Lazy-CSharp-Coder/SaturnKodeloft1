let darkMode = true;
let hamMenuShowing = false;
let subMenuShowing = false;
let mouseWheelMoved = false;

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
    navListElement.addEventListener("animationend", () => { navListElement.classList.add("hidden"); navListElement.classList.remove("hideHeaderMenu"); console.log('Animation slutt!');  });

    hamMenuShowing = false;
  }
}

function subMenuToggle()
{
  console.log("inne i sub meny toggle");

  const subListElement = document.getElementById("subMenu");
  console.log(subListElement);

  if(subMenuShowing == false)
  {
    subListElement.classList.remove("hidden");
    // subListElement.classList.remove("hideSubMenu");
    subListElement.classList.add("showSubMenu");
    subMenuShowing = true;
  }
  else 
  {
    subListElement.classList.remove("showSubMenu");
    subListElement.classList.add("hideSubMenu");
    subListElement.addEventListener("animationend", () => { 

        // subListElement.classList.remove("showSubMenu");
        subListElement.classList.add("hidden"); 
        subListElement.classList.remove("hideSubMenu"); 
        console.log('Animation slutt!');  });
    
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
  }
  else
  {  mainElement.classList.remove("lightMode");
     darkMode = true;
   }
}

// event listener for mousemove

let prevScrollPos = window.scrollY;

function animateSubMenu () 
{
  const currentScrollPos = window.scrollY;
  const subMenu = document.getElementById("subMenuDiv");
  console.log("hi from eventlistenere for mousemove");
  if(prevScrollPos > currentScrollPos)
  {

      subMenu.classList.remove("hidden");
      // subMenu.classList.remove("slideOutSubMenu");
      subMenu.classList.add("slideInMenuTop");
      console.log("hi from slide in");
  }
  else 
  {
    // subMenu.classList.remove("slideInMenuTop");
    // subMenu.classList.add("slideOutSubMenu");
    subMenu.classList.add("slideOutSubMenu");
    subMenu.classList.remove("slideInMenuTop");
     subMenu.addEventListener("animationend",  () => {

      subMenu.classList.add("hidden");
      subMenu.classList.remove("slideOutSubMenu");
  

    });
   
    console.log("hi from slide out");
  }  
  prevScrollPos = currentScrollPos;

}
window.addEventListener("scroll" ,animateSubMenu);
window.addEventListener("wheel", () => { mouseWheelMoved = true; } );





  // const navListElement = document.querySelector(".navList"); // Bevist brukt klasse for kun et element med det klassenavnet
  // console.log(navListElement);

  // Metode 1: Skrive CSS i JS som blir inline-CSS
  // navListElement.style.display = "flex";
  // navListElement.style.flexDirection = "column";

  // Metode 2: Endre aktivt klassenavn via external-CSS fil
  /*navListElement.classList.add("show");
  navListElement.classList.remove("hidden");*/


// Gjør funksjonen tilgjengelig i globalt scope slik at den kan brukes i inline onclick-egenskaper.
//globalThis.hamburgerToggle = hamburgerToggle;


