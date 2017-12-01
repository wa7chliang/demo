$.fn.switchObj = function (control, box) {
    function switchBox(control, box) {
      this.control = control;
      this.box = box;
    }
    // 鼠标点击加类 / 去除类 控制盒子显示隐藏
    switchBox.prototype.switchFunc = function (aClass, obj) {
      var control = this.control;
      var box = this.box;
      // 查看是否有自动轮播
      var obj = obj || {};
      obj.activeNum == null ? obj.activeNum = 0 : obj.activeNum = obj.activeNum;
      var len = $(this.control).length
      if(obj.autoPlay == true) {
        var timers = ''
        timers = setInterval(autoPlay, obj.time)
          $(this.control).hover(function () {
            clearInterval(timers)
          }, function () {
            timers = setInterval(autoPlay, obj.time)
          })
          $(box).hover(function () {
            clearInterval(timers)
          }, function () {
            timers = setInterval(autoPlay, obj.time)
          })

          $(this.control).click(function () {
            $(control).removeClass(aClass);
            $($(control)[$(this).data('num')]).addClass(aClass);
            $(box).eq($(this).data('num')).show().siblings(box).hide();
            obj.activeNum = $(this).data('num')
          })

          function autoPlay() {
            if(obj.activeNum < len - 1) {
              obj.activeNum++
              $(control).removeClass(aClass);
              $($(control)[obj.activeNum]).addClass(aClass);
              $(box).eq(obj.activeNum).show().siblings(box).hide();
            } else {
              obj.activeNum = 0;
              $(control).removeClass(aClass);
              $($(control)[obj.activeNum]).addClass(aClass);              
              $(box).eq(0).show().siblings(box).hide();
            }
          }
      // 无轮播正常执行代码
      } else {
        $(this.control).click(function () {
          $(control).removeClass(aClass);
          $($(control)[$(this).data('num')]).addClass(aClass);
          $(box).eq($(this).data('num')).show().siblings(box).hide();
        })
      }

    }

    // nav导航栏下拉效果
    switchBox.prototype.navShFunc = function () {
      var control = this.control;
      $(control).hover(function () {
        $(this).children('ul').slideDown();
      }, function () {
        $(this).children('ul').slideUp();            
      })
    }

    // 鼠标经过鼠标运动效果
    switchBox.prototype.hoverAnimate = function (attr, start, end, time) {
      var control = this.control;
      if(attr == 'margin-top' || 'marginTop') {
        $(control).hover(function () {
          $(this).stop().animate({ marginTop: end, }, time)
        }, function () {
          $(this).stop().animate({ marginTop: start, }, time)
        })
      }
    }
    // 兼容低版本的输入框提示效果
    switchBox.prototype.inputTips = function () {
      var control = this.control;
      $(control).focus(function () {
        if($(this).val() == this.defaultValue) $(this).val('')
      })
      $(control).blur(function () {
        if($(this).val() == this.defaultValue || $(this).val() == '') $(this).val(this.defaultValue)
      })
    }

    return new switchBox(control, box);
  }

  