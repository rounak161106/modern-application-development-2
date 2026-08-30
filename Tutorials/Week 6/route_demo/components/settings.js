const settings = {template : `<div>
                                    <button @click="goBack">Go Back</button>
                                    <h1>Settings Page</h1>
                               </div>`,
                   methods : {
                          goBack : function() {
                            // this.$router.go(-1) // go back to the previous page.
                            this.$router.push("/users") // go back to the users page.
                            // this.$router.push("/home") // go back to the home page. This is working same as return redirect("route_name") in case of flask.
                          }
                   }
} // mapped to /users/settings route.
export default settings;