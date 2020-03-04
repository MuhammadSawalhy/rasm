importScripts('src/js/worker/1.magicalparser.js');
self.addEventListener('message', (msg) => {
   postMessage(msg.data);
   // for (let child of message.children) {
   //    if (child) {
   //       child.update();
   //    }
   // }
   // message.status = 'ready';
});