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
  creatArticle.setAttribute("data-id", "product-ID");
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

//delete implementation
// const dels = document.querySelectorAll(".deleteItem");
// dels.forEach((del, index)=> {
//   del.addEventListener("click", (e)=> {
//    const fl = cartsInLocalStorage.filter((fill) => {
//       let d = cartsInLocalStorage[index] !== fill
//       return d;
//     });
//     localStorage.setItem("carts",JSON.stringify(fl));
//     window.location.reload();
//   });
// });

//delete implementation
const items = document.querySelector(".cart");
items.addEventListener("click", (event) => {
  event.stopImmediatePropagation();
  const delete_id = event.target.dataset.deleteId;
  if (event.target.classList.value === "deleteItem") {
    const filteredCarts = cartsInLocalStorage.filter((fill) => {
      let cartItems = cartsInLocalStorage[delete_id] !== fill;
        console.log(cartItems);
        return cartItems;
    });
    localStorage.setItem("carts",JSON.stringify(filteredCarts));
    window.location.reload();
  }
});

//const priceId = document.getElementById("price");
//update item quantity and price
// const updateCartQuantity = document.querySelectorAll(".itemQuantity");
// for (let i = 0; i < updateCartQuantity.length; i++) {
//   updateCartQuantity[i].addEventListener("change",(e) => {
//     let quantity = Number(e.currentTarget.value);
//     let totalOfQuantity = quantity * Number(priceId.textContent.slice(1));
//     for (const el of cartsInLocalStorage) {
//       const m = cartsInLocalStorage[i];
//       m.quantity += quantity;
//       m.price = totalOfQuantity;
//       updateTotal();
//       localStorage.setItem("carts", JSON.stringify(cartsInLocalStorage));
//       return;
//     }
//   })
// }

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

//on page load display total price in cart
window.addEventListener("load",()=>{
  getTotal();
})

//form validation
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


let timer, timer2 = null;

firstName.addEventListener("keydown", (e)=> {
  clearTimeout("timer cleared....",timer);
  let fname = e.target.value.trim();
  timer = setTimeout(()=> {
    console.log("length", fname.length, fname.trim());
  },400);

  
  if (fname.length < 2) {
    timer = setTimeout(()=> {
      firstNameErrorMsg.style.display = "block";
      firstNameErrorMsg.textContent = "user name does not meet the minimum length"
      console.log("user name does not meet the minimum length", typeof fname);
    }, 500);
  } 
  else if (typeof fname === "number" ) {
    timer = setTimeout(()=> {
      firstNameErrorMsg.style.display = "block";
      firstNameErrorMsg.textContent = "Please enter valid character";
      console.log("Please enter valid character", typeof fname);
    }, 500);
  } else if (firstName.length === 0 ) {
    timer = setTimeout( ()=> {
      firstNameErrorMsg.style.display = "none";
    }, 500)
  }
  else {
    timer = setTimeout(()=> {
      firstNameErrorMsg.setAttribute("display", "none");
      //firstNameErrorMsg.textContent = "Please enter valid character";
      console.log("valid character entered", typeof fname);
    }, 500)
  }
})

// firstName.addEventListener("keyup", (e) => {
//   clearTimeout("timer cleared....",timer);
// })

