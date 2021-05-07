<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Show Company by ISIN</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">ISIN</label>
                            <input type="text" v-model="isin" name="name" class="form-control" :class="{ 'is-invalid': submitted && !isin }" />
                            <div v-show="submitted && !isin" class="invalid-feedback">Company ISIN is required</div>
                        </div>
                    </div>
                    <div class="form-row mt-3">
                        <div class="form-group">
                            <button class="btn btn-primary mr-3" :disabled="loading">Submit</button>
                            <img v-show="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row mt-4" v-if="company">
            <div class="col">
                <h5>Company Details</h5>
                <table class="table">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{{company.id}}</td>
                        </tr>
                        <tr>
                            <th>Ticker</th>
                            <td>{{company.ticker}}</td>
                        </tr>
                        <tr>
                            <th>Exchange</th>
                            <td>{{company.exchange}}</td>
                        </tr>
                        <tr>
                            <th>ISIN</th>
                            <td>{{company.isin}}</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td>{{company.website}}</td>
                        </tr>
                        <tr>
                            <th>Created At</th>
                            <td>{{company.createdAt}}</td>
                        </tr>
                    </tbody>
                </table>
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
            isin: '',
            submitted: false,
            company: null,
        }
    },
    computed: {
        loading () {
            return this.$store.state.companies.asyncTask.loading;
        }
    },
    methods: {
        ...mapActions(COMPANIES_MODULE, {
            getCompanyByISIN: 'getbyISIN'
        }),
        handleSubmit (e) {
            this.submitted = true;
            const { dispatch } = this.$store;
            if (this.isin) {
                this.getCompanyByISIN(this.isin).then((data) => {
                    this.company = data.data
                }).catch((error) => {
                    dispatch('alert/error', error, { root: true })
                })
            }
        }
    }
};
</script>