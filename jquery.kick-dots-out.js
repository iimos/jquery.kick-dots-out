!function () {

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

function kickDotsOut(selector, context) {
  if (document.querySelectorAll) {
    var list = (context || document).querySelectorAll(selector), 
        i = list.length,
        j,
        el, 
        spaces,
        dots, 
        fs, 
        w;
    
    while (i) {
      el = list[--i]
      console.log(el)
      wrapDots(el)
      spaces = el.querySelectorAll("." + spaceClass)
      dots = el.querySelectorAll("." + dotClass)
      for (j = 0; j < dots.length; j++) {
        if (spaces[j]) {
          fs = parseFloat(dots[j].style.fontSize)
          w = parseFloat(dots[j].clientWidth)
          spaces[j].style.wordSpacing = w/fs + "em"
        }
      }
    }
  }
}

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', function() {
    kickDotsOut(".kick-dots-out")
  })
}

}();
