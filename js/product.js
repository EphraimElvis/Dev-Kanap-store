const itemImg = document.querySelector(".item__img");
const productName = document.querySelector("#title");
const productPrce = document.querySelector("#price")
const productDescription = document.querySelector("#description");
const selectColor = document.querySelector("#colors");

//get page url id
//const pageURL = window.location.href;
const params = new URLSearchParams(document.location.search);
let id = params.get("id");

//get data based on product id
fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
    showImage(data)
  })

//display item
const showImage = (pr) => {  
  itemImg.innerHTML =`<img src=${pr.imageUrl} alt=${pr.altTxt}>`;
  productName.innerHTML = `${pr.name}`;
  productPrce.innerHTML = `${pr.price}`;
  productDescription.innerHTML = `${pr.description}`;
  createOptions(pr)
}

//create select options
const createOptions = (arr) => {
  arr.colors.map((color) => {
    const createOption = document.createElement('option');
    createOption.value = color;
    createOption.textContent = color;
    selectColor.appendChild(createOption);
  })
}


