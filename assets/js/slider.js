const slideImgs = [];
for (let i = 0; i < 5; i++) {
    slideImgs.push(`assets/img/${i + 1}.jpg`);
}


window.onload = () => {
    let slider = document.querySelector('#slider')
    let innerSlider = document.querySelector('#inner-slider')
    let slides = document.querySelectorAll('.slide')
    let lastSlide = document.querySelector('.last-slide')
    let sliderWidth = slider.clientWidth
    let sliderPos = 0
    let leftBtn = document.querySelector('#slide-left')
    let rightBtn = document.querySelector('#slide-right')

    let moveRight = () => {
        if (sliderPos == -300) {  
            // innerSlider.classList.add('notransition')
            sliderPos = 0
            innerSlider.style.left = sliderPos + '%'
            // setTimeout(() => {
                // innerSlider.classList.remove('notransition')
            // }, 1000)
        } 

        sliderPos = sliderPos - 100
        innerSlider.style.left = sliderPos + '%'
        
        if (sliderPos == -300) {
            setTimeout(() => {
                innerSlider.classList.add('notransition')
                sliderPos = 0
                innerSlider.style.left = sliderPos + '%'
                setTimeout(() => {
                    innerSlider.classList.remove('notransition')
                }, 100)
            }, 1000)
        }        
    }

    let moveLeft = () => {
        if (sliderPos == 0) {
            sliderPos = -300
            innerSlider.style.left = sliderPos + '%'
        } 
        sliderPos = sliderPos + 100
        innerSlider.style.left = sliderPos + '%'
        if (sliderPos == 0) {
            setTimeout(() => {
                innerSlider.classList.add('notransition')
                sliderPos = -300
                innerSlider.style.left = sliderPos + '%'
                setTimeout(() => {
                    innerSlider.classList.remove('notransition')
                }, 100)
            }, 1000)
        }
    }

    // console.log(slides[0])
    innerSlider.style.width = sliderWidth * slides.length + 'px'
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.backgroundImage = `url(${slideImgs[i]})`
    }
    // lastSlide.style.backgroundImage = `url(${slideImgs[0]})`
    Array.prototype.forEach.call(slides, slide => {
        slide.style.width = sliderWidth + 'px'
    })
    innerSlider.style.left = sliderPos + '%'
    let interval = setInterval(moveRight, 1000)

    slider.onmouseover = () => {
        if (sliderPos % 100 === 0) {
            clearInterval(interval)
        }
    }

    slider.onmouseout = (e) => {
            if (e.target.parentElement.parentElement.contains( e.relatedTarget)) {
                null
            } else {
                setTimeout(() => {
                    clearInterval(interval)
                    interval = setInterval(moveRight, 1000)
                }, 3000)
                console.log(e.target)
            }
        
    }
    // document.querySelector('main').onmouseover = () => {
    //     interval = setInterval(moveRight, 3000)
    // }

    leftBtn.onclick = () => {
        // clearInterval(interval)
        moveLeft()
    }

    rightBtn.onclick = () => {
        // clearInterval(interval)
        moveRight()
    }
}