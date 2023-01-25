const itemImg = document.querySelector(".item__img");
const createImg = document.createElement("img");
const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const selectColor = document.querySelector("#colors");
const addOrderItemtoCart = document.querySelector("#addToCart");
const quantity = document.querySelector("#quantity");
const itemQuantity = document.querySelector(".itemQuantity");
//let getImage = null;
//track current state of order
const orderItem = { //orderItem
  productId: "",
  price: 0,
  color: "",
  quantity: 0,
  image: "",
  productName: "",
  altTxt: "",
}

//update order item color
const updateCartColor = (color) => {
  orderItem.color = color;
}
//sets order item value
const setQuantity = (qnt) => {
  orderItem.quantity = qnt;
}

//get page url id  
const params = new URLSearchParams(document.location.search);
let productId = params.get("id");
//update product id in the obj
orderItem.productId = productId;

//get data based on product id
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((data) => {
    showImage(data);
}).catch((err)=>{
  console.log(Error(err));
})

//display item
const showImage = (pr) => {  
  //itemImg.innerHTML =`<img src=${pr.imageUrl} alt=${pr.altTxt}>`;
  itemImg.appendChild(createImg);
  createImg.src = `${pr.imageUrl}`;
  createImg.alt = `${pr.altTxt}`;
  createImg.setAttribute("id","img_tag");
  productName.innerHTML = pr.name;
  productPrice.innerHTML = pr.price;
  productDescription.innerHTML = pr.description;
  //update order Item object
  orderItem.price = pr.price;
  orderItem.productName = pr.name;
  orderItem.image = pr.imageUrl;
  createSelectOptions(pr);
  //const getImage = document.getElementById("img_tag");
  //drawImage(getImage);
}

//create select options
const createSelectOptions = (arr) => {
  arr.colors.map((color) => {
    const createOption = document.createElement('option');
    createOption.value = color;
    createOption.textContent = color;
    selectColor.appendChild(createOption);
  });
}

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
      return;
  }
  //add to cart
  const cartStorage = JSON.parse(localStorage.getItem('carts'));
  const carts = cartStorage || [];
  const already = carts.find( (product) => {
    const matchId = product.productId === orderItem.productId;
    const matchColor = product.color === orderItem.color;
    return matchId && matchColor;
  }) 
  
  //update product price
  //make this a module sice it repeats in other js file
  if (already) {
    already.quantity += orderItem.quantity;
    already.price = already.originalPrice * Number(already.quantity);
    //console.log(" total price", already.originalPrice * Number(already.quantity));
  } else {
    //push to local array of onjects
    carts.push({
      "productId": orderItem.productId,
      "color": orderItem.color,
      "originalPrice": productPrice.textContent,
      "price": orderItem.price,
      "quantity": orderItem.quantity,
      "image": orderItem.image,
      "name": orderItem.productName,
      "altTxt": orderItem.altTxt,
    });
  }
  //loop through all the carts
  localStorage.setItem("carts", JSON.stringify(carts));
});

