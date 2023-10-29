import { defineStore } from 'pinia'
import { BASE_URL } from './base'

import { useAccountStore } from './accounts'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companies: null,
    company: null,
    loading: false,
    error: null,
  }),
  getters: {
    getCompanies: (state) => state.companies,
    getCompany: (state) => state.company,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    companiesCount: (state) => state.companies.length,
  },
  actions: {
    async handleError(action) {
      this.loading = true;
      try {
        await action();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchCompanies() {
      await this.handleError(async () => {
        const response = await fetch(`${BASE_URL}/companies`);
        const data = await response.json();
        this.companies = data;
      });
    },

    async fetchCompaniesByUser(userId) {
      this.loading = true;
      await this.handleError(async () => {
        const response = await fetch(`${BASE_URL}/companies?userId=${userId}`);
        const data = await response.json();
        this.companies = data;
        this.loading = false;
      });
    },

    async fetchMyCompanies() {
      this.loading = true;
      try {
        await this.handleError(async () => {
          const accountStore = useAccountStore()
          const response = await fetch(`${BASE_URL}/companies/my`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accountStore.token}`,
            },
          });
          const data = await response.json();
          this.companies = data;
          this.loading = false;
        });
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    

    async fetchCompany(slug) {
      this.loading = true
      await this.handleError(async () => {
        const response = await fetch(`${BASE_URL}/companies/${slug}/`);
        const data = await response.json();
        this.company = data;
        this.loading = false
      });
    },

    // async createCompany(company) {
    //   await this.handleError(async () => {

    //     const response = await fetch(`${BASE_URL}/companies/`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${useAccountStore.token}`,
    //       },
    //       body: JSON.stringify(company),
    //     });
    //     const data = await response.json();
    //     this.companies.push(data);
    //   });
    // },

    async createCompany(company) {
      try {
        const accountStore = useAccountStore();
        const token = accountStore.token;

        const response = await fetch(`${BASE_URL}/companies/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(company),
        });
        const data = await response.json();
        this.companies.push(data);
      } catch (error) {
        throw error;
      }
    },

    async updateCompany(company) {
      await this.handleError(async () => {

        const response = await fetch(`${BASE_URL}/companies/${company.slug}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useAccountStore.token}`,
          },
          body: JSON.stringify(company),
        });
        const data = await response.json();
        const index = this.companies.findIndex((c) => c.slug === data.slug);
        this.companies[index] = data;
      });
    },

    async deleteCompany(slug) {
      await this.handleError(async () => {
        await fetch(`${BASE_URL}/companies/${slug}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useAccountStore.token}`,
          },
        });
        const index = this.companies.findIndex((c) => c.slug === slug);
        this.companies.splice(index, 1);
      });
    },
  },
}) 
