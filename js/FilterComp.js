const filter = {
    data () {
        return {
            userSearch: ''
        }
    },
    template: `
    <div class="filter">
        <form action="#" class="search-form" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
            <input type="text" class="search-field" v-model='userSearch'>
            <button class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>
    `
}