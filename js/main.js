const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

let getRequest = (url) => {
	return new Promise ( function(resolve,reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status !== 200) {
					return reject('error');
				} else {
					return resolve(xhr.responseText);					
				}
			}
		}		
		xhr.send();
	})
  }


class ProductList {
	constructor () {
		this.goods = [];
	}
	fetchGoods (cb) {
		getRequest(`${API_URL}/catalogData.json`)
		  .then( (goods) => {
		  	    console.log(goods)
				this.goods = JSON.parse(goods);
				cb();
		    })
		  .catch( (reject) => {
		  		console.log(reject);
		  		cb();
		  })
	}
	render() {
		const block = document.querySelector ('.products')
		this.goods.forEach(product => {
			const prod = new Product (product)
			block.insertAdjacentHTML('beforeend', prod.render())
		})
	}
}

class Product {
	constructor (product) {
		this.id_product = product.id_product
		this.product_name = product.product_name
		this.price = product.price
		this.img = image
	}
	render () {
		return `<div class="product-item" data-id="${this.id_product}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.product_name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-name="${this.product_name}"
                            data-image="${this.img}"
                            data-price="${this.price}"
                            data-id="${this.id_product}">Buy</button>
                        </div>
                    </div>`
	}
}

const productList = new ProductList ();
productList.fetchGoods(() => {
  productList.render()
})

class UserCart {
	constructor () {
		this.userCart = []
		this.totalSum = 0
		this._init ()
	}
	_init () {
		this.render()
	}
	addProduct (product) {
		let productId = +product.dataset['id'];
		let find = this.userCart.find(element => element.id_product === productId)
		if (!find) {
			this.userCart.push ({
				id_product: productId,
				product_name: product.dataset['name'],
				img: cartImage,
				price: product.dataset['price'],
				quantity: 1
			})
		} else {
			find.quantity++
		}
		this.calculateTotalSum();
		this.render();
	}	
	removeProduct (product) {
		let productId = +product.dataset['id'];
		let find = this.userCart.find(element => element.id_product === productId)
		if (find.quantity > 1) {
			find.quantity--
		} else {
			this.userCart.splice (this.userCart.indexOf(find), 1);
			document.querySelector (`.cart-item[data-id="${productId}"]`).remove ()
		}
		this.calculateTotalSum();
		this.render();
	}
	calculateTotalSum(){
		this.totalSum = 0
		this.userCart.forEach(product => {
				const prod = new ItemCart(product)
				this.totalSum += (prod.sum)
		})
	}
	render() {
	 	let allProducts = '';
	 	this.userCart.forEach(product => {
					const prod = new ItemCart(product)
					allProducts += prod.render()
			})
		document.querySelector ('.cart-block').innerHTML = allProducts;
		this.renderTotal()
	}
	renderTotal(){
		const block = document.querySelector ('.cart-block')
		const total = `<div class="cart-total" ">
	                            <div class="right-block">
	                                <p class="cart-sum">Total: $ ${this.totalSum}</p>
	                            </div>
	                        </div>`
		block.insertAdjacentHTML('beforeend', total)
	}
}

class ItemCart {
	constructor (product) {
		this.id_product = product.id_product
		this.product_name = product.product_name
		this.price = product.price
		this.quantity = product.quantity
		this.img = product.img
		this.sum = product.price * product.quantity
	}
	render () {
		return `<div class="cart-item" data-id="${this.id_product}">
	                            <div class="product-bio">
	                                <img src="${this.img}" alt="Some image">
	                                <div class="product-desc">
	                                    <p class="product-title">${this.product_name}</p>
	                                    <p class="product-quantity">Quantity: ${this.quantity}</p>
	                                    <p class="product-single-price">$ ${this.price} each</p>
	                                </div>
	                            </div>
	                            <div class="right-block">
	                                <p class="product-price">$ ${this.sum}</p>
	                                <button class="del-btn" data-id="${this.id_product}">&times;</button>
	                            </div>
	                        </div>`
	}
}


var userCart = new UserCart;


document.querySelector ('.btn-cart').addEventListener ('click', () => {
	document.querySelector ('.cart-block').classList.toggle ('invisible')
})

document.querySelector ('.products').addEventListener ('click', (evt) => {
	if (evt.target.classList.contains ('buy-btn')) {
		userCart.addProduct(evt.target);
	}
})

document.querySelector ('.cart-block').addEventListener ('click', (evt) => {
	if (evt.target.classList.contains ('del-btn')) {
		userCart.removeProduct (evt.target);
	}
})
