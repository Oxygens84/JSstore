const product = {
    props: ['img', 'product'],
    template: `<div class="product-item">
                        <img :src="img" alt="Some img">
                        <div class="desc">
                            <h3>{{ product.product_name }}</h3>
                            <p>{{ product.price }} $</p>
                            <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">BUY</button>
                        </div>
                    </div>`
}

const products = {
    components: {product},
    data () {
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://placehold.it/200x150',
            products: [],
            filtered: [],
            userSearch: ''
        }
    },
    mounted () {
        console.log (this.$root.$refs)
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    methods: {
        filter (val) {
            let regExp = new RegExp (val, 'i');
            this.filtered = this.products.filter (el => regExp.test (el.product_name))
        }
    },
    template: `
    <div class="products">
        <product v-for="product of filtered" 
        :key="product.id_product"
        :img="imgCatalog"
        :product="product"></product>
    </div>
    `
}