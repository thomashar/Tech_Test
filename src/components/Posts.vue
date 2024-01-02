<template>
  <div width="100%">
    <button class="myButton" color="success" dark @click="showDialog = true">Create</button>
  </div>
  
  <div class="myTemplate">
    <div id="posts-container"></div>
  </div>

  <div v-if="showDialog" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-header">Create Post</div>
      <div class="dialog-body">
        <label>Title</label><br>
        <input v-model="form.title" required><br>
        
        <label>Body</label><br>
        <textarea v-model="form.body" required></textarea><br>
        
        <label>User Id</label><br>
        <select v-model="form.userId" required>
          <option v-for="number in options" :key="number" :value="number">{{ number }}</option>
        </select>
      </div>
      <div class="dialog-footer">
        <button @click="cancel" style="margin-right: 10px;">Cancel</button>
        <button @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showDialog: false,
        post: {},
        options: Array.from({ length: 10 }, (_, index) => index + 1),
        form: {
          title: null,
          body: null,
          userId: null
        },
      };
    },
    methods: {
      fetchDataInit() {
        fetchData();

        function fetchData() {
          fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error('Error fetching data:', error));
        }

        function displayData(posts) {
          const postsContainer = document.getElementById('posts-container');

          posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
              <h2>${post.title}</h2>
              <p>${post.body}</p><br>
              <hr>
            `;
            postsContainer.appendChild(postElement);
          });
        }
      },
      cancel() {
        this.form.title = null;
        this.form.body = null;
        this.form.userId = null;
        this.showDialog = false;
      },
      save() {
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            title: this.form.title,
            body: this.form.body,
            userId: this.form.userId
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
        this.showDialog = false;
      },
    },
    mounted () {
      this.fetchDataInit();
      this.showDialog = false;
    }
  }
</script>

<style>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: #555;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.myTemplate {
  width: 80%;
  justify-content: center;
  flex: auto;
  margin: auto;
  margin-top: 1rem;
  border-style: dashed;
  border-color: white;
  padding: 10px;
}

.myButton {
  justify-content: center;
  flex: auto;
  margin: auto;
  margin-left: 45%;
  margin-top: 10px;
  align-content: center;
  border-radius: 10px;
  background-color: green;
  padding: 10px;
}
</style>