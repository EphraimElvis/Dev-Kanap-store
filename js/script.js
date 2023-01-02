//Api request
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => console.log(data))
 

//create product ui
const createProductTable = (item) => {
  const productItems = document.querySelector("#items");
    productItems.innerHTML = 
    `<a href="./product.html?id=42">
      <article>
      <img src="${item.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">${item.name}</h3>
      <p class="productDescription">${item.description}</p>
      </article>
    </a>`; 
}
