(function ($) {

var dotClass = "kick-dots-out__dot",
    spaceClass = "kick-dots-out__s",
    dotTag = "<span class='" + dotClass + "'>$1</span>",
    spaceTag = "<span class='" + spaceClass + "'> </span>",
    insertSpace;

function wrapDots(el) {
  insertSpace = false
  _wrapDots(el)
}
function _wrapDots(el) {
  var node = el.firstChild, t, len, tmp, next, newChild;
  do {
    switch (node.nodeType) {

      // tag node
      case 1:
        if ((" " + node.className + " ").search(" " + dotClass + " ") == -1) {
          _wrapDots(node, true)
        }
        break;

      // text node
      case 3:
        if (node.nodeValue.length) {
          t = node.nodeValue
          if (insertSpace) {
            t = spaceTag + t
          }

          len = t.length
          t = t.replace(/([\.\,\?\!\;\:]+)\s*$/, dotTag)
          
          // If text was changed at last operation then (i.e. text node ends with dot)
          // at the begining of next text node insert "magic space"
          insertSpace = (len != t.length)
          
          t = t.replace(/([\.\,\?\!\;\:])\s/g, dotTag + spaceTag)

          tmp = document.createElement("i")
          tmp.innerHTML = t
          while (tmp.firstChild) {
            newChild = el.insertBefore(tmp.firstChild, node)
          }
          el.removeChild(node)
          node = newChild
        }
        break;
    }
  }
  while (node = node.nextSibling)
}

$.fn.kickDotsOut = function () {
  return this.each(function () {
    wrapDots(this);
    var spaces = $("." + spaceClass, this), fs;
    
    $("." + dotClass, this).each(function (i) {
      fs = parseFloat($(this).css("font-size"))
      $(spaces[i]).css("word-spacing", ($(this).width()/fs) + "em")
    })
  })
}

$(function () {
  $(".kick-dots-out").kickDotsOut()
})

})(jQuery);
