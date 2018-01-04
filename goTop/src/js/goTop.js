function goTop(obj) {
  var flag = true;
  var nowTop;
  var timer;
  var windowPageY;
  var isIe8;
  (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 9)?isIe8 = true : isIe8 = false;

  function goTopObj(obj) {
    this.obj = obj;
  }

  goTopObj.prototype.setClick = function () {
    var _ = this;
    if (!this.obj.el) return this;
    if(~this.obj.el.indexOf('#')) {
      this.obj.el = this.obj.el.substring(1)
      var el = document.getElementById(this.obj.el+'');
      if(isIe8) {
        el.attachEvent('onclick', function () {
          _.ie8Move();
        })
      } else {
        el.addEventListener('click', function () {
          _.move();
        })
      }
    } else if(~this.obj.el.indexOf('.')) {
      this.obj.el = this.obj.el.substring(1)
      var elBox = document.getElementsByClassName(this.obj.el+'');
      if(elBox.length > 1) {
        for(var i = 0; i < elBox.length; i++) {
          if(isIe8) {
            elBox[i].attachEvent('onclick', function () {
              _.ie8Move();
            })
          } else {
            elBox[i].addEventListener('click', function () {
              _.move();
            })
          }
        }
      } else {
        if(isIe8) {
          elBox[0].attachEvent('onclick', function () {
            _.ie8Move();
          })
        } else {
          elBox[0].addEventListener('click', function () {
            _.move();
          })
        }
      }
    }
    return this;
  }

  goTopObj.prototype.move = function () {
    var _ = this;
    var speed;
    !this.obj.speed? speed = 50: speed = this.obj.speed;
    if (!this.obj.target) this.obj.target = 0;
    if (!this.obj.type) this.obj.type = 'ease-in';
    if (this.obj.type == 'ease') {
      nowTop = window.pageYOffset
      if (flag) {
        flag = false;
        clearInterval(timer);
        timer = setInterval(function () {
          if (nowTop > _.obj.target) {
            nowTop -= speed;
            window.scrollTo(window.pageXOffset, nowTop)
          } else if (nowTop == 0) {
            clearInterval(timer);
            flag = true;
          } else {
            clearInterval(timer);
            window.scrollTo(window.pageXOffset, 0)       
            flag = true;
          }
        }, 10)
      }
    } else if(this.obj.type == 'ease-in') {
      nowTop = window.pageYOffset
      if (flag) {
        flag = false;
        clearInterval(timer);
        timer = setInterval(function () {
          if (nowTop > _.obj.target) {
            nowTop -= speed;
            if(speed < Math.round(speed*1.5)) speed = Math.round(speed * 1.1);
            window.scrollTo(window.pageXOffset, nowTop)
          } else if (nowTop == 0) {
            clearInterval(timer);
            flag = true;
          } else {
            clearInterval(timer);
            window.scrollTo(window.pageXOffset, 0)       
            flag = true;
          }
        }, 10)
      }
    }
  }

  goTopObj.prototype.ie8Move = function () {
    window.scrollTo(document.documentElement.scrollLeft, 0)
  }

  goTopObj.prototype.reset = function () {
    
  }

  var goTop = new goTopObj(obj);
  return goTop;
}
