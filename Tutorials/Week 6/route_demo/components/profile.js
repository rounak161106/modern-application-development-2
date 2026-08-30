const profile = {
    template : "<div><h1>Profile Page</h1><p>Username: {{$route.params.username}}</p><p>Role: {{$route.query.role }}</p></div>", // here name is working same as url_for in case of flask. we can use name of the route to navigate to the profile page with the username and role as parameters.
    mounted : function() {
        console.log(this.$route.params.username) // accessing the username parameter from the route.);
    }
} // mapped to /profile/:username route.
export default profile