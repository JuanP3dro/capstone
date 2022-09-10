export class ApiRequests {
    static baseUrl = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@kenzieBlogM2:token") || ""
    static userId = localStorage.getItem("@kenzieBlogM2:userId") || ""
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
    }

    static async login(body) {
        const userLogin = await fetch(`${this.baseUrl}/users/login`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(resp => {
            if (!resp.token || !resp.userId){
                window.location.reload()
            }else {
                localStorage.setItem("@kenzieBlogM2:userId", resp.userId)
                localStorage.setItem("@kenzieBlogM2:token", resp.token)
                window.location.assign("/pages/home.html")
            }

            return resp
        })
        .catch(err => console.log(err))

        return userLogin
    }

    static async createUser(body) {
        const newUser = await fetch(`${this.baseUrl}/users/register`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(resp => {
            if (!resp.message){
                window.location.assign("/pages/login.html")
            } else {
                console.log(resp.message)
            }         
 
            return resp
        
        })
        .catch(err => console.log(err))

        return newUser
    }

    static async showAllPosts() {
        const posts = await fetch(`${this.baseUrl}/posts?page=1`, {
            method: "GET",
            headers: this.headers,
        })
        .then(resp => resp.json())
        .catch(err => console.log(err))

        return posts
    }

    static async userData() {
        const myUser = await fetch(`${this.baseUrl}/users/${this.userId}`, {
            method: "GET",
            headers: this.headers,
        })
        .then(resp => resp.json())
        .catch(err => console.log(err))

        return myUser
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

    static async editPost(data, id) {
        const editarPost = await fetch(`${this.baseUrl}/posts/${id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            window.location.reload()

            return resp
        })
        .catch(err => console.log(err))

        return editarPost
    }

    static async deletePost(id) {
        const deletarPost = await fetch(`${this.baseUrl}/posts/${id}`, {
            method: "DELETE",
            headers: this.headers
        })
        .then(resp => resp.json())
        .catch(err => console.log(err))

        return deletarPost
    }

    static async userMain(id) {
        const userMain = await fetch(`${this.baseUrl}/users/${id}`, {
            method: "GET",
            headers: this.headers
        })
        .then(resp => resp.json())
        .then(resp => {
            const avatar = document.querySelector(".userImg")
            const nome = document.querySelector("figcaption")

            avatar.src = resp.avatarUrl
            nome.innerText = resp.username

            return resp
        })
        .catch(err => console.log(err))

        return userMain
    }
}

const userId = localStorage.getItem("@kenzieBlogM2:userId")
ApiRequests.userMain(userId)