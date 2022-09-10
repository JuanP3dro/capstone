import { ApiRequests } from "./requests.js";

class HomePage {
    static noToken() {
        const token = localStorage.getItem("@kenzieBlogM2:token");

        if (!token) {
            window.location.assign("/pages/login.html")
        }
    }

    static logout() {
        const logoutBtn = document.querySelector("button")

        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("@kenzieBlogM2:token")
            localStorage.removeItem("@kenzieBlogM2:userId")
            window.location.assign("/pages/login.html")
        })
    }

    static cardPostDesktop(array) {
        const article = document.querySelector('article')

        array.data.forEach((post => {
            const card = HomePage.createCardDesktop(post)

            article.appendChild(card)
        }))
    }

    static cardPostMobile(array) {
        const article = document.querySelector('article')

        array.data.forEach((post => {
            const card = HomePage.createCardMobile(post)

            article.appendChild(card)
        }))
    }

    static createCardDesktop(post) {
        const postDesktop = document.createElement("section");
        const iconsBox = document.createElement("div");
        const imgUser = document.createElement("img");
        const iconsPost = document.createElement("div");
        const iconEdit = document.createElement("img");
        const iconDelete = document.createElement("img");
        const contentPost = document.createElement("div");
        const userPost = document.createElement("h2");
        const textPost = document.createElement("p");
        const dataPost = document.createElement("p");
        const user = localStorage.getItem("@kenzieBlogM2:userId");

        postDesktop.classList.add("sectionDesktop")
        postDesktop.key = post.user.id
        postDesktop.id = post.user.id

        imgUser.classList.add("imgUser")
        imgUser.src = post.user.avatarUrl

        iconsPost.classList.add("icones")
        iconsPost.id = post.user.id

        iconEdit.id = post.id
        iconEdit.classList.add("icon")
        iconEdit.classList.add("iconEdit")
        iconEdit.src = "/img/edit 1.png"

        iconDelete.id = post.id
        iconDelete.classList.add("icon")
        iconDelete.classList.add("iconDelete")
        iconDelete.src = "/img/trash-bin 1.png"

        userPost.innerText = post.user.username
        textPost.innerText = post.content
        dataPost.innerText = post.createdAt

        if (post.user.id == user) {
            iconsPost.append(iconEdit, iconDelete);
        }

        iconsBox.append(imgUser, iconsPost);

        contentPost.append(userPost, textPost);

        postDesktop.append(iconsBox, contentPost, dataPost);

        return postDesktop
    }

    static createCardMobile(post) {
        const postMobile = document.createElement("section");
        const imgUser = document.createElement("img");
        const userPost = document.createElement("h2");
        const textPost = document.createElement("p");
        const dataPost = document.createElement("p");
        const iconsPost = document.createElement("div");
        const iconEdit = document.createElement("img");
        const iconDelete = document.createElement("img");
        const user = localStorage.getItem("@kenzieBlogM2:userId");

        postMobile.classList.add("sectionMobile")
        postMobile.key = post.user.id
        postMobile.id = post.user.id

        imgUser.classList.add("imgUser")
        imgUser.src = post.user.avatarUrl

        userPost.innerText = post.user.username
        textPost.innerText = post.content
        dataPost.innerText = post.createdAt
        iconsPost.id = post.user.id

        iconEdit.id = post.id
        iconEdit.classList.add("icon")
        iconEdit.classList.add("iconEdit")
        iconEdit.src = "/img/edit 1.png"

        iconDelete.id = post.id
        iconDelete.classList.add("icon")
        iconDelete.classList.add("iconDelete")
        iconDelete.src = "/img/trash-bin 1.png"

        if (post.user.id == user) {
            iconsPost.append(iconEdit, iconDelete);
        }

        postMobile.append(imgUser, userPost, textPost, dataPost, iconsPost)

        return postMobile
    }

    static newPost() {
        const inputPost = document.querySelector('textarea')
        const sendBtnDesktop = document.getElementById("postDesktop")
        const sendBtnMobile = document.getElementById("postMobile")

        sendBtnMobile.addEventListener("click", async (event) => {
            event.preventDefault();

            const data = {
                content: inputPost.value
            }

            await ApiRequests.createPost(data);
        })

        sendBtnDesktop.addEventListener("click", async (event) => {
            event.preventDefault();

            const data = {
                content: inputPost.value
            }

            await ApiRequests.createPost(data);
        })
    }

    static showEditModal() {
        const editBtn = document.querySelectorAll(".iconEdit")
        const modalEdit = document.querySelector(".modalEdit")

        editBtn.forEach(btn => {
            btn.addEventListener("click", (event) => {
                localStorage.setItem("@kenzieBlogM2:itemId", event.target.id)
                modalEdit.classList.toggle("hidden")
            })
        })
    }

    static editPost() {
        const contentEditPost = document.getElementById("editPost")
        const editPostBtn = document.getElementById("editPostBtn")
        const modalEdit = document.querySelector(".modalEdit")

        editPostBtn.addEventListener("click", async (event) => {
            event.preventDefault()

            const updateId = localStorage.getItem("@kenzieBlogM2:itemId")

            const data = {
                content: contentEditPost.value
            }

            await ApiRequests.editPost(data, updateId)
            modalEdit.classList.add("hidden")
            localStorage.removeItem("@kenzieBlogM2:itemId")
        })
    }

    static showDeleteModal() {
        const deleteBtn = document.querySelectorAll(".iconDelete")
        const modalDelete = document.getElementById("modalDelete")

        deleteBtn.forEach(btn => {
            btn.addEventListener("click", (event) => {
                localStorage.setItem("@kenzieBlogM2:itemId", event.target.id)
                modalDelete.classList.toggle("hidden")
            })
        })
    }

    static deletePost() {
        const deletePostBtn = document.getElementById("deletePostBtn")
        const modalDelete = document.getElementById("modalDelete")

        deletePostBtn.addEventListener("click", async (event) => {
            event.preventDefault()

            const updateId = localStorage.getItem("@kenzieBlogM2:itemId")

            await ApiRequests.deletePost(updateId)
            modalDelete.classList.add("hidden")
            localStorage.removeItem("@kenzieBlogM2:itemId")
            window.location.reload()
        })
    }
}

HomePage.noToken();
HomePage.logout();
HomePage.newPost();

const posts = await ApiRequests.showAllPosts();
HomePage.cardPostDesktop(posts);
HomePage.cardPostMobile(posts);

HomePage.showEditModal();
HomePage.editPost();

HomePage.showDeleteModal();
HomePage.deletePost();
