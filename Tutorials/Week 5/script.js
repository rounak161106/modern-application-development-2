fetch("https://api.github.com/users/rounak161106").then((response) => {
        console.log(response)
        return response.text()
    })
    .then((data) => console.log(data))
    .catch(e => console.log("Error : ", e))

