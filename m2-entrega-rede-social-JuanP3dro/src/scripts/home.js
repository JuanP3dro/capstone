import { Api } from "./models/api.js"

class Home {
    static newPost() {
        const postTitle = document.getElementById('postTitle')
        const postBody = document.getElementById('postBody')
        const postBtn = document.getElementById('postBtn')

        postBtn.addEventListener('click', async (event) => {

            const data = {
                title: postTitle.value,
                description: postBody.value
            }
           await Api.createPost(data)
        })
        
    }

    static showPosts (array) {
        const article = document.querySelector('article')
        
        array.forEach(element => {
            const card = Home.createCard(element)
            article.appendChild(card)
        });
    }

    static createCard(post) {
        const article = document.querySelector('article')
        const cardSection = document.createElement('section')
        const profile = document.createElement('div')
        const imgUser = document.createElement('img')
        const dataUser = document.createElement('div')
        const nameUser = document.createElement('h3')
        const occupation = document.createElement('p')
        const cardTitle = document.createElement('h2')
        const cardBody = document.createElement('p')
        const BtnAndLike = document.createElement('div')
        const openPost = document.createElement('button')
        const likes = document.createElement('div')
        const likeImg = document.createElement('img')
        const likeCount = document.createElement('span')

        cardSection.id = post.uuid
        likeImg.id = post.uuid
        likeImg.classList.add('likeImg')
        cardSection.classList.add('card')
        profile.classList.add('profile')
        imgUser.classList.add('imgUser')
        dataUser.classList.add('dataUser')
        nameUser.classList.add('nameUser')
        occupation.classList.add('occupation')
        cardBody.classList.add('cardBody')
        BtnAndLike.classList.add('BtnAndLike')
        openPost.classList.add('openPost')
        likes.classList.add('likes')

        imgUser.src = post.author.image
        nameUser.innerText = post.author.username
        occupation.innerText = post.author.work_at
        cardTitle.innerText = post.title
        cardBody.innerText = post.description
        openPost.innerText = `Abrir Post`
        const userId = localStorage.getItem("@redeSocial:userId")
        likeCount.innerText = post.likes.length
        
        post.likes.forEach(element => {
           if(element.uuid == userId) {
            likeImg.src = "/src/assets/heartRed.png"
           } else {
            likeImg.src = "/src/assets/heartBlack.png"
           }
        });
        // if (post.likes.find(post.likes.user.uuid) == true) {
        //     likeImg.src = "/src/assets/heartRed.png"
        // } else {
        //     likeImg.src = "/src/assets/heartBlack.png"
        // }

        article.appendChild(cardSection)
        cardSection.append(profile,cardTitle,cardBody,BtnAndLike)
        profile.append(imgUser,dataUser)
        dataUser.append(nameUser,occupation)
        BtnAndLike.append(openPost,likes)
        likes.append(likeImg,likeCount)

        return cardSection
    }

    static likes () {
        const likeImg = document.getElementsByClassName('likeImg')
        console.log(likeImg)
        likeImg.addEventListener('click', async (event) => {
            
            await Api.postLikes(event.target.id)
        })
    }

}
Home.newPost()
const posts = await Api.getPosts()
Home.showPosts(posts)
Home.likes()