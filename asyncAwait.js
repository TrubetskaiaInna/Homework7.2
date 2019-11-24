const button = document.getElementById('button')
const body = document.getElementById('body')
const message = document.getElementById('message')
const buttonMessage = document.getElementById('close')
const messageError = document.getElementById('messageError')
const buttonMessageError = document.getElementById('closeError')
const wrapperUser = body.appendChild(document.createElement('div'))
wrapperUser.className = 'wrapperUser'
const wrapperPost = body.appendChild(document.createElement('div'))
wrapperPost.className = 'wrapperPost'
const wrapperComments = body.appendChild(document.createElement('div'))
wrapperComments.className = 'wrapperComments'

buttonMessage.addEventListener('click', () => {
  message.style.display = 'none'
})
buttonMessageError.addEventListener('click', () => {
  messageError.style.display = 'none'
})

function get (url) {
  return new Promise(function (resolve, reject) {
    const oReg = new XMLHttpRequest()
    oReg.open('GET', url, true)
    oReg.responseType = 'json'
    oReg.onload = () => {
      if (oReg.status >= 400) {
        reject(oReg.response)
        messageError.style.display = 'flex'
        message.style.display = 'none'
      } else {
        resolve(oReg.response)
        message.style.display = 'flex'
        messageError.style.display = 'none'
      }
    }
    oReg.onerror = () => {
      messageError.style.display = 'flex'
      message.style.display = 'none'
      reject(oReg.response)
    }
    oReg.send()
  })
}

button.addEventListener('click', async () => {
  wrapperUser.innerHTML = ''
  let users = await get('https://jsonplaceholder.typicode.com/users').catch(err => console.log(err))
  users.forEach((element) => {
    const divUser = wrapperUser.appendChild(document.createElement('div'))
    divUser.className = 'users'
    divUser.innerHTML = element.name
    divUser.addEventListener('click', async () => {
      wrapperComments.innerHTML = ''
      wrapperPost.innerHTML = ''
      divUser.style.backgroundColor = 'beige'
      let arrUser = document.getElementsByClassName('users')
      for (let i = 0; i < arrUser.length; i++) {
        if (i !== (element.id - 1)) {
          arrUser[i].style.backgroundColor = 'white'
        }
      }
      let posts = await get(`https://jsonplaceholder.typicode.com/posts?userId=${element.id}`).catch(err => console.log(err))
      posts.forEach(async (element2) => {
        const divPost = wrapperPost.appendChild(document.createElement('div'))
        divPost.className = 'posts'
        divPost.innerHTML = element2.title

        const spinner = divPost.appendChild(document.createElement('div'))
        spinner.className = 'spinner-border spinner-border-sm'
        spinner.setAttribute('role', 'status')
        const spinnerSpan = spinner.appendChild(document.createElement('span'))
        spinnerSpan.className = 'sr-only'

        let commits = await get(`https://jsonplaceholder.typicode.com/comments?postId=${element2.id}`).catch(err => console.log(err))
        spinner.style.display = 'none'
        const elementNumber = divPost.appendChild(document.createElement('div'))
        elementNumber.innerHTML = commits.length
        elementNumber.className = 'number'

        divPost.addEventListener('click', async () => {
          wrapperComments.innerHTML = ''
          commits.forEach((element3) => {
            const divComment = wrapperComments.appendChild(document.createElement('div'))
            divComment.className = 'comments'
            divComment.innerHTML = element3.name
          })
        })
      })
    })
  })
})
