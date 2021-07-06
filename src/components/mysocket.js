// class Singleton {
//   constructor () {
//     if (!Singleton.instance) {
//       Singleton.instance = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
//     }
//     // Initialize object
//     return Singleton.instance
//   }
// }

// const instance = new Singleton()
// // Object.freeze(instance)

// export default instance

let SingletonFactory;
export default SingletonFactory = (function(){
  function SingletonClass() {
      return io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
  }
  var instance;
  return {
      getInstance: function(){
          if (instance == null) {
              instance = new SingletonClass();
              // Hide the constructor so the returned object can't be new'd...
              instance.constructor = null;
          }
          return instance;
      }
 };
})();