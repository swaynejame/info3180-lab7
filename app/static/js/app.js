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
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
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

Vue.component('upload-form', {
    template:`
        <body>
            <h1>Upload Form</h1>
            <form @submit.prevent="uploadPhoto" action="{{ url_for('upload') }}" method="post" enctype="multipart/form-data">
            {{ form.csrf_token }}

            {# Add the file upload field as you learnt for Flask-WTF #}

            <h1>Upload Photo</h1>

            {% include 'flash_messages.html' %}

            <div>
                {{ form.description.label }}
                {{ form.description }}
            </div>
            
            <div>
                {{ form.photo.label }}
                {{ form.photo }}
            </div>

            <button type="submit" name="submit" class="btn btn-primary">Upload file</button>
            </form>
        </body>
    `,
    methods:{
        uploadPhoto: function(){

            fetch("/api/upload", {
                method: 'POST'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (jsonResponse) {
                    // display a success message
                    console.log(jsonResponse);
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

        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});