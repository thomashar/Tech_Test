class PostFetcher {
    constructor() {
      this.postsContainer = document.getElementById('posts-container');
      this.refreshButton = document.getElementById('refresh-button');
  
      this.fetchData();
  
      this.refreshButton.addEventListener('click', this.handleRefresh.bind(this));
    }
  
    fetchData() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => this.displayData(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  
    displayData(posts) {
      this.postsContainer.innerHTML = '';
  
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p><br>
          <hr>
        `;
        this.postsContainer.appendChild(postElement);
      });
    }
  
    handleRefresh() {
      this.fetchData();
    }
  }
  
  export default postFetcherInstance = new PostFetcher();
  