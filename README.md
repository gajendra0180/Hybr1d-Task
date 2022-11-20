<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">hybr1d-task</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Few lines describing your project.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Build a REST API for an e-commerce marketplace.
You will be building a set of REST API endpoints that enable the following functionality

● Buyers and sellers can register and login to the system

● Sellers can build a catalog of items, with each item having a name and price

● Buyers can GET a list of sellers

● Buyers can GET a specific seller's catalog (list of items)

● Buyers can create an Order that contains a list of items from the 
seller's catalog

● Sellers can GET a list of all orders they've received

## 🏁 Getting Started <a name = "getting_started"></a>

Set up the node version v10.16.3 on your Local.
### Prerequisites

Node version - 10.16.3

npm version - 6.9.0

```
PS C:\Users\gajendra0180\Documents\GitHub\Hybr1d-Task> node -v
v10.16.3
PS C:\Users\gajendra0180\Documents\GitHub\Hybr1d-Task> npm -v
6.9.0
```

### Installing

A step by step series of examples that tell you how to get a development env running.


```
npm install
```

And then

```
npm start
```

Do not forget to create the .env file from .env.example file


## 🎈 Usage <a name="usage"></a>
Following are the different entities in the system:
1. Users

    ○ Two types: buyers and sellers

    ○ A user can sign up as a buyer or as a seller

2. Catalogs
    
    ○ A catalog belongs to a seller
    
    ○ One seller can have one catalog
    
    ○ A catalog consists of Products
3. Products

    ○ A product has a name and a price

4. Orders

    ○ An order can be created by a buyer to purchase items from a seller's catalog

    ○ An order consists of a list of products

# APIs

Following are a few examples of the API endpoints you should expose.
## Auth APIs

POST /api/auth/register

    ● Register a user (accept username, password, type of user - buyer/seller)

POST /api/auth/login
    
    ● Let a previously registered user log in (e.g. retrieve authentication token)

## APIs for buyers

GET /api/buyer/list-of-sellers

    ● Get a list of all sellers

GET /api/buyer/seller-catalog/:seller_id
    
    ● Get the catalog of a seller by seller_id
POST /api/buyer/create-order/:seller_id
    
    ● Send a list of items to create an order for seller with id = seller_id

## APIs for sellers
   
POST /api/seller/create-catalog
    
    ● Send a list of items to create a catalog for a seller

GET /api/seller/orders
    
    ● Retrieve the list of orders received by a seller


## 🚀 Deployment <a name = "deployment"></a>

     npm install

     npm start

## ⛏️ Built Using <a name = "built_using"></a>

- [MySql](https://www.mysql.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Sequelize](https://sequelize.org/) - ORM

## ✍️ Authors <a name = "authors"></a>

- [@gajendra0180](https://github.com/gajendra0180) - Author



## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Stack Overflow :)
- Medium Articles
