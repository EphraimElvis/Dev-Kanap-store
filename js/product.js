//get page url id
//const pageURL = window.location.href;
const params = new URLSearchParams(document.location.search);
let id = params.get("id");

//get data based on product id
fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    showImage(data)
  })

//display item
const showImage = (img) => {
  const itemImg = document.querySelector('.item__img');
  itemImg.innerHTML =`<img src=${img.imageUrl} alt=${img.altTxt}>`;
}


