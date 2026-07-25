const app = new Vue({
    el : "#app", 
    data : {
        result : "",
        query : "",
        full_result : null,
        current : true
    },
    methods : {
        fetch : async function() {
            query = this.query
            if(query){
                list = query.split(" ")
                query = list.join("_")
                console.log(query)
                let resp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`)
                console.log(resp)
                let res = await resp.json()
                console.log(res)
                this.full_result = res.extract
                this.result = this.full_result.slice(0,48)
                this.query = ""
            }
        },
        show_full : function() {
            if(this.current){
                this.result = this.full_result
                this.current = false
            } else{
                this.result = this.full_result.slice(0,48)
                this.current = true
            }
        }   
    }
})