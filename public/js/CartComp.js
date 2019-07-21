const cartItem = {
    props: ['cart_item'],
    template: `
            <div class="cart-item">
                <div class="product-bio">
                    <div class="product-desc">
                        <p class="product-title">{{ cart_item.product_name }}</p>
                        <p class="product-quantity">Quantity: {{ cart_item.quantity }}</p>
                        <p class="product-single-price">$ {{ cart_item.price }} each</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">{{ cart_item.price  *  cart_item.quantity}}</p>
                    <button class="del-btn" @click="$root.$refs.cart.remove(cart_item)">&times;</button>
                </div>
            </div>
        `
}

const cart = {
    components: {'cart-item': cartItem},
    data () {
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/50x100',
            cartShown: false,
            cartItems: []
        }
    },
    methods: {
        addProduct (product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign ({quantity: 1}, product)
                this.$parent.postJson(`/api/cart/`, prod)
                    .then(data => {
                        if(data.result){
                            this.cartItems.push (prod)
                        }
                    })

            }
        }, 
        remove (product) {
            if(product.quantity > 1){
                this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result){
                            product.quantity--
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if(data.result){
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            }
        }
    },
    mounted () {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                const items = data["contents"]
                for(let el of items){
                    this.cartItems.push(el);
                }
                console.log(this.cartItems)
            })
    },
    template: `   
    <div>
<!--        <filter_el ref="filter"></filter_el>-->
        <button class="btn-cart" type="button" @click="cartShown = !cartShown">SHOP CART</button>   
        <div class="cart-block" v-show="cartShown">
            <p v-if="!cartItems.length">Ooops. Cart is empty</p>
            <cart-item v-for="product in cartItems"  
            :key="product.id_product"
            :cart_item="product"
            @remove="remove"></cart-item>
        </div>
    </div>    
    `
}