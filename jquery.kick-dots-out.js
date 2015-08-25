(function ($) {

  var dotTag = "<span class='kick-dots-out__dot'>$1</span>",
      spaceTag = "<span class='kick-dots-out__s'> </span>",
      insertSpace = false;

  function wrapDots(el) {
    var t, len;
    $(el).contents().each(function () {
      switch (this.nodeType) {

        // тег
        case 1:
          wrapDots(this)
          break;

        // текст
        case 3:
          if (this.nodeValue.length) {
            t = this.nodeValue
            if (insertSpace) {
              t = spaceTag + t
            }

            len = t.length
            t = t.replace(/([\.\,]+)\s*$/, dotTag)
            
            // Если текст изменился при предыдущей замене, 
            // т.е. если в конце была точка, то в начале 
            // следующего текста вставляем "волшебный" пробел.
            insertSpace = (len != t.length)
            
            t = t.replace(/([\.\,])\s/g, dotTag + spaceTag)

            $(this).replaceWith(t)
          }
          break;
      }
    })
  }

  $.fn.kickDotsOut = function () {
    return this.each(function () {
      wrapDots(this)
    })
  }

  $(function () {
    $(".kick-dots-out").kickDotsOut()
  })

})(jQuery);