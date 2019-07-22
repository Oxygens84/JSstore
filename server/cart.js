let add = (cart, req) => {
    cart.contents.push (req.body)
    return JSON.stringify (cart, null, 4)
}

let change = (cart, req) => {
    //console.error("req = " , req)
    let find = cart.contents.find (el => el.id_product === +req.params.id)
    find.quantity += req.body.quantity
    //console.error("cart = " , cart)
    return JSON.stringify (cart, null, 4)
}

let remove = (cart, req) => {
    let find = cart.contents.find (el => el.id_product === +req.params.id)
    let find_index = cart.contents.indexOf(find)
    cart.contents = cart.contents.slice(find_index,1)
    return JSON.stringify (cart, null, 4)
}

module.exports = {add, change, remove}