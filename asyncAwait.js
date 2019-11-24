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
