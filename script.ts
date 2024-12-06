// Parent class product
class Product {
  constructor(public name: string, public id: number) {}

  getInfo(): string {
    return `Product: ${this.name}`;
  }
}

// Child class book
class Book extends Product {
  constructor(name: string, id: number, public author: string) {
    super(name, id);
  }

  getInfo(): string {
    return `Book: ${this.name} by ${this.author}`;
  }
}

// Child class gadget
class Gadget extends Product {
  constructor(name: string, id: number, public brand: string) {
    super(name, id);
  }

  getInfo(): string {
    return `Gadget: ${this.name} (Brand: ${this.brand})`;
  }
}

// Child class stationary
class Stationary extends Product {
  constructor(name: string, id: number, public brand: string) {
    super(name, id);
  }

  getInfo(): string {
    return `Stationary: ${this.name} (Brand: ${this.brand})`;
  }
}

// Store class
class Store {
  private products: Product[] = [];
  private currentId = 1;

  addProduct(product: Product): void {
    this.products.push(product);
    this.renderInventory();
  }

  removeProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
    this.renderInventory();
  }

  renderInventory(): void {
    const inventoryList = document.getElementById("inventory-list")!;
    inventoryList.innerHTML = "";

    this.products.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `
                ${product.getInfo()}
                <span class="delete-btn" onclick="removeProduct(${
                  product.id
                })">Delete</span>
            `;
      inventoryList.appendChild(li);
    });
  }

  // to increment id
  getNextId(): number {
    return this.currentId++;
  }
}


const store = new Store();

// Add product function
(window as any).addProduct = function () {
  const productName = (
    document.getElementById("product-name") as HTMLInputElement
  ).value;
  const productInfo = (
    document.getElementById("product-info") as HTMLInputElement
  ).value;
  const productType = (
    document.getElementById("product-type") as HTMLSelectElement
  ).value;

  if (!productName || !productInfo) {
    alert("Please fill all fields");
    return;
  }

  const id = store.getNextId();
  let product: Product;

  if (productType === "book") {
    product = new Book(productName, id, productInfo);
  } else if (productType === "gadget") {
    product = new Gadget(productName, id, productInfo);
  } else {
    product = new Stationary(productName, id, productInfo);
  }

  store.addProduct(product);
  (document.getElementById("product-name") as HTMLInputElement).value = "";
  (document.getElementById("product-info") as HTMLInputElement).value = "";
};

// Remove product function
(window as any).removeProduct = function (id: number) {
  store.removeProduct(id);
};
