let passwordtry = ''
let correctPassword = 'jarocunt'
function sneakRun(key) {
  passwordtry += key.key
  //passwordtry.includes('correctPassword')
  passwordtry === correctPassword &&
    (alert('cheat activated'),
    (document.querySelector('.parallax-name').innerText = '🤡 Absolute clown '),
    (document.querySelector('.parallax-name').style.backgroundImage =
      'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)'),
    (document.querySelector('.parallax-title').style.display = 'none'))
  if (passwordtry.length === correctPassword.length - 3) {
    setTimeout(() => {
      passwordtry = ''
    }, 1000)
  }
}

export { sneakRun }
