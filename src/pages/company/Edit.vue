<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Edit Company</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Company Name</label>
                            <input type="text" v-model="company.name" name="name" class="form-control" :class="{ 'is-invalid': submitted && !company.name }" />
                            <div v-show="submitted && !company.name" class="invalid-feedback">Company Name is required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label htmlFor="exchange">Exchange</label>
                            <input type="text" v-model="company.exchange" name="exchange" class="form-control" :class="{ 'is-invalid': submitted && !company.exchange }" />
                            <div v-show="submitted && !company.exchange" class="invalid-feedback">Exchange is required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="ticker">Ticker</label>
                            <input type="text" v-model="company.ticker" name="ticker" class="form-control" :class="{ 'is-invalid': submitted && !company.ticker }" />
                            <div v-show="submitted && !company.ticker" class="invalid-feedback">Ticker is required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="isin">ISIN</label>
                            <input type="text" v-model="company.isin" name="isin" class="form-control" :class="{ 'is-invalid': submitted && !company.isin }" />
                            <div v-show="submitted && !company.isin" class="invalid-feedback">ISIN is required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="website">Website</label>
                            <input type="text" v-model="company.website" name="website" class="form-control" />
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
import { mapActions, mapState } from 'vuex'
import {COMPANIES_MODULE} from '../../store/company.module';
export default {
    data () {
        return {
            name: '',
            exchange: '',
            ticker: '',
            isin: '',
            website: '',
            submitted: false,
            company: {}
        }
    },
    computed: {
        creating () {
            return this.$store.state.companies.asyncTask.creating;
        }
    },
    methods: {
        ...mapActions(COMPANIES_MODULE, {
            getCompanyById: 'getbyId'
        }),
        handleSubmit (e) {
            this.submitted = true;
            const { name, exchange, ticker, isin, website } = this.company;
            const { dispatch } = this.$store;
            if (name && exchange && ticker && isin) {
                dispatch('companies/update', this.company);
            }
        }
    },
    async created(){
       this.company = await this.getCompanyById(this.$route.params.id)
    }
};
</script>
