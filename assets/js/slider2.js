const slideImgs = []
for (let i = 0; i < 5; i++) {
    slideImgs.push(`assets/img/${i+1}.jpg`)
}

console.log(slideImgs)


window.onload = () => {



    let slider = document.querySelector('#slider')
    let outerSlider = document.querySelector('#outer-slider')
    let innerSlider = document.querySelector('#inner-slider')
    let slideImg = slideImgs
    let leftClick = true
    let rightClick = true
    let sliderWidth = slider.clientWidth
    let outerSliderPos = 0
    let sliderPos = -200
    let leftBtn = document.querySelector('#slide-left')
    let rightBtn = document.querySelector('#slide-right')

    innerSlider.style.width = sliderWidth * slideImg.length + 'px'
    innerSlider.style.left = sliderPos + '%'
    for (let i = 0; i < slideImg.length; i++) {
        let slide = document.createElement('article')
        slide.className = 'slide'
        slide.style.backgroundImage = `url(${slideImg[i]})`
        slide.style.width = sliderWidth + 'px'
        innerSlider.appendChild(slide)
    }

    let slides = document.querySelectorAll('.slide')
    
    const moveLeft = (delay) => {
        delay == null && (delay = 1000)
        innerSlider.style.transition = `left ${delay / 1000}s ease-in-out`
        // console.log('moveLeft()', delay)
        leftClick = false
        sliderPos = sliderPos + 100
        innerSlider.style.left = sliderPos + '%'
        setTimeout(() => {
            leftClick = true
            slideImg.unshift(slideImg.pop())
            outerSliderPos = outerSliderPos - 100
            outerSlider.style.left = outerSliderPos + '%'
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.backgroundImage = `url(${slideImg[i]})`
            }
            newPos = sliderPos;
            innerSlider.style.transition = ''
        }, delay)
    }

    const moveRight = (delay) => {
        delay == null && (delay = 1000)
        innerSlider.style.transition = `left ${delay / 1000}s ease-in-out`
        // console.log('moveRight()', delay)
        rightClick = false
        sliderPos = sliderPos - 100
        innerSlider.style.left = sliderPos + '%'
        setTimeout(() => {
            rightClick = true
            slideImg.push(slideImg.shift())
            outerSliderPos = outerSliderPos + 100
            outerSlider.style.left = outerSliderPos + '%'
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.backgroundImage = `url(${slideImg[i]})`
            }
            newPos = sliderPos
        }, delay)
        
    }

    slider.onmouseover = () => {
        if (sliderPos % 100 === 0) {
            clearInterval(interval)
        }
    }

    slider.onmouseout = (e) => {
            if (e.target.parentElement.parentElement.parentElement.contains( e.relatedTarget)) {
            } else {
                setTimeout(() => {
                    clearInterval(interval)
                    interval = setInterval(moveRight, 5000)
                }, 3000)
            }
        
    }

    let startPos
    let newPos = 0;
    let pos
    let isSlide = false
    slider.onmousedown = (e) => {
        if (e.target.className == 'slide') {
            isSlide = true
            
        }
        catchSlider(e.clientX)
    }
    window.onmousemove = (e) => {
        // document.querySelector('#measures').innerHTML = e
        
        if (isSlide == true) {
            if (e.buttons == 1) {
                // console.log(e)
                moveSlider(e.clientX)
            }
        }
    }
    window.onmouseup = (e) => {
        if (isSlide == true) {
            releaseSlider()
        }
        // document.querySelector('html').style.curser = 'initial'
        
    }
    document.querySelector('body').style.curser = 'grabbing'
    slider.ontouchstart = (e) => {
        // console.log('-')
        clearInterval(interval)
        catchSlider(e.touches[0].clientX)
    }
    slider.ontouchmove = (e) => {
        moveSlider(e.touches[0].clientX)
    }
    slider.ontouchend = (e) => {
            releaseSlider()
        newPos = null
        setTimeout(() => {
            clearInterval(interval)
            interval = setInterval(() => {
                moveRight()
            }, 5000)
        }, 5000)
    }
    
    const catchSlider = (xPos) => {
        // console.log('catchSlider()')
        startPos = xPos - slider.offsetLeft
    }

    const moveSlider = (xPos) => {
        // console.log('moveSlider()')
        innerSlider.classList.add('notransition')
        pos = -(startPos - (xPos - slider.offsetLeft))
        newPos = sliderPos + (pos / sliderWidth * 100)
        if (newPos >= sliderPos - 100 && newPos <= sliderPos + 100) {
            innerSlider.style.left = newPos + '%'
        } else if (newPos < sliderPos - 100) {
            innerSlider.style.left = sliderPos - 100 + '%'
        } else if (newPos > sliderPos + 100) {
            innerSlider.style.left = sliderPos + 100 + '%'
        }
    }

    const releaseSlider = () => {
        // console.log(newPos, sliderPos)
        // console.log('releaseSlider()')
        innerSlider.style.transition = 'left 0.3s ease-in-out'
        if (newPos != sliderPos && newPos != 0) {
            // console.log(newPos, sliderPos)
            if (newPos < sliderPos - 100 / 5) {
                if (newPos < sliderPos - 70) {
                    moveRight(100)
                    // console.log(newPos < sliderPos - 100 / 5)
                }
                else if (newPos < sliderPos - 50) {
                    moveRight(200)
                    // console.log(newPos < sliderPos - 100 / 5)

                }
                else {
                    moveRight(300)
                    // console.log(newPos < sliderPos - 20)
                }
                
            }
            else if (newPos > sliderPos + 20) {
                if (newPos > sliderPos + 70) {
                    moveLeft(100)
                }
                else if (newPos > sliderPos + 50) {
                    moveLeft(200)
                }
                else {
                    moveLeft(300)
                }
            }
            else {
                innerSlider.style.left = sliderPos + '%'
            }
        }
        setTimeout(() => {
            innerSlider.style.transition = ''
        }, 500)
        innerSlider.classList.remove('notransition')
        isSlide = false
        newPos = sliderPos
    }

    leftBtn.onmouseup = () => {
        leftClick == true && moveLeft(300)
    }

    rightBtn.onmouseup = () => {
        rightClick == true && moveRight(300)
        // console.log('mouseup')
    }

    window.onresize = () => {
        sliderWidth = slider.clientWidth
        innerSlider.style.width = sliderWidth * slideImg.length + 'px'
        Array.prototype.forEach.call(slides, slide => {
            slide.style.width = sliderWidth + 'px'
        })
    }

    let interval = setInterval(moveRight, 5000)

    alert(`This script runs an automated and interactive slideshow
Beside the navigation buttons the slider is both draggable and swipeable.

Please note that the slider will stand still as long as a mouse cursor is hovering over it :-)`);
    
}