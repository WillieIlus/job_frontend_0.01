import { defineStore } from 'pinia'
import { BASE_URL } from './base'
import { useAccountStore } from './accounts'

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: [],
    job: null,
    loading: false,
    error: null,
  }),
  getters: {
    getJobs: (state) => state.jobs,
    getJob: (state) => state.job,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    jobsCount: (state) => state.jobs.length,
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

    async fetchJobs() {
      await this.handleError(async () => {
        const response = await fetch(`${BASE_URL}/jobs`);
        const data = await response.json();
        this.jobs = data;
      });
    },

    async fetchJobsByUser(userId) {
      await this.handleError(async () => {
        const response = await fetch(`${BASE_URL}/jobs?userId=${userId}`);
        const data = await response.json();
        this.jobs = data;
      });
    },

    async fetchMyJobs() {
      await this.handleError(async () => {
        const accountStore = useAccountStore();
        const response = await fetch(`${BASE_URL}/jobs/my`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accountStore.token}`,
          },
        });
        const data = await response.json();
        this.jobs = data;
      });
    },

    async fetchJob(slug) {
      await this.handleError(async () => {
        const response = await fetch(`${BASE_URL}/jobs/${slug}`);
        const data = await response.json();
        this.job = data;
      });
    },

    async addJob(title, company, job_type) {
      this.loading = true;
      const accountStore = useAccountStore();
      try {
        const response = await fetch(`${BASE_URL}/jobs/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accountStore.token}`,
          },
          body: JSON.stringify({ title, company, job_type }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Bad Request Error:', errorData);
          const error = new Error(errorData.detail);
          throw error;
        }
        const data = await response.json();
        this.jobs.push(data);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async updateJob(slug, job) {
      this.loading = true;
      const accountStore = useAccountStore();
      try {
        const response = await fetch(`${BASE_URL}/jobs/${slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accountStore.token}`,
          },
          body: JSON.stringify(job),
        });
        const data = await response.json();
        this.jobs = this.jobs.map((job) => {
          if (job.slug === slug) {
            return data;
          }
          return job;
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteJob(slug) {
      await this.handleError(async () => {
        await fetch(`${BASE_URL}/jobs/${slug}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        this.jobs = this.jobs.filter((job) => job.slug !== slug);
      });
    },
  },
})
