export class Api {
    static baseUrl = 'https://m2-rede-social.herokuapp.com/api'
    static token = localStorage.getItem("@redeSocial:token") || ""
    static userId = localStorage.getItem("@redeSocial:userId") || ""
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.token}`
    }

    static async createUser(body) {
        const newUser = await fetch(`${this.baseUrl}/users/`, {
            method: "POST",
            headers:{"Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        
        .then(resp => {
            console.log(resp)
            if (!resp.message){
                window.location.assign("/index.html")
            } else {
                console.log(resp.message)
            }         
            
            return resp
        
        })
        .catch(err => console.log(err))

        return newUser
    }
    static async loginUser(body) {
        const user = await fetch (`${this.baseUrl}/users/login/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
        if (!resp.token ){
            window.location.reload()
        }else {
            localStorage.setItem("@redeSocial:userId", resp.userId)
            localStorage.setItem("@redeSocial:token", resp.token)
            window.location.assign("/src/pages/home.html")
        }

        return resp
    })
    .catch(err => console.log(err))
    return user 
    }
    
    static async createPost(body) {
        const post = await fetch(`${this.baseUrl}/posts`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(resp => {
            window.location.reload()
            
            return resp
        })
        .catch(err => console.log(err))

        return post
    }

    static async getPosts () {
        const allPosts = await fetch (`${this.baseUrl}/posts/`, {
            method: 'GET',
            headers: this.headers
        })
        .then(resp => resp.json())
        .then(resp => resp.results)
        .catch(err => console.log(err))

        return allPosts
    }
    
    static async postLikes (body) {
        const likes = await fetch (`${this.baseUrl}likes/`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(resp => {
            
            
            return resp
        })
        .catch(err => console.log(err))
        return likes
    }
}
