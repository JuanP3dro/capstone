import { ApiRequests } from "./requests.js"

class Cadastro {
    static createNewUser() {   
        
        const nomeInput = document.getElementById("nome")
        const emailInput = document.getElementById("email")
        const fotoInput = document.getElementById("imagem")
        const passwordInput = document.getElementById("senha")
        const signupBtn = document.querySelector('button')

        signupBtn.addEventListener("click", async (event) => {
            event.preventDefault();

            const data = {
                username: nomeInput.value,
                email: emailInput.value,
                avatarUrl: fotoInput.value,
                password: passwordInput.value
            }

            await ApiRequests.createUser(data)
        })
    }

    // static redirect() {
    //     const loginBtn = document.querySelector('a');

    //     loginBtn.addEventListener("click", () => {
    //         window.location.assign("/pages/login.html")
    //     })
    // }
}
Cadastro.createNewUser();
// Cadastro.redirect();