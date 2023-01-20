//get carts from local storage
const cartsInLocalStorage = JSON.parse(localStorage.getItem("carts"));

//console.log(cartsInLocalStorage)

//get image
// let productId = "77711f0e466b4ddf953f677d30b0efc9";
// //`http://localhost:3000/api/products/${productId}`
// fetch(`http://localhost:3000/api/products/`)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
// });

const getCartItems = document.querySelector("#cart__items");
const fragment = new DocumentFragment();
//create elements
const createElements = (val) => {
  
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
  creatArticle.setAttribute("data-id", "product-ID");
  creatArticle.setAttribute("data-color", "product-color");
  creatDiv.setAttribute("class", "cart__item__img");
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
  createParagraphThree.textContent = `${val.price}`;
  createCartItemContentDescription.appendChild(createParagraph);
  createCartItemContentDescription.appendChild(createParagraphTwo);
  createCartItemContentDescription.appendChild(createParagraphThree);
  createCartItemContent.appendChild(createCartItemContentSettings);
  createCartItemContentSettings.appendChild(createCartItemContentSettingsQuantity)
  createParagraphFour.textContent = "Quantity :";
  createCartItemContentSettingsQuantity.appendChild(createParagraphFour);
  createItemQuantityInput.setAttribute("class","itemQuantity")
  createItemQuantityInput.setAttribute("type","number");
  createItemQuantityInput.setAttribute("name","itemQuantity")
  createItemQuantityInput.setAttribute("min","1")
  createItemQuantityInput.setAttribute("max","100")
  createItemQuantityInput.setAttribute("value",`${val.quantity}`);
  createCartItemContentSettingsQuantity.appendChild(createItemQuantityInput);
  createCartItemContentSettings.appendChild(createCartItemContentSettingsDelete)
  createCartItemContentSettingsDelete.setAttribute("class","cart__item__content__settings__delete");
  deleteItem.setAttribute("class", "deleteItem");
  deleteItem.textContent = "Delete";
  createCartItemContentSettingsDelete.appendChild(deleteItem);
  fragment.appendChild(creatArticle);
}

cartsInLocalStorage.map((items) => {
  createElements(items);
});

getCartItems.appendChild(fragment);

//file reader