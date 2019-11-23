const button = document.getElementById('button')
const body = document.getElementById('body')
const message1 = document.getElementById('message')
const buttonMessage = document.getElementById('close')
const message2 = document.getElementById('message2')
const buttonMessage2 = document.getElementById('close2')

buttonMessage.addEventListener('click', () => {
  message1.style.display = 'none'
})
buttonMessage2.addEventListener('click', () => {
  message2.style.display = 'none'
})

function get (url) {
  return new Promise(function (resolve, reject) {
    const oReg = new XMLHttpRequest()
    oReg.open('GET', url, true)
    oReg.responseType = 'json'
    oReg.onload = () => {
      if (oReg.status >= 400) {
        reject(oReg.response)
        message2.style.display = 'flex'
        message1.style.display = 'none'
      } else {
        resolve(oReg.response)
        message1.style.display = 'flex'
        message2.style.display = 'none'
      }
    }
    oReg.onerror = () => {
      message2.style.display = 'flex'
      message1.style.display = 'none'
      reject(oReg.response)
    }
    oReg.send()
  })
}

const wrapperUser = body.appendChild(document.createElement('div'))
wrapperUser.className = 'wrapperUser'
const wrapperPost = body.appendChild(document.createElement('div'))
wrapperPost.className = 'wrapperPost'
const wrapperComents = body.appendChild(document.createElement('div'))
wrapperComents.className = 'wrapperComents'

button.addEventListener('click', () => {
  get('https://jsonplaceholder.typicode.com/users')
    .then(function (data) {
      data.forEach((element) => {
        const someElement = wrapperUser.appendChild(document.createElement('div'))
        someElement.className = 'users'
        someElement.innerHTML = element.name
        someElement.addEventListener('click', () => {
          someElement.style.backgroundColor = 'beige'

          get(`https://jsonplaceholder.typicode.com/posts?userId=${element.id}`)
            .then(function (data) {
              data.forEach((element2) => {
                const someElement2 = wrapperPost.appendChild(document.createElement('div'))
                someElement2.className = 'posts'
                someElement2.innerHTML = element2.title

                    const spinner = someElement2.appendChild(document.createElement('div'))
                    spinner.className = 'spinner-border spinner-border-sm'
                    spinner.setAttribute('role', 'status')
                    const spinnerSpan = spinner.appendChild(document.createElement('span'))
                    spinnerSpan.className = 'sr-only'

                get(`https://jsonplaceholder.typicode.com/comments?postId=${element2.id}`)
                  .then(function (data) {
                    spinner.style.display = 'none'
                    const elementNumber = someElement2.appendChild(document.createElement('div'))
                    elementNumber.innerHTML = data.length
                    elementNumber.className = 'number'
                  })
                someElement2.addEventListener('click', () => {
                  someElement2.style.backgroundColor = 'beige'

                  get(`https://jsonplaceholder.typicode.com/comments?postId=${element2.id}`)
                    .then(function (data) {
                      data.forEach((element3) => {
                        const someElement3 = wrapperComents.appendChild(document.createElement('div'))
                        someElement3.className = 'coments'
                        someElement3.innerHTML = element3.name

                      })
                    })
                })
              })
            })
        })
      })
    })
    .catch(err => console.log(err))
})


