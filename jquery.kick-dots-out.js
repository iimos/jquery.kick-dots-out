(function ($) {

  var dotTag = "<span class='kick-dots-out__dot'>$1</span>",
      spaceTag = "<span class='kick-dots-out__s'> </span>",
      insertSpace;

  function wrapDots(el) {
    insertSpace = false
    _wrapDots(el)
  }
  function _wrapDots(el) {
    var t, len;
    $(el).contents().each(function () {
      switch (this.nodeType) {

        // tag node
        case 1:
          if (!$(this).hasClass("kick-dots-out__dot")) {
            wrapDots(this, true)
          }
          break;

        // text node
        case 3:
          if (this.nodeValue.length) {
            t = this.nodeValue
            if (insertSpace) {
              t = spaceTag + t
            }

            len = t.length
            t = t.replace(/([\.\,\?\!\;\:]+)\s*$/, dotTag)
            
            // If text was changed at last operation then (i.e. text node ends with dot)
            // at the begining of next text node insert "magic space"
            insertSpace = (len != t.length)
            
            t = t.replace(/([\.\,\?\!\;\:])\s/g, dotTag + spaceTag)

            $(this).replaceWith(t)
          }
          break;
      }
    })
  }

  $.fn.kickDotsOut = function () {
    return this.each(function () {
      wrapDots(this);
      var spaces = $(".kick-dots-out__s", this), fs;
      
      $(".kick-dots-out__dot", this).each(function (i) {
        fs = parseFloat($(this).css("font-size"))
        $(spaces[i]).css("word-spacing", ($(this).width()/fs) + "em")
      })
    })
  }

  $(function () {
    $(".kick-dots-out").kickDotsOut()
  })

})(jQuery);