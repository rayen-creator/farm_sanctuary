import axios from 'axios';

const API_URL = 'http://localhost:3000/graphql';

export const RecommendedProductService = {
  getAll() {
    const query = `
      query {
        recommendedProducts {
          id
          name
          price
          imageURL
          url
          category
        }
      }
    `;

    return axios.post(API_URL, { query }).then((response) => response.data.data.recommendedProducts);
  },

  add(name, price, imageURL, url, category) {
    const mutation = `
      mutation {
        addRecommendedProduct(name: "${name}", price: ${price}, imageURL: "${imageURL}", url: "${url}", category: "${category}") {
          id
          name
          price
          imageURL
          url
          category
        }
      }
    `;

    return axios.post(API_URL, { query: mutation }).then((response) => response.data.data.addRecommendedProduct);
  },

  delete(id) {
    const mutation = `
      mutation {
        deleteRecommendedProduct(id: "${id}") {
          id
          name
          price
          imageURL
          url
          category
        }
      }
    `;

    return axios.post(API_URL, { query: mutation }).then((response) => response.data.data.deleteRecommendedProduct);
  },
  scrapeAndAdd(url) {
    return axios.get(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const name = $('h1').text();
        const price = $('span.price').text();
        const imageURL = $('img.product-image').attr('src');

        return RecommendedProductService.add(name, price, imageURL, url, 'Farm Supplies');
      })
      .catch(error => console.log(error));
  },
};
