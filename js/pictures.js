const comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке, перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]
const descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
]

const simillar = document.querySelector('#picture').content
.querySelector('.picture')
const pictures = document.querySelector('.pictures')
const bigPicture = document.querySelector('.big-picture')

bigPicture.classList.remove('hidden')

function generateUsersPost(countPost) {
    let posts = new Array(countPost)
    posts = posts.fill('')
    .map((post, i) => {
        return {
            url: `photos/${i + 1}.jpg`,
            likes: rndmNum(15, 200),
            comments: getRndmElInArr(1, 2, comments),
            description: getRndmElInArr(1,1, descriptions, 'string')
        }
    })

    return posts
}

function renderUserPosts(arr) {
    const fragment = document.createDocumentFragment()

    arr.forEach(post => {
        let template = renderPost(post)
        fragment.appendChild(template)
    })

    pictures.appendChild(fragment)
}

function renderPostInBigPicture(post) {
    let comments = ''

    const postComments = document.querySelector('.social__comments')

    bigPicture.querySelector('.big-picture__img img').setAttribute('src', post.url)
    bigPicture.querySelector('.likes-count').textContent = post.likes
    bigPicture.querySelector('.comments-count').textContent = post.comments.length
    bigPicture.querySelector('.social__caption').textContent = post.description
    
    post.comments.forEach(comment => {
        comments += `
            <li class="social__comment">
                <img class="social__picture" src="img/avatar-${rndmNum(1, 6)}.svg" alt="Аватар комментатора фотографии" width="35" height="35">
                <p class="social__text">${comment}</p>
            </li>
        `
    })

    postComments.insertAdjacentHTML('afterbegin', comments)
}

function renderPost(post) {
    let template = simillar.cloneNode(true)

    template.querySelector('img').setAttribute('src', post.url)
    template.querySelector('.picture__likes').textContent = post.likes,
    template.querySelector('.picture__comments').textContent = post.comments.length

    return template
}

const usersPost = generateUsersPost(25)
renderUserPosts(usersPost)
renderPostInBigPicture(usersPost[2])

function rndmNum(min, max) {
    return Math.floor(Math.random() * max + min)
}

function getRndmElInArr(min, max, arr, returnType = []) {
    let res = []
    let countEl = rndmNum(1, 2)

    for(let i = 0; i < countEl; i++) {
        let idx = rndmNum(0, arr.length)
        let el = arr[idx]
        
        if(res.length) {
            let isDublicate = res.some(item => item === el)

            if(isDublicate) {
                res.push(arr[idx + 1])
            } else {
                res.push(el)
            }
        } else {
            res.push(el)
        }
    }

    if(typeof returnType === 'string') return res.join('')

    return res
}