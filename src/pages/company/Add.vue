<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Add Company</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Company Name</label>
                            <input type="text" v-model="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && !name }" />
                            <div v-show="submitted && !name" class="invalid-feedback">Company Name is required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label htmlFor="exchange">Exchange</label>
                            <input type="text" v-model="exchange" name="exchange" class="form-control" :class="{ 'is-invalid': submitted && !exchange }" />
                            <div v-show="submitted && !exchange" class="invalid-feedback">Exchange is required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="ticker">Ticker</label>
                            <input type="text" v-model="ticker" name="ticker" class="form-control" :class="{ 'is-invalid': submitted && !ticker }" />
                            <div v-show="submitted && !ticker" class="invalid-feedback">Ticker is required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="isin">ISIN</label>
                            <input type="text" v-model="isin" name="isin" class="form-control" :class="{ 'is-invalid': submitted && !isin }" />
                            <div v-show="submitted && !isin" class="invalid-feedback">ISIN is required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="website">Website</label>
                            <input type="text" v-model="website" name="website" class="form-control" />
                        </div>
                    </div>
                    <div class="form-row mt-3">
                        <div class="form-group">
                            <button class="btn btn-primary" :disabled="creating">Submit</button>
                            <img v-show="creating" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            name: '',
            exchange: '',
            ticker: '',
            isin: '',
            website: '',
            submitted: false
        }
    },
    computed: {
        creating () {
            return this.$store.state.companies.asyncTask.creating;
        }
    },
    methods: {
        handleSubmit (e) {
            this.submitted = true;
            const { name, exchange, ticker, isin, website } = this;
            const { dispatch } = this.$store;
            if (name && exchange && ticker && isin) {
                dispatch('companies/store', { name, exchange, ticker, isin, website });
            }
        }
    }
};
</script>
