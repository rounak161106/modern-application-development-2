const createProfile = {template : `<div>
                                    <h1>Create Profile Page</h1>
                                    <input type="text" v-model="username" placeholder="Enter username">
                                    <input type="text" v-model="role" placeholder="Enter role">
                                    <button @click="createProfile">Create Profile</button>
                                </div>`,
                        data : function() {
                            return {
                                username : "",
                                role : ""
                            }
                        },
                        methods :{
                            createProfile : function() {
                                // navigate to the profile page with the username and role as parameters.
                                // this.$router.push({path : `/profile/${this.username}`, query : {role : this.role}}) 
                                this.$router.push({name : "profile", params : {username : this.username}, query : {role : this.role}}) // we can use name of the route to navigate to the profile page with the username and role as parameters.
                            }
                        }
}
export default createProfile;