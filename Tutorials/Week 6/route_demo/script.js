// importing the components for the routes.
import home from "./components/home.js" // mapped to /home route.
import about from "./components/about.js" // mapped to /about route.
import contact from "./components/contact.js" // mapped to /contact route.
import profile from "./components/profile.js" // mapped to /profile/:username route.
import users from "./components/users.js" // mapped to /users route.
import dashboard from "./components/dashboard.js" // mapped to /users/dashboard route.
import settings from "./components/settings.js" // mapped to /users/settings route.
import createProfile from "./components/createProfile.js" // mapped to /create_profile route.
                                    
// defining the routes for the app.
const routes = [
    {path : "/home", component : home},
    {path : "/about", component : about},
    {path : "/contact", component : contact},
    {path : "/profile/:username", name : "profile", component : profile},
    {path : "/users", component : users, children : [
        {path : "/dashboard", component : dashboard},
        {path : "/settings", component : settings}
    ]},
    {path : "/create_profile", component : createProfile},
]

// create router object
const router = new VueRouter({
    routes // short for `routes: routes`
})

const app = new Vue({
    el : "#app",
    router // short for `router: router`
})