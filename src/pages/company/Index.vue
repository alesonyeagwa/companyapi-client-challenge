<template>
    <div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-info"><router-link to="/companies/add">Add Company</router-link></button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Company</th>
                    <th scope="col">Tracker</th>
                    <th scope="col">Exchange</th>
                    <th scope="col">ISIN</th>
                    <th scope="col">Website</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="company in companies" :key="company.id">
                    <th scope="row">{{company.id}}</th>
                    <td>{{company.name}}</td>
                    <td>{{company.tracker}}</td>
                    <td>{{company.exchange}}</td>
                    <td>{{company.isin}}</td>
                    <td>{{company.website }}</td>
                    <td>{{company.createdAt}}</td>
                    <td>
                        <button @click="editCompany(company)" class="btn btn-primary">Edit</button>
                        <button @click="deleteCompany(company)" class="btn btn-danger ml-2">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p>Showing {{pagination.limit}} of {{pagination.totalItems}} records</p>
        <nav>
            <ul class="pagination">
                <li class="page-item"  @click="changePage(pagination.page - 1)" v-if="pagination.links.Previous"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item" v-bind:key="link.label" v-bind:class="[{active : link.active}]" v-for="link in pagination.links.All">
                    <a class="page-link" v-on:click="link.active ? null : changePage(link.label)" href="#" >
                        {{ link.label  }}
                    </a>
                </li>
                <li class="page-item" @click="changePage(pagination.page + 1)" v-if="pagination.links.Next"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { COMPANIES_MODULE, COMPANIES, FETCH_COMPANIES, PAGINATION } from '../../store/company.module'
import router from "../../router";
export default {
  created () {
    this.fetchCompanies({ page: 1, limit: 5 })
  },
  computed : {
    ...mapState(COMPANIES_MODULE, {
      companies: COMPANIES,
      pagination: PAGINATION,
    }),
  },
  methods: {
    ...mapActions(COMPANIES_MODULE, {
      fetchCompanies: FETCH_COMPANIES
    }),
    changePage(page){
        this.fetchCompanies({ page, limit: 5 })
    },
    deleteCompany(company){
        const { dispatch } = this.$store;
        let proceed = confirm('Are you sure you want to delete this company?')
        if(proceed){
            dispatch('companies/delete', company.id);
        }
    },
    editCompany(company){
        router.push(`/companies/${company.id}/edit`);
    }
  }
}
</script>
