import axios from "axios";

const bookAPI = axios.create({
  baseURL: 'http://www.aladin.co.kr/ttb/api/ItemList.aspx',
  params: {
    ttbkey: "ttbtigers02721314001",
    MaxResults: 3,
    start: 1,
    SearchTarget: "Book",
    Cover: "Big",
    output: "JS",
    Version: "20131101"
  }
});

export default bookAPI;