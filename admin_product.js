var product= document.getElementById("product")


firebase.database().ref("Dishes").once("value",(snap)=>{
    // console.log(snap.toJSON())
    if(snap.toJSON()!=null){

    var value = Object.values(snap.toJSON())//object to array 
    // console.log(value)

    // `  <tr>
    //     <td>${i+1}</td>
    //     <td>${v.Dish_Name}</td>
    //     <td>${v.Price}</td>
    //     <td>${v.Qty}</td>
    //     <td>
    //     <img src=${v.img_Url} style="width:200px;height:50px" alt="">
    //   </td>
    //   <td>
    //   <button id=${v.Product_Key} ONCLICK ="edit_pro(this)"  > Edit</button>
    // </td>
    //   <td>  <button id=${v.Product_Key} ONCLICK ="delete_pro(this)"> Delete</button></td>

    
    // </tr>`
    value.map((v,i)=>{
        console.log(v)
        v=null ?product.innerHTML+=`<div>Nothing here</div>`:
        product.innerHTML+=
        ` <div class="col">
          <div class="card">
            <img src=${v.img_Url} class="dish-img-top" alt="..." />
            <div class="card-body">
              <h4 class="card-title"><span>${i+1}</span> ${v.Dish_Name}</h4>
              <h5 class="card-title">Only in ${v.Price}$</h5>
              <h6 class="card-title">Qty ${v.Qty}</h6>
            </div>
            <div class="card-footer text-muted">
              <a href="#" class="card-link"><button class="btn btn-primary" id=${v.Product_Key} ONCLICK ="edit_pro(this)" >Edit</button></a>
              <a href="#" class="card-link"><button class="btn btn-danger" id=${v.Product_Key} ONCLICK ="delete_pro(this)">Delete</button></a>
            </div>
          </div>
        </div> `
    })
    }
    
})

async function delete_pro(e){
    console.log(e.id)
   await  firebase.database().ref("Dishes").child(e.id).remove()
   window.location.reload()
}

function edit_pro(e){
    console.log(e.id)
    localStorage.setItem("Current_Pid",e.id)
    window.location.href="Edit_Product.html"
}