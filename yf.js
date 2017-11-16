$.fn.switchObj = function (control, box) {
    function switchBox(control, box) {
      this.control = control;
      this.box = box;
    }
    // 鼠标点击加类 / 去除类 控制盒子显示隐藏
    switchBox.prototype.switchFunc = function (aClass) {
      var control = this.control;
      var box = this.box;
      $(this.control).click(function () {
        $(this).addClass(aClass).siblings(control).removeClass(aClass);
        $(box).eq($(this).data('num')).show().siblings(box).hide();
      })
    }

    // nav导航栏下拉效果
    switchBox.prototype.navShFunc = function () {
      var control = this.control;
      $(contorl).hover(function () {
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

    return new switchBox(control, box);
  }

  