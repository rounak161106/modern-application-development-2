const dashboard = {template : `<div>
                                    <button @click="goBack">Go Back</button>
                                    <h1>Dashboard Page</h1>
                                </div>`,
                   methods : {
                          goBack : function() {
                            //this.$router.go(-1) // go back to the previous page.
                            this.$router.push("/users") // go back to the home page.
                          }
                   }
} // mapped to /users/dashboard route.
export default dashboard