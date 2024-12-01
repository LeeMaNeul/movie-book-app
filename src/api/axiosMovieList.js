import axios from "axios";

const movieListAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: "e2e328719cfb8a5634b24851fbb42da6",
    language: "ko-KR",
    page: 1,
    per_page: 3
  }
});

export default movieListAPI;