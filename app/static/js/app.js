/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload Form<span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

const UploadForm = Vue.component('upload-form', {
    template:`
        <body>

            <form @submit.prevent="uploadPhoto" method="POST" enctype="multipart/form-data" id="uploadForm">

            <h1>Upload Form</h1>

            <ul class="responses">
                <li v-if="success.length > 0" class="responses alert alert-success">
                    {{ success }}
                </li>

                <li v-for="error in errors" class="responses alert alert-danger">
                    {{ error }}
                </li>
            </ul>

            <p>Description</p>
            <textarea name="description" form="uploadForm">Enter text here...</textarea>

            <br>
            <br>

            <p>Photo Upload</p>
            <input type="file" name="photo">

            <br>
            <br>

            <button type="submit" name="submit" class="btn btn-primary">Submit</button>
            
            </form>
        </body>
    `,
    data: function(){
        return{
            success:'',
            errors:[]
        }
      },
    methods:{
        uploadPhoto: function(){

            let self = this;
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);

            fetch("/api/upload", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (jsonResponse) {
                    // display a success message
                    console.log(jsonResponse);
                    
                    if (jsonResponse.errors && jsonResponse.errors.length != 0) {
                        self.errors = jsonResponse.errors;
                        self.success = '';
                    } else {
                        self.success = jsonResponse.message;
                        self.errors = [];
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    // some options
    });

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here

        { path: '/upload', component: UploadForm },

        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});