let log = console.log;
let navBars = $('.small-sc-bar')
let burgerMenu = $('.menu')
let closeMenu = $('.burger-close')
let subnavContent = document.querySelectorAll('.subnav-content')
let subnavBtn = document.querySelectorAll('.subnav-btn')
let showSubNav = document.querySelectorAll('.right-arrow i')
let backArrow = document.querySelectorAll('.back-arrow')


$(burgerMenu).on('click', e => {
    $(navBars).slideToggle(200);
    $(burgerMenu).css('display', 'none')
    log(navBars)

});

//close
$(closeMenu).on('click', e => {
    $(navBars).slideUp(150)
    $(burgerMenu).slideToggle(250)
})


///show sun nav
showSubNav.forEach(arrows=>{
    arrows.addEventListener('click', e => {
        let subBtn = e.target.parentElement.parentElement
        $(subnavBtn).slideToggle(200)
        let content = e.target.parentElement.parentElement.nextSibling.nextSibling
        $(content).slideToggle(150)
    })
})

/// sub nav back arrow
backArrow.forEach(backArrow=> {
    backArrow.addEventListener('click', mainMenu);
})
function mainMenu() {
    $(subnavContent).css('display', 'none')
    $(subnavBtn).slideToggle(200)
}

// ======================================//
let slides = 0
slideShow()

function slideShow() {
    let mySlides = document.querySelectorAll('.my-slides')
    for(let i = 0; i < mySlides.length; i++){
        mySlides[i].style.display = 'none'
    }
    slides++
    if(slides > mySlides.length){
        slides = 1
    }
    mySlides[slides-1].style.display = 'block'
    setTimeout(slideShow, 2500)
}