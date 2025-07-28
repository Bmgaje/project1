/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Urls } from './Urls';
import { Console } from '../assests/console';

export const Axios = {
  get: {
    fetchCountries: async (query) => {
      const response = await axios.get(Urls.get.countries + '?q=' + query);
      return response.data;
    },
    fetchCities: async (query) => {
      const response = await axios.get(Urls.get.cities + '?q=' + query);
      return response.data;
    },
    fetchrecentjobs: async (query) => {
      const response = await axios.get(Urls.get.recentJobs + '?q=' + query);
      return response.data;
    },
    fetchTradeCategory: async (query) => {
      const response = await axios.get(Urls.get.tradeCategory + '?q=' + query);
      return response.data;
    },

    fetchWorkExperiences: async (query) => {
      const response = await axios.get(Urls.get.workExperiences + '?q=' + query);
      return response.data;
    },

    fetchStates: async (query) => {
      const response = await axios.get(Urls.get.states + '?q=' + query);
      return response.data;
    },

    fetchJob: async (query) => {
      const response = await axios.get(Urls.get.job + '?q=' + query);
      return response.data;
    },
    fetchJobLocation: async (query) => {
      const response = await axios.get(Urls.get.jobLocation + '?q=' + query);
      return response.data;
    },

    fetchEducation: async (query) => {
      const response = await axios.get(Urls.get.education + '?q=' + query);
      return response.data;
    },

    fetchInterest: async (query) => {
      const response = await axios.get(Urls.get.interest + '?q=' + query);
      return response.data;
    },
    fetchLanguage: async (query) => {
      const response = await axios.get(Urls.get.language + '?q=' + query);
      return response.data;
    },
    fetchUniversity: async (query) => {
      const response = await axios.get(Urls.get.university + '?q=' + query);
      return response.data;
    },

    fetchUser: async (id) => {
      const response = await axios.get(Urls.get.useDetails + '/' + id);
      return response.data;
    },
    fetchSkills: async (query) => {
      const response = await axios.get(Urls.get.skills + '?q=' + query);
      return response.data;
    },
    fetchUserProjects: async (query, isDelete) => {
      const response = await axios.get(Urls.get.userProjects + '?is_delete=' + isDelete);
      return response.data;
    },
    fetchUserWorkExperiences: async (query, isDelete) => {
      const response = await axios.get(Urls.get.userWorkExperiences + '?is_delete=' + isDelete);
      return response.data;
    },
    fetchUserEducation: async (query, isDelete) => {
      const response = await axios.get(Urls.get.userEducation + '?is_delete=' + isDelete);
      return response.data;
    },
    fetchUserSkills: async (query, isDelete) => {
      const response = await axios.get(Urls.get.userSkills + '?is_delete=' + isDelete);
      return response.data;
    },
    fetchUserInterests: async (query, isDelete) => {
      const response = await axios.get(Urls.get.userInterests + '?is_delete=' + isDelete);
      return response.data;
    },
    fetchUserLanguages: async (query, isDelete) => {
      const response = await axios.get(Urls.get.userLangauges + '?is_delete=' + isDelete);
      return response.data;
    },
    fetchSingleProject: async (id) => {
      const response = await axios.get(Urls.get.singleProject + '/' + id);
      return response.data;
    },
    fetchSingleWorkExperience: async (id) => {
      const response = await axios.get(Urls.get.singleWorkExperiece + '/' + id);
      return response.data;
    },
    fetchSingleEducation: async (id) => {
      const response = await axios.get(Urls.get.singleEducation + '/' + id);
      return response.data;
    },
    fetchSingleLanguage: async (id) => {
      const response = await axios.get(Urls.get.singleLanguage + '/' + id);
      return response.data;
    }
  },
  put: {
    postProfile: async (payload) => {
      const response = await axios.put(Urls.put.profile, payload);
      return response.data;
    },
    about: async (payload, id) => {
      const response = await axios.put(Urls.put.about + '/' + id, payload);
      return response.data;
    },
    project: async (payload) => {
      const response = await axios.put(Urls.put.project, payload);
    },
    userWorkExperiences: async (payload) => {
      const response = await axios.put(Urls.put.userExperiences, payload);
    },
    userInterests: async (payload) => {
      const response = await axios.put(Urls.put.userInterests, payload);
    },
    userSkills: async (payload) => {
      const response = await axios.put(Urls.put.userSkills, payload);
    }
  },
  post: {
    userEducation: async (payload) => {
      const response = await axios.post(Urls.post.userEducation, payload);
    },
    userLangauges: async (payload) => {
      const response = await axios.post(Urls.post.userLanguages, payload);
    },
    project: async (payload) => {
      const response = await axios.post(Urls.put.project, payload);
    }
  },
  delete: {
    userProject: async (id) => {
      const response = await axios.delete(Urls.delete.userProject + '/' + id);
    },
    userWorkExperience: async (id) => {
      const response = await axios.delete(Urls.delete.userWorkExperience + '/' + id);
    },
    userEducation: async (id) => {
      const response = await axios.delete(Urls.delete.userEducation + '/' + id);
    },
    userSkill: async (id) => {
      const response = await axios.delete(Urls.delete.userSkill + '/' + id);
    },
    userInterest: async (id) => {
      const response = await axios.delete(Urls.delete.userInterest + '/' + id);
    },
    userLangauge: async (id) => {
      const response = await axios.delete(Urls.delete.userLanguage + '/' + id);
    }
  }
};
