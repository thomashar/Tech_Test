<template>
  <div width="100%">
    <button class="myButton" color="success" dark @click="showDialog = true">Create</button>
  </div>
  
  <div class="myTemplate">
    <div id="users-container"></div>
  </div>

  <div v-if="showDialog" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-header">Create user</div>
      <div class="dialog-body">
        <label>Name</label><br>
        <input v-model="form.name" required><br>
        
        <label>Username</label><br>
        <input v-model="form.username" required><br>
        
        <label>Email</label><br>
        <input v-model="form.email" required><br>
        
        <label>Street</label><br>
        <input v-model="form.address.street" required><br>
        
        <label>Suite</label><br>
        <input v-model="form.address.suite" required><br>
        
        <label>City</label><br>
        <input v-model="form.address.city" required><br>
        
        <label>Zipcode</label><br>
        <input v-model="form.address.zipcode" required><br>
        
        <label>Latitude</label><br>
        <input v-model="form.address.geo.lat" required><br>
        
        <label>Longitude</label><br>
        <input v-model="form.address.geo.lng" required><br>
        
        <label>Phone</label><br>
        <input v-model="form.phone" required><br>
        
        <label>website</label><br>
        <input v-model="form.website" required><br>
        
        <label>Company Name</label><br>
        <input v-model="form.company.name" required><br>
        
        <label>Company Catch Phrase</label><br>
        <input v-model="form.company.catchPhrase" required><br>
        
        <label>Company Business</label><br>
        <input v-model="form.company.bs" required><br>
        
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
        user: {},
        options: Array.from({ length: 10 }, (_, index) => index + 1),
        form: {
          name: null,
          username: null,
          email: null,
          address: {
            street: null,
            suite: null,
            city: null,
            zipcode: null,
            geo: {
              lat: null,
              lng: null
            }
          },
          phone: null,
          website: null,
          company: {
            name: null,
            catchPhrase: null,
            bs: null
          }
        },
      };
    },
    methods: {
      fetchDataInit() {
        fetchData();

        function fetchData() {
          fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error('Error fetching data:', error));
        }

        function displayData(users) {
          const usersContainer = document.getElementById('users-container');

          users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.innerHTML = `
              <h2>${user.name}</h2>
              <h4>${user.username}</h4>
              <p>${user.email}</p>
              <p>${user.address.street}</p>
              <p>${user.address.suite}</p>
              <p>${user.address.city}</p>
              <p>${user.address.zipcode}</p>
              <p>${user.address.geo.lat}</p>
              <p>${user.address.geo.lng}</p>
              <p>${user.phone}</p>
              <p>${user.website}</p>
              <p>${user.company.name}</p>
              <p>${user.company.catchPhrase}</p>
              <p>${user.company.bs}</p><br>
              <hr>
            `;
            usersContainer.appendChild(userElement);
          });
        }
      },
      cancel() {
        this.form.name = null;
        this.form.username = null;
        this.form.email = null;
        this.form.address.street = null;
        this.form.address.suite = null;
        this.form.address.city = null;
        this.form.address.zipcode = null;
        this.form.address.geo.lat = null;
        this.form.address.geo.lng = null;
        this.form.phone = null;
        this.form.website = null;
        this.form.company.name = null;
        this.form.company.catchPhrase = null;
        this.form.company.bs = null;
        this.showDialog = false;
      },
      save() {
        fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'user',
          body: JSON.stringify({
            name: this.form.name,
            username: this.form.username,
            email: this.form.email,
            address: {
              street: this.form.address.street,
              suite: this.form.address.suite,
              city: this.form.address.city,
              zipcode: this.form.address.zipcode,
              geo: {
                lat: this.form.address.geo.lat,
                lng: this.form.address.geo.lng,
              }
            },
            phone: this.form.phone,
            website: this.form.website,
            company: {
              name: this.form.company.name,
              catchPhrase: this.form.company.catchPhrase,
              bs: this.form.company.bs,
            }
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