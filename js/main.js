const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filteredProducts: [],
        searchLine: '',
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/100x80',
        cart: [],
        isVisibleCart: false,
        cartTotal: 0
    },
    methods: {
        getJson(url){
        return fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            })
        },
        add_product (product) {
        	let productId = product.id_product;
			let find = this.cart.find(element => element.id_product === productId)
			if (!find) {
				this.cart.push ({
					id_product: productId,
					product_name: product.product_name,
					price: product.price,
					quantity: 1,
					sum: product.price
				})
			} else {
				find.quantity++
				find.sum += product.price
			}
			this.cartTotal += product.price
        },
        remove_product (product) {
        	this.cartTotal -= product.price
			let productId = product.id_product;
			let find = this.cart.find(element => element.id_product === productId)
			if (find.quantity > 1) {
				find.quantity--;
				find.sum -= product.price
			} else {
				this.cart.splice (this.cart.indexOf(find), 1);
				document.querySelector (`.cart-item[data-id="${productId}"]`).remove ()
			}
	    },
        search_product(){
        	if (this.searchLine.length > 0) {
        		this.filteredProducts = [];
        	    for (let el of this.products){
        	    	const reg = new RegExp(this.searchLine, "gim");
					if (el.product_name.match(reg)) {
						this.filteredProducts.push (el)
					}
				}
        	} else {
        	    this.filteredProducts = this.products
        	}
        },
        show_cart(){
        	this.isVisibleCart = this.changeVisibility
        }
    },
    computed: {
    	changeVisibility(){
    		return !this.isVisibleCart
    	}
    },
    mounted () {
        this.getJson (`${API_URL + this.catalogUrl}`)
            .then (data => {
                for (let el of data) {
                    this.products.push (el)
                }
                this.filteredProducts = this.products
            })
    }
})

