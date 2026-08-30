const users = {template : `<div>
                                <h1>Users Page</h1>
                                <nav>
                                    <router-link to="/dashboard">Dashboard</router-link>
                                    <router-link to="/settings">Settings</router-link>
                                </nav>  
                                <router-view></router-view>
                                <p>Users page footer</p>
                            </div>`
} // mapped to /users route.
export default users;