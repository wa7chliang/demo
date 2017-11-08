$.fn.switchObj = function (control, box, aClass) {
    function switchBox(control, box) {
      this.control = control;
      this.box = box;
      this.aClass = aClass;
    }
    switchBox.prototype.switchFunc = function () {
      var control = this.control;
      var box = this.box;
      var aClass = this.aClass;
      $(this.control).click(function () {
        $(this).addClass(aClass).siblings(control).removeClass(aClass);
        $(box).eq($(this).data('num')).show().siblings(box).hide();
      })
    }
    return new switchBox(control, box);
  }

  