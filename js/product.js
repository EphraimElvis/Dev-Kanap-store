const itemImg = document.querySelector(".item__img");
const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price")
const productDescription = document.querySelector("#description");
const selectColor = document.querySelector("#colors");
const addOrderItemtoCart = document.querySelector("#addToCart");
const quantity = document.querySelector("#quantity");
//retrieve all carts from local storage
let checkColorSelect = "";
let currentColor = null;
//track current state of order
const orderItem = { //orderItem
  productId: "",
  price: 0,
  color: "",
  quantity: 0,
}

//update order item color
const updateCartColor = (color) => {
  orderItem.color = color;
}
//sets order item value
const setQuantity = (qnt) => {
  orderItem.quantity = qnt;
}

const resetCartOnSubmit = () => {
  orderItem.productId = "";
  orderItem.color = "";
  orderItem.price = 0;
  orderItem.quantity = "";
}

//get page url id  
const params = new URLSearchParams(document.location.search);
let productId = params.get("id");
//update product id in the obj
orderItem.productId = productId;

//update quantity if color and product id already exist 

//get data based on product id
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((data) => {
    showImage(data);
})

  //chain  a catch, check how it works on the documentaion mdn

//display item
const showImage = (pr) => {  
  itemImg.innerHTML =`<img src=${pr.imageUrl} alt=${pr.altTxt}>`;
  productName.innerHTML = pr.name;
  productPrice.innerHTML = pr.price;
  productDescription.innerHTML = pr.description;
  //update orderItem obj
  orderItem.price = pr.price;
  createSelectOptions(pr);
}

//create select options
const createSelectOptions = (arr) => {
  arr.colors.map((color) => {
    const createOption = document.createElement('option');
    createOption.value = color;
    createOption.textContent = color;
    selectColor.appendChild(createOption);
  })
}

//check if order Item exist
const checkOrderItem = () => {
  //create an array of
    //product id
    //quantity of the product
    //color of the product
      //unfocused if the product is not selected

}

//be aware of different colors
//if is zero it should add

//select color
selectColor.addEventListener('change', (e)=> {
  let currentColor = e.target.value;
  checkColorSelect = e.target.value;
  //update orderItem color
  updateCartColor(currentColor);
  const checkQuantity = (orderItem.quantity === 0 ? 1 : orderItem.quantity);
  //update quantity
  setQuantity(checkQuantity);
})

//select quantity
quantity.addEventListener("change", (e) => {
  let currentQuantity = e.target.value;
  orderItem.quantity = Number(currentQuantity);
});

addOrderItemtoCart.addEventListener("click", (e) => {

  if (orderItem.color.length === 0) {
      alert("Please select Product Color");
      console.log("no item added to orderItem");
      return;
  }

  //add to cart

  const cartStorage = JSON.parse(localStorage.getItem('carts'));
  console.log("cartstorage",cartStorage)
  const carts = cartStorage || [];

  const already = carts.find( (product) => {
    const matchId = product.productId === orderItem.productId;
    const matchColor = product.color === orderItem.color;
    return matchId && matchColor;
  }) 
  console.log("already",already)
  if (already) {
    already.quantity = orderItem.quantity;
  } else {
    carts.push({
      "productId": orderItem.productId,
      "color": orderItem.color,
      "quantity": orderItem.quantity,
    });
  }
  
  //loop through all the carts
  localStorage.setItem("carts", JSON.stringify(carts));
});


