<template>
  <div width="100%">
    <button class="myButton" color="success" dark @click="showDialog = true">Create</button>
  </div>
  
  <div class="myTemplate">
    <div id="comments-container"></div>
  </div>

  <div v-if="showDialog" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-header">Create Comment</div>
      <div class="dialog-body">
        <label>Name</label><br>
        <input v-model="form.name" required><br>
        
        <label>Email</label><br>
        <input v-model="form.email" required><br>
        
        <label>Body</label><br>
        <textarea v-model="form.body" required></textarea><br>
        
        <label>Post Id</label><br>
        <select v-model="form.postId" required>
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
        comments: {},
        options: Array.from({ length: 100 }, (_, index) => index + 1),
        form: {
          name: null,
          email: null,
          body: null,
          postId: null
        },
      };
    },
    methods: {
      fetchDataInit() {
        fetchData();

        function fetchData() {
          fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error('Error fetching data:', error));
        }

        function displayData(comments) {
          const commentsContainer = document.getElementById('comments-container');

          comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML = `
              <h2>${comment.name}</h2>
              <h3>${comment.email}</h3>
              <p>${comment.body}</p><br>
              <hr>
            `;
            commentsContainer.appendChild(commentElement);
          });
        }
      },
      cancel() {
        this.form.name = null;
        this.form.email = null;
        this.form.body = null;
        this.form.postId = null;
        this.showDialog = false;
      },
      save() {
        fetch('https://jsonplaceholder.typicode.com/comments', {
          method: 'POST',
          body: JSON.stringify({
            name: this.form.name,
            email: this.form.email,
            body: this.form.body,
            postId: this.form.postId
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