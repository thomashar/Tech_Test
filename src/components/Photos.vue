<template>
  <div width="100%">
    <button class="myButton" color="success" dark @click="showDialog = true">Create</button>
  </div>
  
  <div class="myTemplate">
    <div id="photos-container"></div>
  </div>

  <div v-if="showDialog" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-header">Create Photos</div>
      <div class="dialog-body">
        <label>Title</label><br>
        <input v-model="form.title" required><br>
        
        <label>Url</label><br>
        <input v-model="form.url" required><br>
        
        <label>Album Id</label><br>
        <select v-model="form.albumId" required>
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
        photos: {},
        options: Array.from({ length: 5000 }, (_, index) => index + 1),
        form: {
          title: null,
          url: null,
          thumbnailUrl: null,
          albumId: null
        },
      };
    },
    methods: {
      fetchDataInit() {
        fetchData();

        function fetchData() {
          fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error('Error fetching data:', error));
        }

        function displayData(photos) {
          const photosContainer = document.getElementById('photos-container');

          photos.forEach(photo => {
            const photoElement = document.createElement('div');
            photoElement.innerHTML = `
              <h2>${photo.title}</h2>
              <img src='${photo.url}'></img><br>
              <hr>
            `;
            photosContainer.appendChild(photoElement);
          });
        }
      },
      cancel() {
        this.form.title = null;
        this.form.url = null;
        this.form.thumbnailUrl = null;
        this.form.albumId = null;
        this.showDialog = false;
      },
      save() {
        fetch('https://jsonplaceholder.typicode.com/photos', {
          method: 'POST',
          body: JSON.stringify({
            title: this.form.title,
            url: this.form.url,
            thumbnailUrl: this.form.thumbnailUrl,
            albumId: this.form.albumId
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