const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

function fetchData () {
	let arr = [];
	for (let i = 0; i < items.length; i++) {
		arr.push ({
			id: ids[i],
			title: items[i],
			price: prices[i],
			img: image,
		});
	}
	return arr
}


class ProductList {
	constructor () {
		this.products = []
		this._init ()
	}
	_init () {
		this.fetchProducts ()
		this.render ()
	}
	fetchProducts () {
		this.products = fetchData()
	}
	render() {
		const block = document.querySelector ('.products')
		this.products.forEach(product => {
			const prod = new Product (product)
			block.insertAdjacentHTML('beforeend', prod.render())
		})
	}
}

class Product {
	constructor (product) {
		this.id = product.id
		this.title = product.title
		this.price = product.price
		this.img = product.img
	}
	render () {
		return `<div class="product-item" data-id="${this.id}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.title}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-name="${this.title}"
                            data-image="${this.img}"
                            data-price="${this.price}"
                            data-id="${this.id}">Купить</button>
                        </div>
                    </div>`
	}
}

let productList = new ProductList ();

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
		let find = this.userCart.find(element => element.id === productId)
		if (!find) {
			this.userCart.push ({
				id: productId,
				title: product.dataset['name'],
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
		let find = this.userCart.find(element => element.id === productId)
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
		this.id = product.id
		this.title = product.title
		this.price = product.price
		this.quantity = product.quantity
		this.img = product.img
		this.sum = product.price * product.quantity
	}
	render () {
		return `<div class="cart-item" data-id="${this.id}">
	                            <div class="product-bio">
	                                <img src="${this.img}" alt="Some image">
	                                <div class="product-desc">
	                                    <p class="product-title">${this.title}</p>
	                                    <p class="product-quantity">Quantity: ${this.quantity}</p>
	                                    <p class="product-single-price">$ ${this.price} each</p>
	                                </div>
	                            </div>
	                            <div class="right-block">
	                                <p class="product-price">$ ${this.sum}</p>
	                                <button class="del-btn" data-id="${this.id}">&times;</button>
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

