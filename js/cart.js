//get carts from local storage
const cartsInLocalStorage = JSON.parse(localStorage.getItem("carts"));
const getCartItems = document.querySelector("#cart__items");
const fragment = new DocumentFragment();
//create elements
const createElements = (val, id) => {
  const creatArticle = document.createElement("article");
  const creatDiv = document.createElement("div");
  const creatImg = document.createElement("img");
  const createCartItemContent = document.createElement("div")
  const createCartItemContentDescription = document.createElement("div");
  const createH2 = document.createElement("h2");
  const createParagraph = document.createElement("p");
  const createParagraphTwo = document.createElement("p");
  const createParagraphThree = document.createElement("p");
  const createParagraphFour = document.createElement("p");
  const deleteItem = document.createElement("p");
  const createCartItemContentSettings = document.createElement("div");
  const createCartItemContentSettingsQuantity = document.createElement("div");
  const createItemQuantityInput = document.createElement("input")
  const createCartItemContentSettingsDelete = document.createElement("div");

  creatArticle.setAttribute("class", "cart__item");
  creatArticle.setAttribute("data-index", `${id}`);
  creatArticle.setAttribute("data-id", `${id}`);
  creatArticle.setAttribute("data-color", "product-color");
  creatDiv.setAttribute("class", "cart__item__img");
  createParagraphThree.setAttribute("id", "price");
  createCartItemContent.setAttribute("class", "cart__item__content");
  createCartItemContentDescription.setAttribute("class","cart__item__content__description");
  createCartItemContentSettings.setAttribute("class","cart__item__content__settings");
  createCartItemContentSettingsQuantity.setAttribute("class","cart__item__content__settings__quantity");

  creatImg.setAttribute("src", `${val.image}`);
  creatImg.setAttribute("alt", `${val.altTxt}`);
  creatDiv.appendChild(creatImg);
  creatArticle.appendChild(creatDiv);
  creatArticle.appendChild(createCartItemContent);
  createCartItemContent.appendChild(createCartItemContentDescription);
  createParagraph.textContent = `${val.name}`;
  createParagraphTwo.textContent = `${val.color}`;
  //load this section from the api
  createParagraphThree.textContent = `€${val.originalPrice}`;
  createCartItemContentDescription.appendChild(createParagraph);
  createCartItemContentDescription.appendChild(createParagraphTwo);
  createCartItemContentDescription.appendChild(createParagraphThree);
  createCartItemContent.appendChild(createCartItemContentSettings);
  createCartItemContentSettings.appendChild(createCartItemContentSettingsQuantity)
  createParagraphFour.textContent = "Quantity :";
  createCartItemContentSettingsQuantity.appendChild(createParagraphFour);
  createItemQuantityInput.setAttribute("class","itemQuantity");
  createItemQuantityInput.setAttribute("type","number");
  createItemQuantityInput.setAttribute("name","itemQuantity")
  createItemQuantityInput.setAttribute("min","1")
  createItemQuantityInput.setAttribute("max","100")
  createItemQuantityInput.setAttribute("value",`${val.quantity}`);
  createItemQuantityInput.setAttribute("data-index", `${id}`);
  createCartItemContentSettingsQuantity.appendChild(createItemQuantityInput);
  createCartItemContentSettings.appendChild(createCartItemContentSettingsDelete)
  createCartItemContentSettingsDelete.setAttribute("class","cart__item__content__settings__delete");
  deleteItem.setAttribute("class", "deleteItem");
  deleteItem.setAttribute("data-delete-id", `${id}`);
  deleteItem.textContent = "Delete";
  createCartItemContentSettingsDelete.appendChild(deleteItem);
  fragment.appendChild(creatArticle);
}
cartsInLocalStorage.map((items, index) => {
  createElements(items, index) ;
});

getCartItems.appendChild(fragment);

//delete item in cart 
const items = document.querySelector(".cart");
items.addEventListener("click", (event) => {
  event.stopImmediatePropagation();
  const delete_id = event.target.dataset.deleteId;
  //console.log("fill",cartsInLocalStorage[delete_id]);
  if (event.target.classList.value === "deleteItem") {
    const filteredCarts = cartsInLocalStorage.filter((fill) => {
      let cartItems = cartsInLocalStorage[delete_id] !== fill;

      return cartItems;
    });

    //remove element
    //document.querySelector(`[data-id="${delete_id}"]`).remove();
    localStorage.setItem("carts",JSON.stringify(filteredCarts));
    window.location.reload();
    getTotal();
  }
});

//update Price based on Quantity
const article = document.querySelector("#cart__items");
article.addEventListener("click",(event) => {
  let quantity = Number(event.target.value);
  if (event.target.tagName === "INPUT") {
    event.stopPropagation();
    for (const el of cartsInLocalStorage) {
      const index = event.target.dataset.index;
      const m = cartsInLocalStorage[index];
      m.quantity = quantity;
      m.price = quantity * Number(m.originalPrice);
      localStorage.setItem("carts", JSON.stringify(cartsInLocalStorage));
      getTotal();
      return;
    }
  }
});

//total price
const totalPrice = document.querySelector("#totalPrice");
function getTotal() {
  const total = cartsInLocalStorage.reduce((total, num)=>{
    //return val;
    return (total + num.price);
  }, 0);
  totalPrice.textContent = total;
}
getTotal();

//form validation variables
const firstName = document.querySelector("#firstName");
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
const lastName = document.querySelector("#lastName");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
const address = document.querySelector("#address");
const addressErrorMsg = document.querySelector("#addressErrorMsg");
const city = document.querySelector("#city");
const cityErrorMsg = document.querySelector("#cityErrorMsg");
const email = document.querySelector("#email");
const emailErrorMsg = document.querySelector("#emailErrorMsg");
const order = document.querySelector("#order");


let timer = null;
let validateUsername = /^[a-zA-Z ]+$/;
let validateUserAddress = /^[a-zA-Z0-9\s,'-]*$/;
let validateUserEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

//show form error message
const validateUserInput = (val, showMsg, detail) => {
  if (!val) {
    showMsg.style.display = "block";
    showMsg.textContent = `Invalid ${detail}`;
  } else {
    showMsg.style.display = "none";
  }
}

//test for users email adress input
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

let userObj = {
  userName: ""
}

firstName.addEventListener("keydown", (e)=> {
  clearTimeout(timer);
  timer = setTimeout(()=> {
    let fname = e.target.value.trim().toUpperCase();
    validateUserInput(validateUsername.test(fname), firstNameErrorMsg, "first name");
    },100);
});

lastName.addEventListener("keydown", (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    let lname = e.target.value.trim();
    validateUserInput(validateUsername.test(lname), lastNameErrorMsg, "last name");
  }, 100);
});

address.addEventListener("keydown", (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    let adressName = e.target.value.trim();
    validateUserInput(validateUserAddress.test(adressName), addressErrorMsg, "adress");
    }, 100);
});

city.addEventListener("keydown", (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    let cityName = e.target.value.trim();
    validateUserInput(validateUserAddress.test(cityName), cityErrorMsg, "city name");
  }, 100);
})

email.addEventListener("keydown", (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    let emailAdress = e.target.value.trim();
    //validateEmail(emailAdress) ? console.log("valid") : console.log("not valid");
    validateUserInput(validateEmail(emailAdress), emailErrorMsg, "email adress");
    }, 100);
});
