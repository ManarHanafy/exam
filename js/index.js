/// <reference types="../@types/jquery" />

window.history.pushState(null, null, window.location.href);
window.onpopstate = function(event) {
    window.history.pushState(null, null, window.location.href);
};
window.onload = function() {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        window.location.href = 'index.html'; 
    }
};

let nameInput=document.querySelector('#nameInput');
let emailInput=document.querySelector('#emailInput');
let phoneInput=document.querySelector('#phoneInput');
let ageInput=document.querySelector('#ageInput');
let passwordInput=document.querySelector('#passwordInput');
let repasswordInput=document.querySelector('#repasswordInput');

if(location.pathname=='/Contact Us.html'){
nameInput.addEventListener('input',function(){
    validationData(this);
})
emailInput.addEventListener('input',function(){
    validationData(this);
})
phoneInput.addEventListener('input',function(){
    validationData(this);
})
ageInput.addEventListener('input',function(){
    validationData(this);
})
passwordInput.addEventListener('input',function(){
    validationData(this);
})
repasswordInput.addEventListener('input',function(){
    validationData(this);
})
}

const searchByName = document.querySelector("#search_input");
const SearchByFirstLetter = document.querySelector("#search_fName");

let link = document.querySelectorAll('.cursor-pointer')
for (let i = 0; i < link.length; i++) {

}

$(function () {
    $('.loader').fadeOut(4000)
    $('.loading').fadeOut(1000, function () {
        $('body').css('overflow', 'auto')
        $('.loading').remove()
    })
})

$('.open-close-icon').on('click', function () {
    if ($('.open-close-icon').hasClass('fa-x')) {
        $('.open-close-icon').removeClass('fa-x')
        $('.open-close-icon').addClass('fa-align-justify')
        $('.list-unstyled').addClass('overflow-hidden')
        $('.side-nav-menu').animate({ left: '-256.562px' }, 500)
    }
    else {
        $('.side-nav-menu').animate({ left: '0' })
        $('.list-unstyled').removeClass('overflow-hidden')
        $('.open-close-icon').removeClass('fa-align-justify')
        $('.open-close-icon').addClass('fa-x')
    }
})
$('.cursor-pointer').on('click', (function (e) {
    e.preventDefault();
    var pageName = $(this).text();
    var pageUrl = pageName + ".html";
    window.location.href = pageUrl;
}));


async function getAllCategories() {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        const data = await res.json()
        const categList = data.meals
        displayAllCategories(categList)

    } catch (error) {
        console.log(error);
    }
}
getAllCategories()
function displayAllCategories(list) {
        let cartona = ``
        for (let i = 0; i < list.length; i++) {
            cartona += `
            <div class="col-md-3 meal position-relative overflow-hidden rounded-3 cursor-pointer overflow-auto meal" id="${list[i].idMeal}">
                    <img class="w-100 rounded-3" src="${list[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${list[i].strMeal}</h3>
                    </div>
                </div>
            `}
            if (document.querySelector("#rowCateg")) document.querySelector("#rowCateg").innerHTML = cartona
    
        let mealCards = document.querySelectorAll(".meal")
        for (let i = 0; i < mealCards.length; i++) {
            mealCards[i].addEventListener("click", () => {
                localStorage.setItem("mealID", mealCards[i].getAttribute("id"))
                location.href = "../mealDetails.html"
            })
    
        }
}

if(location.pathname=='/Search.html'){searchByName.addEventListener('input', function () {
    APISearch(this.value)
})}
async function APISearch(meal) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        const data = await res.json()
        displaySearchByName(data.meals)
    } catch (error) {
        console.log(error);
    }
}
function displaySearchByName(list) {
    let cartona = ``
    for (let i = 0; i < list.length; i++) {
        cartona += `
        <div class="col-md-3 meal position-relative overflow-hidden rounded-3 cursor-pointer overflow-auto meal" id="${list[i].idMeal}">
                <img class="w-100 rounded-3" src="${list[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${list[i].strMeal}</h3>
                </div>
            </div>
        `}
    if (document.querySelector("#searchName")) document.querySelector("#searchName").innerHTML = cartona

    let mealCards = document.querySelectorAll(".meal")
    for (let i = 0; i < mealCards.length; i++) {
        mealCards[i].addEventListener("click", () => {
            localStorage.setItem("mealID", mealCards[i].getAttribute("id"))
            location.href = "../mealDetails.html"
        })

    }
}

if(location.pathname=='/Search.html'){SearchByFirstLetter.addEventListener('input', function () {  
    if(this.value==""){
        APISearch2("a")
    }
    else{
        APISearch2(this.value)
    }   
})}
async function APISearch2(letter) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        const data = await res.json()
        displaySearchByName(data.meals)
    } catch (error) {
        console.log(error);
    }
}

async function APImealDetails(id) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        let meal = await res.json()
        displaymealDetails(meal.meals)
        
    } catch (error) {
        console.log(error);
    }
}

if (location.pathname == "/mealDetails.html") {
    APImealDetails(localStorage.getItem("mealID"))
}
function displaymealDetails(meal){
    let tage=Array(meal[0].strTags);
    
    let cartona = `
          <div class="col-md-4 ps-5 mt-5 text-white">
            <img class="w-100 rounded-3" src=${meal[0].strMealThumb} alt="" />
            <h2>${meal[0].strMeal}</h2>
          </div>
          <div class="col-md-8 mx-auto mt-5 text-white">
            <h2>Instructions</h2>
            <p class="my-3 lh-lg text-white">
            ${meal[0].strInstructions}
            </p>
            <h4 class="my-2 fw-bold">Area : <span class=" fw-normal">${meal[0].strArea}</span></h4>
            <h4 class="my-2 fw-bold">Category :  <span class=" fw-normal">${meal[0].strCategory}</span></h4>
            <h4 class="my-2 fw-bold">Recipes : </h4>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${meal[0].strMeasure1}  Sushi Rice</li>
                    <li class="alert alert-info m-2 p-1">${meal[0].strMeasure2} Rice wine</li>
                    <li class="alert alert-info m-2 p-1">${meal[0].strMeasure3} tbs Caster Sugar</li>
                    <li class="alert alert-info m-2 p-1">${meal[0].strMeasure4} tbs Mayonnaise</li>
                    <li class="alert alert-info m-2 p-1">${meal[0].strMeasure5} tbs Rice wine</li>
                    <li class="alert alert-info m-2 p-1">${meal[0].strMeasure6} tbs Soy Sauce</li>
                    <li class="alert alert-info m-2 p-1">${meal[0].strMeasure7} Cucumber</li>
            </ul>
            <h4 class="my-4 fw-bold">Tags : </h4>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tage.map((ele) => {
                if(ele==null)
                    return " "
                return `<li class="alert alert-danger m-2 p-1">${ele}</li>`
            }).join(" ")}     
                </ul>
            <a href="${meal[0].strSource}"><button class="btn btn-success my-1">Source</button></a>
            <a href="${meal[0].strYoutube}"><button class="btn bg-danger text-white my-1">Youtube</button></a>
          </div>
`

    document.getElementById("rowDetails").innerHTML = cartona
}


async function getCategories() {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        const data = await res.json()
        const categList = data.categories
        displayCategories(categList)

    } catch (error) {
        console.log(error);
    }
}
if(location.pathname=="/Categories.html"){getCategories()}
function displayCategories(list) {
    let cartona = ``
    for (let i = 0; i < list.length; i++) {
        cartona += `
        <div class="col-md-3 meal position-relative overflow-hidden rounded-3 cursor-pointer overflow-auto catedory" id="${list[i].strCategory}">
                <img class="w-100 rounded-3" src="${list[i].strCategoryThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute text-center text-black p-1 rounded-3">
                    <h3>${list[i].strCategory}</h3>
                    <p>${list[i].strCategoryDescription}</p>
                </div>
            </div>
        `}
        if (document.querySelector("#rowCategory")) document.querySelector("#rowCategory").innerHTML = cartona

    let categoryCards = document.querySelectorAll(".catedory")
    for (let i = 0; i < categoryCards.length; i++) {
        categoryCards[i].addEventListener("click", () => {
            localStorage.setItem("categoryID", categoryCards[i].getAttribute("id"))
            location.href = "../listOfCategory.html"
        })

    }
}
if (location.pathname == "/listOfCategory.html") {
    APIlistOfCategory(localStorage.getItem("categoryID"))
}
async function APIlistOfCategory(str) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${str}`)
        let meal = await res.json()
        displaylistOfCategory(meal.meals)
    } catch (error) {
        console.log(error);
    }
}
function displaylistOfCategory(list){
    let cartona = ``
        for (let i = 0; i < list.length; i++) {
            cartona += `
            <div class="col-md-3 meal position-relative overflow-hidden rounded-3 cursor-pointer overflow-auto meal" id="${list[i].idMeal}">
                    <img class="w-100 rounded-3" src="${list[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${list[i].strMeal}</h3>
                    </div>
                </div>
            `}
            if (document.querySelector("#rowListCateg")) document.querySelector("#rowListCateg").innerHTML = cartona
    
        let mealCards = document.querySelectorAll(".meal")
        for (let i = 0; i < mealCards.length; i++) {
            mealCards[i].addEventListener("click", () => {
                localStorage.setItem("mealID", mealCards[i].getAttribute("id"))
                location.href = "../mealDetails.html"
            })
    
        }
}


async function getArea() {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        const data = await res.json()
        const AreaList = data.meals
        displayArea(AreaList)

    } catch (error) {
        console.log(error);
    }
}
if(location.pathname=="/Area.html"){getArea()}
function displayArea(list){
    let cartona = ``
        for (let i = 0; i < list.length; i++) {
            cartona += `
            <div class="col-md-3 text-center text-white meal position-relative overflow-hidden rounded-3 cursor-pointer overflow-auto meal" id="${list[i].strArea}">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${list[i].strArea}</h3>
                </div>
            `}
            if (document.querySelector("#rowArea")) document.querySelector("#rowArea").innerHTML = cartona
    
        let mealCards = document.querySelectorAll(".meal")
        for (let i = 0; i < mealCards.length; i++) {
            mealCards[i].addEventListener("click", () => {
                localStorage.setItem("AreaID", mealCards[i].getAttribute("id"))
                location.href = "../listOfArea.html"
            })
    
        }
}
if (location.pathname == "/listOfArea.html") {
    APIlistOfArea(localStorage.getItem("AreaID"))
}
async function APIlistOfArea(str) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${str}`)
        let meal = await res.json()
        displaylistOfArea(meal.meals);
    } catch (error) {
        console.log(error);
    }
}
function displaylistOfArea(list){
    let cartona = ``
        for (let i = 0; i < list.length; i++) {
            cartona += `
            <div class="col-md-3 meal position-relative overflow-hidden rounded-3 cursor-pointer overflow-auto meal" id="${list[i].idMeal}">
                    <img class="w-100 rounded-3" src="${list[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${list[i].strMeal}</h3>
                    </div>
                </div>
            `}
            if (document.querySelector("#rowAreaList")) document.querySelector("#rowAreaList").innerHTML = cartona
    
        let mealCards = document.querySelectorAll(".meal")
        for (let i = 0; i < mealCards.length; i++) {
            mealCards[i].addEventListener("click", () => {
                localStorage.setItem("mealID", mealCards[i].getAttribute("id"))
                location.href = "../mealDetails.html"
            })
    
        }
}


async function getIngredients() {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        const data = await res.json()
        const IngredientsList = data.meals
        displayIngredients(IngredientsList)

    } catch (error) {
        console.log(error);
    }
}
if(location.pathname=="/Ingredients.html"){getIngredients()}
function displayIngredients(list){
    let cartona = ``
        for (let i = 0; i < 20; i++) {
            cartona += `
            <div class="col-md-3 text-center text-white meal position-relative overflow-hidden rounded-3 cursor-pointer overflow-auto chicken" id="${list[i].strIngredient}">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${list[i].strIngredient}</h3>
                        <p>${list[i].strDescription}</p>
                </div>
            `}
            if (document.querySelector("#rowIngredients")) document.querySelector("#rowIngredients").innerHTML = cartona
    
        let mealCards = document.querySelectorAll(".meal")
        for (let i = 0; i < mealCards.length; i++) {
            mealCards[i].addEventListener("click", () => {
                localStorage.setItem("IngredientsID", mealCards[i].getAttribute("id"))
                location.href = "../listOfIngredients.html"
            })
    
        }
}
if (location.pathname == "/listOfIngredients.html") {
    APIlistOfIngredients(localStorage.getItem("IngredientsID"))
}
async function APIlistOfIngredients(str) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${str}`)
        let meal = await res.json()
        displaylistOfIngredients(meal.meals);
    } catch (error) {
        console.log(error);
    }
}
function displaylistOfIngredients(list){
    let cartona = ``
        for (let i = 0; i < list.length; i++) {
            cartona += `
            <div class="col-md-3 meal position-relative overflow-hidden rounded-3 cursor-pointer overflow-auto meal" id="${list[i].idMeal}">
                    <img class="w-100 rounded-3" src="${list[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${list[i].strMeal}</h3>
                    </div>
                </div>
            `}
            if (document.querySelector("#rowIngredientsList")) document.querySelector("#rowIngredientsList").innerHTML = cartona
    
        let mealCards = document.querySelectorAll(".meal")
        for (let i = 0; i < mealCards.length; i++) {
            mealCards[i].addEventListener("click", () => {
                localStorage.setItem("mealID", mealCards[i].getAttribute("id"))
                location.href = "../mealDetails.html"
            })
    
        }
}



function validationData(element) {
    var regex = {
        nameInput: /^[A-Za-z\s]+$/,
        emailInput: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        phoneInput: /^0\d{9,10}$/, 
        ageInput: /^(1?[0-9]{1,2}|200)$/, 
        passwordInput: /^(?=.*[A-Za-z])[A-Za-z0-9]{8,}$/,
    };
    if (element.id === 'repasswordInput') {
        const passwordInput = document.getElementById('passwordInput');
        const doPasswordsMatch = passwordInput.value === element.value;
        if (!doPasswordsMatch) {
            element.nextElementSibling.classList.replace('d-none', 'd-block');
            return false;
        } else {
            element.nextElementSibling.classList.replace('d-block', 'd-none');
        }
    }
    if (regex[element.id].test(element.value)) {
        element.nextElementSibling.classList.replace('d-block', 'd-none');
    } else {
        element.nextElementSibling.classList.replace('d-none', 'd-block');
    }
}

function checkAllValid() {
    const inputs = document.querySelectorAll('#rowData input');
    const allValid = Array.from(inputs).every(input => {
        return input.value && document.getElementById(`${input.id}Alert`).classList.contains('d-none');
    });
    const submitBtn = document.querySelector("#submitBtn");
    submitBtn.disabled = !allValid; 
}
document.querySelectorAll('#rowData input').forEach(input => {
    input.addEventListener('input', () => {
        validationData(input);
        checkAllValid();
    });
});