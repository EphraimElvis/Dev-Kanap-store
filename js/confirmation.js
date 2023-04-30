// import { getPageId } from "./product";

//get page id
function getPageId () { 
  const params = new URLSearchParams(document.location.search);
  let _id = params.get("id");
  return _id;
}

const orderId = document.querySelector("#orderId");
orderId.textContent = getPageId();

console.log("order", getPageId())