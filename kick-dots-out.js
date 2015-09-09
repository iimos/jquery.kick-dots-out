!function () {

var leftClass = "kick-dots-out__l",
    rightClass = "kick-dots-out__r",
    spaceClass = "kick-dots-out__s",
    spaceTag = "<span class='" + spaceClass + "'> </span>",
    insertSpace;

function wrap(el) {
  insertSpace = false
  _wrap(el)
}
function _wrap(el) {
  var node = el.firstChild, text, words, i, tmp, next, newChild;
  do {
    switch (node.nodeType) {

      // tag node
      case 1:
        if (
          (" " + node.className + " ").search(" " + rightClass + " ") == -1 && 
          (" " + node.className + " ").search(" " + leftClass + " ") == -1
        ) {
          _wrap(node, true)
        }
        break;

      // text node
      case 3:
        if (node.nodeValue.length) {
          words = node.nodeValue.split(/\s+/)
          i = words.length
          while (i) {
            words[--i] = words[i]
              .replace(/([\.\,\?\!\;\:"'»\)]+)$/, "<span class='" + rightClass + "'>$1</span>")
              .replace(/^(["'«\()]+)/, "<span class='" + leftClass + "'>$1</span>")
          }

          text = words.join(spaceTag)

          if (insertSpace) {
            text = spaceTag + text
          }

          // If text was changed at last operation then (i.e. text node ends with dot)
          // at the begining of next text node insert "magic space"
          insertSpace = text.endsWith("</span>")
          
          tmp = document.createElement("i")
          tmp.innerHTML = text
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
  if (document.querySelectorAll && window.getComputedStyle) {
    var list = (context || document).querySelectorAll(selector),
        i = list.length,
        j,
        el,
        spaces,
        space,
        prev, 
        next,
        fs,
        w;
    
    while (i) {
      el = list[--i]
      wrap(el)
      spaces = el.querySelectorAll("." + spaceClass)
      
      for (j = 0; j < spaces.length; j++) {
        space = spaces[j]
        w = 0
        
        prev = space.previousSibling
        next = space.nextSibling

        if (next && next.className == leftClass) {
          // temporary make it inline-block for calculating width
          next.style.display = "inline-block" 
          w += parseFloat(next.clientWidth)
          fs = parseFloat(window.getComputedStyle(next)["font-size"])
          next.style.marginLeft = "-" + w/fs + "em"
          next.style.display = "inline"
        }
        
        if (prev && 1 == prev.nodeType) {
          if (prev.className != rightClass) {
            while (prev.lastChild && 1 == prev.lastChild.nodeType) prev = prev.lastChild       
          }
          if (prev && prev.className == rightClass) {
            prev.style.position = "absolute"
            w += parseFloat(prev.clientWidth)
          }
        }
        
        fs = parseFloat(window.getComputedStyle(space)["font-size"])
        space.style.wordSpacing = w/fs + "em"
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
