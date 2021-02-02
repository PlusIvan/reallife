export class RequestAPI{

    /**
     * 
     * @param {*} object 
     * @example
     * {headers:{'auth-token':'string','user-id':0}, data: {}, url:''}
     */
    constructor(object) {
        this.API = 'https://client-dot-horus-rlt-dev.appspot.com/api/client/v1/';
        this.obj = object;
      }

      async get() {
          const response = await fetch(this.API + this.obj.url,{
            method: 'get',  
            headers:{
            ...this.obj.headers
          }});
          return await response.json();
      }

      /**
       * 
       */
      async post(){
          const response = await fetch(this.API + this.obj.url,{
              method: 'post',
              body: new FormData(document.getElementById('form')),
              headers:{
                  ...this.obj.headers
                }});
          return await response.json();
      }


}