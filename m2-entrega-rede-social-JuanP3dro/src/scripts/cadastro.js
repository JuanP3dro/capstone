import { Api } from "./models/api.js"

class Cadastro {
    static redirect() {
        const btnPagLogin = document.getElementById('btnPagLogin')
        const btnLogin = document.getElementById('loginBtn')
        const btnVoltar = document.getElementById('btnVoltar')

        btnPagLogin.addEventListener('click', (event) => {
            window.location.assign("/index.html")
        })

        btnLogin.addEventListener('click', (event) => {
            window.location.assign("/index.html")
        })

        btnVoltar.addEventListener('click', (event) => {
            window.location.assign("/index.html")
        })
    }

    static createNewUser () {
        const nome = document.getElementById('nome')
        const email = document.getElementById('email')
        const senha = document.getElementById('senha')
        const trabalho = document.getElementById('trabalho')
        const perfil = document.getElementById('perfil')
        const btnRegistrar = document.getElementById('btnRegistrar')

        btnRegistrar.addEventListener('click', async (event) => {
            event.preventDefault()
            const data = {
                email: email.value,
                password: senha.value,
                username: nome.value,
                work_at: trabalho.value,
                image: perfil.value
            }
            await Api.createUser(data)
        })
    }
}"/index.html"

Cadastro.redirect()
Cadastro.createNewUser()