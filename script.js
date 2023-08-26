let time = 308
let root = document.querySelector(":root")
let emojify = document.querySelector("#emojify")
let smallify = document.querySelector("#smallify")
let words = document.querySelector("#wordsToSwap")
let word = document.querySelector("#wordsSwapTo")
let input = document.querySelector("#input")
let result = document.querySelector("#result")

emojify.addEventListener('change', () => {
  smallify.checked = this.checked
})

smallify.addEventListener('change', () => {
  emojify.checked = this.checked
})

words.addEventListener('focus', () => {
  smallify.checked = false
  emojify.checked = false
})

word.addEventListener('focus', () => {
  smallify.checked = false
  emojify.checked = false
})

const swapResult = () => {
  document.querySelector("#input").value = document.querySelector("#result").value
}

setInterval(function () {
  root.style.setProperty("--textcolor", time)
  time = time > 360 ? time = 0 : time += 2
}, 50);

let emojiAlphabet = { "a": "🇦", "b": "🇧", "c": "🇨", "d": "🇩", "e": "🇪", "f": "🇫", "g": "🇬", "h": "🇭", "i": "🇮", "j": "🇯", "k": "🇰", "l": "🇱", "m": "🇲", "n": "🇳", "o": "🇴", "p": "🇵", "q": "🇶", "r": "🇷", "s": "🇸", "t": "🇹", "u": "🇺", "v": "🇻", "w": "🇼", "x": "🇽", "y": "🇾", "z": "🇿" }
let tinyAlphabet = { "a": "ᵃ", "b": "ᵇ", "c": "ᶜ", "d": "ᵈ", "e": "ᵉ", "f": "ᶠ", "g": "ᵍ", "h": "ʰ", "i": "ᶦ", "j": "ʲ", "k": "ᵏ", "l": "ˡ", "m": "ᵐ", "n": "ⁿ", "o": "ᵒ", "p": "ᵖ", "q": "ᑫ", "r": "ʳ", "s": "ˢ", "t": "ᵗ", "u": "ᵘ", "v": "ᵛ", "w": "ʷ", "x": "ˣ", "y": "ʸ", "z": "ᶻ" };

const generate = () => {
  let wordsToSwap = words.value
  let wordsSwapTo = word.value
  let modified = input.value

  if (emojify.checked) {
    let temp = ''
    let inputSplit = modified.toLowerCase().split('')
    inputSplit.forEach(letter => {
      if (letter != ' ') {
        if (Object.keys(emojiAlphabet).includes(letter)) {
          temp += `${emojiAlphabet[letter]} `
        } else {
          temp += letter
        }
      } else {
        temp += ` `
      }
    })
    modified = temp
  }

  if (smallify.checked) {
    let temp = ''
    let inputSplit = modified.toLowerCase().split('')
    inputSplit.forEach(letter => {
      if (letter != ' ') {
        if (Object.keys(tinyAlphabet).includes(letter)) {
          temp += `${tinyAlphabet[letter]}`
        } else {
          temp += letter
        }
      } else {
        temp += ` `
      }
    })
    modified = temp
  }

  if (wordsToSwap) {
    let arrToReplace = wordsToSwap.split(',')
    arrToReplace.forEach(word => {
      let index = 0;
      let newString = ''
      while (modified.includes(word)) {
        index = modified.indexOf(word) + wordsSwapTo.length
        modified = modified.replace(word, wordsSwapTo)
        newString += modified.substring(0, index)
        modified = modified.substring(index, modified.length)
      }
      modified = newString + modified
    })
  }

  result.value = modified
}