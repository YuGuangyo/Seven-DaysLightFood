window.addEventListener('load', function() {
  
  // 1. 获取元素 
  const banner = document.querySelector('.banner')
  const focus = document.querySelector('.focus')
  const lis = focus.querySelectorAll('li')
  const ol = focus.nextElementSibling
  const left = banner.querySelector('.click-r')
  const right = banner.querySelector('.click-l')
  const banWidth = banner.offsetWidth + 6  // css结构有问题 实际大小1246
  let flag = true
  let timer = null
  // 2. 渲染圆点 有几个li就·渲染几个
  for (let i = 0; i < lis.length; i++) {
   const li =  document.createElement('li')
   li.dataset.index = i
   ol.appendChild(li)
   // 3. 点击圆点时就切换圆点 可以在创建时就绑定点击时间
   li.addEventListener('click', function() {
    banner.querySelector('.active').classList.remove('active')
    this.classList.add('active')

    // 3.1 点击li时可以移动ul 拿到li的自定义属性值 dataset-index
    // 调用动画函数
    const index = this.dataset.index  
    // console.log(index)
    // console.log(banWidth)
    animate(focus, -index * banWidth, function() {
      num1 = index
      num  = index
      cricle = index
     /*  console.log(num1)
      console.log(num) */
    })
   })
  }

   // 2.1 渲染完成后给第一个li 添加类名
   ol.children[0].classList.add('active')
   focus.appendChild(focus.children[0].cloneNode(true))
   focus.style.width = (lis.length + 2) * 100 + '%' || '100%' 

  // 4. 鼠标径就显示左右箭头 离开就隐藏
banner.addEventListener('mouseenter', function() {
  left.style.display = 'block'
  right.style.display = 'block'
  clearInterval(timer)
})

banner.addEventListener('mouseleave', function() {
  left.style.display = 'none'
  right.style.display = 'none'
  openTimer()
})

// 5. 点击右侧按钮时移动
let num = 0
let cricle = 0 // 圆点的走向

left.addEventListener('click', function() {
  if (flag) {
      flag = false
      if (num >= lis.length) { 
        num = 0
        focus.style.left = 0
      }
      num++
      num1 = num
      // console.log(num)
      animate(focus, - num * banWidth)
      // console.log(num)
      // 5.1 让圆点跟着图片走
      cricle++
      if (cricle >= ol.children.length) cricle = 0
      // console.log(cricle)
      banner.querySelector('.active').classList.remove('active')
      ol.children[cricle].classList.add('active')
      flag = true
    }
})

let num1 = 0
//  6. 点击左侧按钮时移动
right.addEventListener('click', function() {
    if (flag){
      flag = false
      if (num1 <= 0) {
        num1 = lis.length
        focus.style.left = - num1 * banWidth + 'px'
      }
      num1--
      num = num1
      // console.log(num)
      animate(focus, - num1 * banWidth)

      // 6.1 让圆点跟着图片走
      if (cricle <= 0) cricle = ol.children.length
      cricle--
      // console.log(cricle)
      banner.querySelector('.active').classList.remove('active')
      ol.children[cricle].classList.add('active')
      flag = true
  }
})  


  // 0. 封装一个动画函数
  function animate(obj, target, callback) {
    clearInterval(obj.name)
   obj.name = setInterval(function () {
      if (obj.offsetLeft === target) {
        clearInterval(obj.name)
        if (callback) {callback()}
      }
      let step = (target - obj.offsetLeft) / 10
      step = step > 0 ? Math.ceil(step) : Math.floor(step)
      obj.style.left = obj.offsetLeft + step +'px'
    }, 15)
  }
  // 7. 自动播放
  openTimer()
  function openTimer() {
    clearInterval(timer)
    timer = setInterval(function () {
      left.click()
    }, 4000)
  }

})