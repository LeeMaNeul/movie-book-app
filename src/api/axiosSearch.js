import axios from "axios";

const bookSearchAPI = axios.create({
  baseURL: 'https://www.aladin.co.kr/ttb/api/ItemSearch.aspx',
  params: {
    ttbkey: "ttbtigers02721314001",
    QueryType: "title",
    MaxResults: 10,
    start: 1,
    SearchTarget: "Book",
    Cover: "Big",
    output: "JS",
    Version: "20131101"
  }
});

export default bookSearchAPI;