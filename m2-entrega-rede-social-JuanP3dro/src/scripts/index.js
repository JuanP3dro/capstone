import { Api } from "./models/api.js"

class Login {
    static redirect() {
        const btnCadastro = document.getElementById('btnPagCadastro')
        const btnRegistro = document.getElementById('btnRegistro')

        btnCadastro.addEventListener('click', (event) => {
            window.location.assign("/src/pages/cadastro.html")
        })

        btnRegistro.addEventListener('click', (event) => {
            window.location.assign("/src/pages/cadastro.html")
        })
    }

    static goHomePage () {
        const token = localStorage.getItem("@redeSocial:token")
        const email = document.getElementById('email')
        const senha = document.getElementById('senha')
        const btnLogar = document.getElementById('btnLogar')

        btnLogar.addEventListener('click', (event) => {
            event.preventDefault()
            const data = {
                email: email.value,
                password: senha.value
            }
            Api.loginUser(data)
        })
        if (token) {
            window.location.assign("/src/pages/home.html")
        }
    }
}

Login.redirect()
Login.goHomePage()
