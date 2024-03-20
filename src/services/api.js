import axios from "axios";
const ACCESS_KEY = "eg025x8Xhb-_SCm_dMhaGwSom46g0aD2naHiHNJiK24";
axios.defaults.baseURL = "https://api.unsplash.com//search/photos";

export async function requestForImage(searchQuery, page = 1) {
  const { data: responseData } = await axios.get("", {
    params: {
      client_id: ACCESS_KEY,
      query: searchQuery,
      page: page,
      per_page: 12,
      orientation: "landscape",
    },
  });
  return responseData;
}
