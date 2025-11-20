//!Filter buttons functionality 
function filteritems(category) {
  let cards = document.querySelectorAll(".card")
  let buttons = document.querySelectorAll("#filter_btns>button")
  cards.forEach((card) => {
    if (category == "all") {
      card.style.display = "flex"
    }
    else {
      if (card.classList.contains(category)) {

        card.style.display = "flex"
      }
      else {
        card.style.display = "none"
      }
    }

  })
  buttons.forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

}


//! Cart Functionality
let cart = [];
let cards = document.querySelectorAll(".card")

cards.forEach((card) => {
  let name = card.querySelector(".card_one>.card_info>h2").innerText
  let price = Number(card.querySelector(".card_one>.card_info>p").innerText.replace("₹", '').replace("/-", ""))
  let quantity = card.querySelector(".card_two>.card_quantity>.quantity")
  // console.log(name)
  // console.log(price)
  // console.log(quantity)

  let plusBtn = card.querySelector(".plus")
  plusBtn.addEventListener("click", () => {
    quantity.innerText = Number(quantity.innerText) + 1
  })

  let minusBtn = card.querySelector(".minus")
  minusBtn.addEventListener("click", () => {
    let current = Number(quantity.innerText)
    if (current > 0)
      quantity.innerText = current - 1
    if(Number(quantity.innerText)==0){
       addBtn.style.background = "chocolate"
    }
  })

  //!Add to cart functionality 
  let addBtn = card.querySelector(".addToCart>button")
  addBtn.addEventListener("click", () => {
    let qty = Number(quantity.innerText)
    if (qty > 0) {
      let exisitingItem = cart.find(item => item.name == name)
      if (exisitingItem) {
        exisitingItem.qty += qty
      } else {
        cart.push({ name, qty, price })
        addBtn.style.background = "green"
        setTimeout(() => {
      addBtn.style.backgroundColor = 'chocolate';// New color
    }, 3000)
      }
      quantity.innerText=0
      updateCart()
    } else {
      alert("PLEASE ADD MIN OF 1 ITEM")
    }
  })
})
//!Update cart functionality
  function updateCart() {
    let totalQty = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
      totalQty += item.qty
      totalPrice += item.price * item.qty
    })

    let cart_qty = document.getElementById("cart_quantity")
    let cart_price = document.getElementById("cart_price")

    cart_qty.innerText = totalQty
    cart_price.innerText = `₹${totalPrice.toFixed(2)}`

    let sidebar_items = document.querySelector("#sidebar_items")
    sidebar_items.innerHTML = ""
    cart.forEach((item,index) => {
      sidebar_items.innerHTML += `
          <div class='items_info'>
          <h5> ${item.name}</h5>
          <p> Quantity :${item.qty}</p>
          <p> Price : ₹${item.price} X ${item.qty }= <b>₹ ${item.price * item.qty}  </b></p>
            <button class='remove_btn' itm_index=${index}>Remove</button>
        </div>
        <br> 
     `
  })

    if(cart.length>0){
      sidebar_items.innerHTML+=`
      <div class="cart_summary">
      <h3>Total Quantity: ${totalQty}</h3>
      <h3>Total Proce: ${totalPrice.toFixed(2)}</h3>
      </div>
     `
    }
    

 //!remove buttos*
 let remove_buttons=document.querySelectorAll(".remove_btn")
 remove_buttons.forEach((btn)=>{
  btn.addEventListener("click",(e)=>{
    let ind=e.target.getAttribute("itm_index")
    cart.splice(ind,1)
    updateCart()
 
  })
  })
}
 


//!Buy Now Button Logic
let buyBtn = document.getElementById("buy_now")
buyBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!")
  } else {
    alert("Thank you for your purchase!")
    
    cart = [] 
    updateCart()
  }
})
 

//!Sidebar functionality
let cart_icon = document.getElementById("cart_icon")
let sidebar = document.getElementById("sidebar")
cart_icon.addEventListener("click", () => {
  sidebar.style.right = "0px"
})

let close_sidebar = document.getElementById("close_sidebar")
close_sidebar.addEventListener("click", () => {
  sidebar.style.right = "-380px"
})