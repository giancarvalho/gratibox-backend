
## Gratibox

Gratibox is a fictional startup that helps you stay grateful. Customers can choose between two recurring subscription plans: weekly or monthly. Each choice includes the delivery of assorted products such as teas, organic products and incense sticks. Simply select a plan, your preferred delivery day, which types of products you want to receive and start being grateful. 


You are in the backend repository, you can see the [front-end part here](https://github.com/giancarvalho/gratibox-frontend)


## Main technologies - backend

- Node.js
- Express
- Postgres

## How to run this project

1)  Run ```git clone https://github.com/giancarvalho/gratibox-backend.git ```
2) Run ```npm install```
3) Create a database and use the dump.sql to create the tables (in case you get errors, try copying and pasting first the ```CREATE TABLES```, then the ```ALTER TABLES``` and, finally, the ```INSERTS```)
4) Create the env files using the info of your DB, following the env.example
5) Run ```npm run start:dev```



POST \sign-up - requires an object following the model:

```   

     {       
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      }
      
``` 

POST \sign-in - requires an object following the model:

```


      {
        email: 'johndoe@example.com',
        password: '123456'
      }
      
      
```

POST \subscriptions - requires a registered uuid token and an object following the model (options is an list of options ids):

```  

      {
        planDetails: { planId: 1, day: 10 },
        addressData: {
          recipient: 'John Doe',
          address: 'Street Address, 1',
          city: 'City name',
          zipcode: '12345-678',
          stateId: 24
        },
        options: [ 1, 2, 3 ]
      }
```

--- 
This is the 15th project of Driven's Full-stack Web Dev Course. 
