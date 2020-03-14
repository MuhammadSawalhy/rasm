var SUI = {

};

function clearNodes(elt) {
   while (elt.hasChildNodes()) {
      elt.firstChild.remove();
   }
}

function getElementsFromHTML(html) {
   let div = document.createElement('div');
   div.innerHTML = html;
   return div.childNodes;
}

