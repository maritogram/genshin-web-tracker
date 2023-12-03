const getFontSize = (textLength) => {
    const baseSize = 2
    if (textLength >= baseSize){
        textLength = baseSize - 2
    }
    const fontSize = baseSize - textLength
    return `${fontSize}vw`
}

const titles = document.querySelectorAll('.card_title')

titles.forEach(title => {
    title.style.fontSize = getFontSize(title.textContent.length)
} )