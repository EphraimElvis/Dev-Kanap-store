//get carts
function getCart () {
  return JSON.parse(localStorage.getItem("carts")) || [] ;
}

//set cart item
function setCart (cart) {
  localStorage.setItem("carts", JSON.stringify(cart));
}

//update cart
function updateCart (item) {
  const cart = getCart();

  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];

    if (cartItem._id === item._id) {
      cart[i] = item;
      break;
    }
  }
  setCart(cart);
}

//delete cart
function deleteCartItem (id) {
  const cart = getCart();
  console.log("deleteCartItem", id," index ")
  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];
    if (cartItem._id === id) {
      cart.splice(i, 1)
      //
      break;
    }
  }
  setCart(cart);
}


const totalPrice = document.querySelector("#totalPrice");
//update total price
function updateTotal(item) {
  const cart = getCart();

  const total = cart.reduce((total, product) => {
    return (total + (item * product.quantity));
  }, 0);
  totalPrice.textContent = total;
}

//get carts from local storage
const cartsInLocalStorage = getCart();

const getCartItems = document.querySelector("#cart__items");
//create elememt
const createElements = (tag, attributes = []) => {
  const element = document.createElement(tag);
  for (let i = 0; i < attributes.length; i++) {
    element.setAttribute(attributes[i].name, attributes[i].value);
  }
  return element;
}

//set price
function setProductPrice (price) {
  return price;
}

cartsInLocalStorage.forEach((product, id) => {
  
  const productPrice = createElements("p");
   //fetch price from the api
  fetch("http://localhost:3000/api/products/" + product._id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((item) => {
      //display product
      productPrice.textContent = "€$" + item.price;
      //update total price when page loads
      updateTotal(item.price);

      //addEventListener
      cartItemQuantity.addEventListener("change", () => {
    
        if (cartItemQuantity.value > 0) {
          product.quantity = parseInt(cartItemQuantity.value);
          updateCart(product);
        } else {
          deleteCartItem(product._id);
          cartItem.remove();
        }
        //update total price when quantity changes
        updateTotal(item.price);
      }) ;

    })
    .catch((error) => {
      console.log("There has been a problem with your fetch operation:", error)
    })

  //product cart item
  const cartItem = createElements("article", [
    {
      name: "class",
      value: "cart__item"
    },
    {
      name: "data-id",
      value: product._id
    },
    {
      name:"data-color", 
      value: product.color
    }
  ]);

  const cartItemDivImg = createElements("div", [
    {
      name: "class",
      value: "cart__item__img"
    }
  ]);

  const cartItemImg = createElements("img", [
    {
      name: "src",
      value: product.imageURL
    },
    {
      name: "alt",
      value: product.altTxt
    }
  ]);

  const cartItemContent = createElements("div", [
    {
      name: "class",
      value: "cart__item__content"
    }
  ]);

  const cartItemContentDescription = createElements("div", [
    {
      name: "class",
      value: "cart__item__content__description"
    }
  ]);

  const productName = createElements("h2");
  productName.textContent = product.name;
  const productColor = createElements("p");
  productColor.textContent = product.color;

  const deleteItem = createElements("p", [
    {
      name: "class",
      value: "deleteItem"
    }
  ]);
  deleteItem.textContent = "Delete";
  deleteItem.addEventListener("click",() => {
    deleteCartItem(product._id);
    cartItem.remove();
  })

  const cartItemContentSettings = createElements("div", [
    {
      name: "class",
      value: "cart__item__content__settings"
    }
  ]);

  const cartItemContentSettingsQuantity = createElements("div", [
    {
      name: "class",
      value: "cart__item__content__settings__quantity"
    }
  ]);

  const cartItemQuantityDescription = createElements("p");
  cartItemQuantityDescription.textContent = "Quantity: ";

  const cartItemQuantity = createElements("input", [
    {
      name: "class", 
      value: "itemQuantity"
    },
    {
      name: "type", 
      value: "number"
    },
    {
      name: "name", 
      value: "itemQuantity"
    },
    {
      name: "min", 
      value: "1"
    },
    {
      name: "max", 
      value: "100"
    },
    {
      name: "value", 
      value: product.quantity
    }
  ]);

  const cartItemContentSettingsDelete = createElements("div", [
    {
      name: "class",
      value: "cart__item__content__settings__delete"
    }
  ]);

  //add elements to documents
  cartItem.append(cartItemDivImg, cartItemContent);
  cartItemDivImg.append(cartItemImg);
  cartItemContent.append(cartItemContentDescription, cartItemContentSettings);
  cartItemContentDescription.append(productName, productColor, productPrice);
  cartItemContentSettings.append(cartItemContentSettingsQuantity, cartItemContentSettingsDelete);
  cartItemContentSettingsQuantity.append(cartItemQuantityDescription, cartItemQuantity);
  cartItemContentSettingsDelete.append(deleteItem);
  getCartItems.appendChild(cartItem);
});

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
const onSubmit = document.querySelector(".cart__order__form");


let timer = null;
let validateUsername = /^[a-zA-Z ]+$/;
let validCity = /^[a-zA-Z ]+$/;
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

const contactObj = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
  order: []
}

function sendContactData () {
  return new Promise((resolve, reject) => {
  const cart = getCart();
  const products = []

  for (let index = 0; index < cart.length; index++) {
    const cartItem = cart[index];
    products.push(cartItem._id);
  }

  const order  =  {
    contact : {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products
  }

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((re) => {
      console.log("status",re);
      if (re.ok) {
        console.log("status okay", re.status);
        return re.json();
      } else {
        console.log("status not okay",re.status);
      }
    }).then((data)=> {
      resolve(data.orderId)
     
    }).catch((error)=> {
      reject(error);
    });
  });
};

onSubmit.addEventListener("submit", (e)=> {

  e.preventDefault();

  let fname = firstName.value;
  validateUserInput(validateUsername.test(fname), firstNameErrorMsg, "first name");

  let lname = lastName.value;
  validateUserInput(validateUsername.test(lname), lastNameErrorMsg, "last name");

  let addressName = address.value;
  validateUserInput(validateUserAddress.test(addressName), addressErrorMsg, "address");
  
  let cityName = city.value;
  validateUserInput(validCity.test(cityName), cityErrorMsg, "city name");
  
  let emailAddress = email.value;
  validateUserInput(validateEmail(emailAddress), emailErrorMsg, "email address");

  if (validateUsername.test(fname) && validateUsername.test(lname) && validateUserAddress.test(addressName) && validCity.test(cityName) && validateEmail(emailAddress)) {
    sendContactData()
      .then((orderId)=> {   
        
        console.log("deleting")     
        for (let i = 0; i < cartsInLocalStorage.length; i++) {
          const element = cartsInLocalStorage[i]._id;
          deleteCartItem(element);
        }
        
        window.location.href = "confirmation.html?id=" + orderId;
      })
      .catch((err)=> {
        console.error(err)
      })
    
  } else {
    alert("Please correct data input");
  }
  
});


