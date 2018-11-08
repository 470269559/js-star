(function(){
    function Star(options){
        this.number = options.number
        this.starSize = options.starSize
        this.color = options.color
        this.element = document.querySelector(options.el) 
        this.isHalf = options.isHalf
        this.starNumber = this.isHalf ? options.starNumber : Math.floor(options.starNumber)
        if(options.success && typeof options.success === 'function'){
            this.success = options.success
        }

        this.render()
    }

    Star.prototype = {
        render:function(el){
            let html = '<ul style="font-size:'+this.starSize+'px;color:'+this.color+';margin:0;padding:0;list-style: none;">'
            for(let i = 0;i < this.number;i++){
                html += '<li style="float: left;margin-right: 5px;cursor: pointer;"><i index="'+i+'" class="fa '
                if(i < this.starNumber){
                    if(this.starNumber.toString().includes('.') && i === this.starNumber - 0.5 && this.isHalf){
                        html += 'fa-star-half-o'
                    }else{
                        html += 'fa-star'
                    }
                }else{
                    html += 'fa-star-o'
                }

                html += '"></i></li>'
            }
            html += '</ul>'

            this.element.innerHTML = html

            this.bindEvent()
        },
        bindEvent:function(){
            this.element.addEventListener('mousemove', this.overDeal.bind(this))
            this.element.addEventListener('mouseout', this.outDeal.bind(this))
            this.element.addEventListener('click', this.clickDeal.bind(this))
        },
        clickDeal:function(e){
            if(e.target && e.target.nodeName.toUpperCase() === 'I'){
                const isHalf =  this.getXAndY(e).x < Number.parseInt(window.getComputedStyle(e.target).width)/2
                const index = Number.parseInt(e.target.getAttribute('index'))
                this.starNumber = isHalf && this.isHalf ? index+0.5 : index+1
                this.showStarNumber(this.starNumber,true)
            }
        },
        overDeal:function(e){
            if(e.target && e.target.nodeName.toUpperCase() === 'I'){
                const isHalf =  this.getXAndY(e).x < Number.parseInt(window.getComputedStyle(e.target).width)/2
                const index = Number.parseInt(e.target.getAttribute('index'))
                const inx = isHalf ? index+0.5 : index+1
                this.showStarNumber(inx)
            }
        },
        outDeal:function(e){
            if(e.target && e.target.nodeName.toUpperCase() === 'I'){
                this.showStarNumber(this.starNumber)
            }
        },
        showStarNumber:function(starNumber,clickFlag){
            const self = this
            let childNodes = this.element.firstChild.childNodes,starNumberBy = 0
            childNodes.forEach(function(node,index) {
                let ii = node.firstChild
                if(index < starNumber){
                    if(starNumber.toString().includes('.') && index === starNumber - 0.5 && self.isHalf){//有半星
                        ii.setAttribute('class','fa fa-star-half-o')
                    }else{
                        ii.setAttribute('class','fa fa-star')
                    }
                }else{
                    ii.setAttribute('class','fa fa-star-o')
                }
            })

            if(clickFlag && this.success){
                this.success(this.starNumber)
            }
        },
        getXAndY: function(event) {
            Ev = event || window.event
            const mousePos = this.mouseCoords(event)
            const x = mousePos.x
            const y = mousePos.y

            const x1 = event.target.getBoundingClientRect().left
            const y1 = event.target.getBoundingClientRect().top

            const x2 = x - x1
            const y2 = y - y1
            return {x: x2,y: y2}
        },
        mouseCoords: function(event) {
            if(event.pageX || event.pageY) {
                return {
                    x: event.pageX,
                    y: event.pageY
                }
            }
            return {
                x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: event.clientY + document.body.scrollTop - document.body.clientTop
            }
        }
    }

    window.Star = Star
})(window)