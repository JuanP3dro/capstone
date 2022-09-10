import { ApiRequests } from "./requests.js";

class LoginPage {
    static login() {
        const token = localStorage.getItem("@kenzieBlogM2:token");

        if (token) {
            window.location.assign("/pages/home.html")
        }

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("senha");
        const loginBtn = document.querySelector('button');

        loginBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const data = {
                email: emailInput.value,
                password: passwordInput.value
            }

            ApiRequests.login(data)
        })
    }

    // static redirect() {
    //     const signupBtn = document.getElementById("signup");

    //     signupBtn.addEventListener("click", () => {
    //         window.location.assign("/pages/cadastro.html")
    //     })
    // }
}

LoginPage.login();
// LoginPage.redirect();
