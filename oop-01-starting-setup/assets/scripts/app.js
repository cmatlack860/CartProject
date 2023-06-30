//classes
//class for simple item data
class Product {
  // title = 'default';
  // imageURL = '';
  // price;
  // stock;

  constructor(title, imageUrl, cost, stock) {
    this.title = title;
    this.imageURL = imageUrl;
    this.cost = cost;
    this.stock = stock;
    this.id = Math.random();

  }
}

//using inheritance in next couple examples to show how objects can be built using commonly used
//classes within other newer classes
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value - attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }
  createRootElement(tag, cssClasses, attr) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    };
    if (attr && attr.length > 0) {
      for (const elem in attr) {
        rootElement.setAttribute(elem.name, elem.value)
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement
  };
}

// cart class
// also noted using "super" in constructor to access constructor of parent class (component)
class Cart extends Component  {
  itemsArray = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.total = 0;
  }

// user setter to initliaze when calling new instance of the class
  set cartItems(value) {
    this.items = value;
  }

  // use getter method for total cart sum
  get totalAmount() {
    const sum = this.itemsArray.reduce((prevVal, item)=>{
      return prevVal + item.cost
    }, 0);
    return sum
  }

  orderProducts() {
    console.log('ordering...');
    console.log(this.itemsArray);
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.id = 'section';
    cartEl.innerHTML = `
    <h1> Total: \$${0}</h1>
    <div id='cartarea'></div>
    <button>Order now!</button>
    
    `;
    const button = cartEl.querySelector('button');
    button.addEventListener('click', () => this.orderProducts());
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h1');
    return cartEl
  };

  // addSum(prod) {
  //   this.total = this.total + prod.cost;
  // };

  // reduceSum(prod) {
  //   this.total = this.total - prod.cost;
  // }

  addCartClick(product) {
    this.itemsArray.push(product);
    console.log(this.itemsArray);
    // this.addSum(product);
    this.totalOutput.innerHTML = `<h1> Total: \$${this.totalAmount}</h1>`;
    const area = document.getElementById('cartarea');
    // area.innerHTML = '';
    // for (const prod of this.itemsArray) {
      
    //   const cartProduct = new ProductItem(prod);
    //   const prodEl = cartProduct.renderItem();
    //   document.getElementById('cartarea').append(prodEl);
    //   // console.log(cartProduct); 
      
    // };
    const cartProduct = new ProductItem(product);
    const prodEl = cartProduct.renderItem();
    
    document.getElementById('cartarea').append(prodEl);
    // return prodEl
  };

  deleteCartClick(product) {

    const area = document.getElementById('cartarea');
    const index = this.itemsArray.findIndex(e=> e.id == product.id);
    const splice = this.itemsArray.splice(index, 1);
    console.log(this.itemsArray);  
    console.log(splice);
    // this.reduceSum(product);
    this.totalOutput.innerHTML = `<h1> Total: \$${this.totalAmount}</h1>`;
    area.children[index].remove();
    // area.innerHTML = '';
    // for (const prod of this.itemsArray) {
    //   const cartProduct = new ProductItem(prod);
    //   const prodEl = cartProduct.renderItem();
    //   document.getElementById('cartarea').append(prodEl);
    //   console.log(cartProduct);  
    // };
    
    
  };
}

class ShopPage {
  render() {
    
    const renderHk = document.getElementById('app');
    this.cart = new Cart('app');
    const cartEl = this.cart.render();
    const productList = new ProductList('app');
    // const prodListEl = productList.render();
    productList.render();
    renderHk.append(cartEl);
    // renderHk.append(prodListEl);
    
  }
}

// class for item rendering, using constructor to create product
// constructor inialitzes property to object with this.product

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
    this.id = Math.random();
  }

  deleteBtnHandler() {
    App.deleteProduct(this.product);
  };

  addBtnHandler() {
    // console.log('added product to cart');
    // console.log(this.product);
    // calling on static method in app.init to pass down the logic
    App.addProductToCart(this.product);

  }

// html objects must use this.product.#### to know its the product property of the object created by this class
  renderItem() {
    // const prodEl = document.createElement('li'); original way of creating dom element
    // prodEl.className = 'product-item';
    //going to use inheritence way with extended Component class
        const prodEl = this.createRootElement('li', 'product-item')
        
        prodEl.innerHTML = `
          <div class='product-item_content'>
            <h2> Item: ${this.product.title}</h2>
            <img src=${this.product.imageUrl} alt='imgUrl'/>
            <h4> Cost: ${this.product.cost} </h4>
            <h4> Stock: ${this.product.stock} </h4><button>+</button><button>-</button>
            <button id='addbtn'>Add to cart</button>
            <button id='deletebtn'>Delete</button>
          </div>
        `;
        const cartButton = prodEl.querySelector('[id=addbtn]');
        const deleteButton = prodEl.querySelector('[id=deletebtn]')
        cartButton.addEventListener('click', this.addBtnHandler.bind(this));
        deleteButton.addEventListener('click', this.deleteBtnHandler.bind(this));

        // return prodEl; would return element when not using inheritence
  }
}


//class where items are created using another class, and then rendered in a list
class ProductList extends Component {
  
  products = [
    new Product(
    'Apple',
    'https://images.search.yahoo.com/search/images;_ylt=AwrEsS3MxlJkp.MAv7VXNyoA;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZANDQ0FEU1lDVF8xBHNlYwNzYw--?p=apple+picture&type=E211US105G0&ei=UTF-8&fr=mcafee&th=119.9&tw=119.9&imgurl=https%3A%2F%2Fblog.marketstreetunited.com%2Fhubfs%2FRed%2520Delicious%2520Apple.jpg%23keepProtocol&rurl=https%3A%2F%2Fblog.marketstreetunited.com%2Fdifferent-varieties-of-apples&size=1637KB&name=Different+Varieties+of+Apples&oid=6&h=4600&w=4600&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-daQapjOhkZ3DL9DhBFcZwHaHa%26pid%3DApi%26rs%3D1%26c%3D1%26qlt%3D95%26w%3D119%26h%3D119&tt=Different+Varieties+of+Apples&sigr=nOCcNHig.1cm&sigit=N8SBJtiJxwcu&sigi=Ofdr7UIzm6Pp&sign=tB6aTDIrSVWo&sigt=tB6aTDIrSVWo',
    2,
    15
  ),
    new Product(
      'Bike',
      'https://images.search.yahoo.com/search/images;_ylt=AwrEqHboxlJk3TIAWFVXNyoA;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZANDQ0FEU1lDVF8xBHNlYwNzYw--?p=bike+picture&type=E211US105G0&ei=UTF-8&fr=mcafee&th=106.6&tw=160.4&imgurl=https%3A%2F%2Fwww.bicycleretailer.com%2Fsites%2Fdefault%2Ffiles%2Fimages%2Farticle%2Fbatch_lifestyle_bike_.jpg&rurl=https%3A%2F%2Fwww.bicycleretailer.com%2Fnew-products%2F2019%2F08%2F01%2Fbatch-bicycles-unveils-new-lifestyle-bike-model&size=2526KB&name=Batch+Bicycles+unveils+new+Lifestyle+Bike+model+%7C+Bicycle+Retailer+and+...&oid=1&h=1333&w=2000&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EpRczwj7bVQuO_FF_6X-eAHaE7%26pid%3DApi%26rs%3D1%26c%3D1%26qlt%3D95%26w%3D160%26h%3D106&tt=Batch+Bicycles+unveils+new+Lifestyle+Bike+model+%7C+Bicycle+Retailer+and+...&sigr=xuVIWfOn7Jak&sigit=S5pmyR_eMqIP&sigi=rC0EE24Z_iPL&sign=ykOiy77pXw9d&sigt=ykOiy77pXw9d',
      200,
      5  
  )
  ]; 
  
  constructor(renderHookId) {
    super(renderHookId);
  };

  render() {
      // const prodList = document.createElement('ul');
      // prodList.className = 'product-list';
      const prodList = this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')])
      prodList.id = 'prod-list';
      for (const prod of this.products) {
        const productItem = new ProductItem(prod, 'prod-list');
        productItem.renderItem();
        // const prodEl = productItem.renderItem();
        // prodList.append(prodEl);
        
      }
      // cut out and just returned when creating cart
      // renderHook.append(prodList);
      // return prodList; removed for inheritence code

      }
  }

  // const productList = new ProductList();
  // productList.render()

//normal objects
const items = [
  { title: 'Apple',
    imageUrl: 'https://images.search.yahoo.com/search/images;_ylt=AwrEsS3MxlJkp.MAv7VXNyoA;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZANDQ0FEU1lDVF8xBHNlYwNzYw--?p=apple+picture&type=E211US105G0&ei=UTF-8&fr=mcafee&th=119.9&tw=119.9&imgurl=https%3A%2F%2Fblog.marketstreetunited.com%2Fhubfs%2FRed%2520Delicious%2520Apple.jpg%23keepProtocol&rurl=https%3A%2F%2Fblog.marketstreetunited.com%2Fdifferent-varieties-of-apples&size=1637KB&name=Different+Varieties+of+Apples&oid=6&h=4600&w=4600&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-daQapjOhkZ3DL9DhBFcZwHaHa%26pid%3DApi%26rs%3D1%26c%3D1%26qlt%3D95%26w%3D119%26h%3D119&tt=Different+Varieties+of+Apples&sigr=nOCcNHig.1cm&sigit=N8SBJtiJxwcu&sigi=Ofdr7UIzm6Pp&sign=tB6aTDIrSVWo&sigt=tB6aTDIrSVWo',
    cost: 2,
    stock: 15
    },
    {
      title: 'Bike',
      imageUrl: 'https://images.search.yahoo.com/search/images;_ylt=AwrEqHboxlJk3TIAWFVXNyoA;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZANDQ0FEU1lDVF8xBHNlYwNzYw--?p=bike+picture&type=E211US105G0&ei=UTF-8&fr=mcafee&th=106.6&tw=160.4&imgurl=https%3A%2F%2Fwww.bicycleretailer.com%2Fsites%2Fdefault%2Ffiles%2Fimages%2Farticle%2Fbatch_lifestyle_bike_.jpg&rurl=https%3A%2F%2Fwww.bicycleretailer.com%2Fnew-products%2F2019%2F08%2F01%2Fbatch-bicycles-unveils-new-lifestyle-bike-model&size=2526KB&name=Batch+Bicycles+unveils+new+Lifestyle+Bike+model+%7C+Bicycle+Retailer+and+...&oid=1&h=1333&w=2000&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EpRczwj7bVQuO_FF_6X-eAHaE7%26pid%3DApi%26rs%3D1%26c%3D1%26qlt%3D95%26w%3D160%26h%3D106&tt=Batch+Bicycles+unveils+new+Lifestyle+Bike+model+%7C+Bicycle+Retailer+and+...&sigr=xuVIWfOn7Jak&sigit=S5pmyR_eMqIP&sigi=rC0EE24Z_iPL&sign=ykOiy77pXw9d&sigt=ykOiy77pXw9d',
      cost: 200,
      stock: 5
    },
    {
      title: 'computer',
      imageUrl: 'https://images.search.yahoo.com/search/images;_ylt=AwrEqHboxlJk3TIAWFVXNyoA;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZANDQ0FEU1lDVF8xBHNlYwNzYw--?p=bike+picture&type=E211US105G0&ei=UTF-8&fr=mcafee&th=106.6&tw=160.4&imgurl=https%3A%2F%2Fwww.bicycleretailer.com%2Fsites%2Fdefault%2Ffiles%2Fimages%2Farticle%2Fbatch_lifestyle_bike_.jpg&rurl=https%3A%2F%2Fwww.bicycleretailer.com%2Fnew-products%2F2019%2F08%2F01%2Fbatch-bicycles-unveils-new-lifestyle-bike-model&size=2526KB&name=Batch+Bicycles+unveils+new+Lifestyle+Bike+model+%7C+Bicycle+Retailer+and+...&oid=1&h=1333&w=2000&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EpRczwj7bVQuO_FF_6X-eAHaE7%26pid%3DApi%26rs%3D1%26c%3D1%26qlt%3D95%26w%3D160%26h%3D106&tt=Batch+Bicycles+unveils+new+Lifestyle+Bike+model+%7C+Bicycle+Retailer+and+...&sigr=xuVIWfOn7Jak&sigit=S5pmyR_eMqIP&sigi=rC0EE24Z_iPL&sign=ykOiy77pXw9d&sigt=ykOiy77pXw9d',
      cost:1000,
      stock:3
    }
];


// making list an object with render method
const productLists = {
  render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of products) {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
        <div class='product-item_content'>
          <h2> Item: ${prod.title}</h2>
          <img src=${prod.imageUrl} alt='imgUrl'/>
          <h4> Cost: ${prod.cost} </h4>
          <h4> Stock: ${prod.stock} </h4>
          <button>Add to cart</button>
        </div>
      `;
      prodList.append(prodEl);
      
    }
    console.log(prodList);
    renderHook.append(prodList);
    
    }
}

//  must call object and method
// productList.render();

// must call shop class down here after the other classes it uses to render
// const shopPage = new ShopPage();
// shopPage.render();

// use of static
class App {
  static init() {
    const shopPage = new ShopPage();
    shopPage.render();
    this.cartUpdate = shopPage.cart; //refers to cart property on ShopPage
    console.log(shopPage);
    console.log(this.cartUpdate);
  };
  static addProductToCart(product) {
    this.cartUpdate.addCartClick(product);
  }
  static deleteProduct(product) {
    this.cartUpdate.deleteCartClick(product);
  }
}

App.init();