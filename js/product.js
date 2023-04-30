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
  _id: "",
  price: 0,
  color: "",
  quantity: 0,
  image: "",
  name: "",
  altTxt: "",
}

//get page id
function getPageId () { 
  const params = new URLSearchParams(document.location.search);
  let _id = params.get("id");
  return _id;
}

//export { getPageId }

//update order item color
const updateCartColor = (color) => {
  orderItem.color = color;
}
//sets order item value
const setQuantity = (qnt) => {
  orderItem.quantity = qnt;
}

orderItem._id = getPageId();


//get data based on product id
fetch("http://localhost:3000/api/products/" + getPageId())
  .then((res) => res.json())
  .then((data) => {
    console.log("data")
    showImage(data);
}).catch((err)=>{
  console.log(Error(err));
});

//get product id 

//display item
const showImage = (item) => {  
  //itemImg.innerHTML =`<img src=${pr.imageUrl} alt=${pr.altTxt}>`;
  itemImg.appendChild(createImg);
  createImg.src = item.imageUrl;
  createImg.altTxt = item.altTxt;
  createImg.setAttribute("id","img_tag");
  productName.innerHTML = item.name;
  productPrice.innerHTML = item.price;
  productDescription.innerHTML = item.description;
  //update order Item object
  orderItem.price = item.price;
  orderItem.name = item.name;
  orderItem.image = item.imageUrl;
  orderItem.altTxt = item.altTxt;
  createSelectOptions(item);
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
    const matchId = product._id === orderItem._id;
    const matchColor = product.color === orderItem.color;
    return matchId && matchColor;
  }) 
  
  //update product price
  //make this a module sice it repeats in other js file
  if (already) {
    already.quantity += orderItem.quantity;
  } else {
    //push to local array of onjects
    carts.push({
      "_id": orderItem._id,
      "color": orderItem.color,
      //do not store price in the localstorage
      //"price": orderItem.price,
      "quantity": orderItem.quantity,
      "imageURL": orderItem.image,
      "name": orderItem.name,
      "altTxt": orderItem.altTxt,
    });
  }
  //loop through all the carts
  localStorage.setItem("carts", JSON.stringify(carts));
});

