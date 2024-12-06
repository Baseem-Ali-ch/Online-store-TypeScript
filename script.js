var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

// Parent class product
var Product = /** @class */ (function () {
    function Product(name, id) {
        this.name = name;
        this.id = id;
    }
    Product.prototype.getInfo = function () {
        return "Product: ".concat(this.name);
    };
    return Product;
}());

// Child class book
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(name, id, author) {
        var _this = _super.call(this, name, id) || this;
        _this.author = author;
        return _this;
    }
    Book.prototype.getInfo = function () {
        return "Book: ".concat(this.name, " by ").concat(this.author);
    };
    return Book;
}(Product));

// Child class gadget
var Gadget = /** @class */ (function (_super) {
    __extends(Gadget, _super);
    function Gadget(name, id, brand) {
        var _this = _super.call(this, name, id) || this;
        _this.brand = brand;
        return _this;
    }
    Gadget.prototype.getInfo = function () {
        return "Gadget: ".concat(this.name, " (Brand: ").concat(this.brand, ")");
    };
    return Gadget;
}(Product));

// Child class stationary
var Stationary = /** @class */ (function (_super) {
    __extends(Stationary, _super);
    function Stationary(name, id, brand) {
        var _this = _super.call(this, name, id) || this;
        _this.brand = brand;
        return _this;
    }
    Stationary.prototype.getInfo = function () {
        return "Stationary: ".concat(this.name, " (Brand: ").concat(this.brand, ")");
    };
    return Stationary;
}(Product));

// Store class
var Store = /** @class */ (function () {
    function Store() {
        this.products = [];
        this.currentId = 1;
    }
    Store.prototype.addProduct = function (product) {
        this.products.push(product);
        this.renderInventory();
    };
    Store.prototype.removeProduct = function (id) {
        this.products = this.products.filter(function (product) { return product.id !== id; });
        this.renderInventory();
    };
    Store.prototype.renderInventory = function () {
        var inventoryList = document.getElementById("inventory-list");
        inventoryList.innerHTML = "";
        this.products.forEach(function (product) {
            var li = document.createElement("li");
            li.innerHTML = "\n                ".concat(product.getInfo(), "\n                <span class=\"delete-btn\" onclick=\"removeProduct(").concat(product.id, ")\">Delete</span>\n            ");
            inventoryList.appendChild(li);
        });
    };

    // to increment id
    Store.prototype.getNextId = function () {
        return this.currentId++;
    };
    return Store;
}());

var store = new Store();

// Add product function
window.addProduct = function () {
    var productName = document.getElementById("product-name").value;
    var productInfo = document.getElementById("product-info").value;
    var productType = document.getElementById("product-type").value;
    if (!productName || !productInfo) {
        alert("Please fill all fields");
        return;
    }
    var id = store.getNextId();
    var product;
    if (productType === "book") {
        product = new Book(productName, id, productInfo);
    }
    else if (productType === "gadget") {
        product = new Gadget(productName, id, productInfo);
    }
    else {
        product = new Stationary(productName, id, productInfo);
    }
    store.addProduct(product);
    document.getElementById("product-name").value = "";
    document.getElementById("product-info").value = "";
};

// Remove product function
window.removeProduct = function (id) {
    store.removeProduct(id);
};
