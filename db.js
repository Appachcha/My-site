const DB = {
  db:null,
  async init(){
    return new Promise((res,rej)=>{
      let request = indexedDB.open("ShoeCatalogDB",1);
      request.onupgradeneeded=e=>{
        let db=e.target.result;
        if(!db.objectStoreNames.contains("products")){
          db.createObjectStore("products",{keyPath:"code"});
        }
      };
      request.onsuccess=e=>{this.db=e.target.result; res();};
      request.onerror=e=>rej(e);
    });
  },
  async addProduct(product){
    await this.init();
    return new Promise((res,rej)=>{
      let tx = this.db.transaction("products","readwrite");
      tx.objectStore("products").put(product);
      tx.oncomplete=()=>res();
      tx.onerror=e=>rej(e);
    });
  },
  async getAllProducts(){
    await this.init();
    return new Promise((res,rej)=>{
      let tx=this.db.transaction("products","readonly");
      let req=tx.objectStore("products").getAll();
      req.onsuccess=()=>res(req.result);
      req.onerror=e=>rej(e);
    });
  },
  async deleteProduct(code){
    await this.init();
    return new Promise((res,rej)=>{
      let tx=this.db.transaction("products","readwrite");
      tx.objectStore("products").delete(code);
      tx.oncomplete=()=>res();
      tx.onerror=e=>rej(e);
    });
  }
};
DB.init();