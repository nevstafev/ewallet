# this is ewallet app that simulates creating account, deposit/withdraw money to it, transfer money between accounts

Backend api:
create new account `POST /api/accounts/ {"name":"accountName"}` returns `{"id":accountId,"name":"accountName","balance":0}`
create new account `POST /api/accounts/ {"name":"accountName"}`
deposit money `POST api/accounts/:accountId/deposit {amount: 100}` returns transfer `{"id":10,"createdDate":"2020-12-16T14:57:32.487+00:00","sender":null,"recipient":2,"amount":100}`

withdraw money `POST api/accounts/:accountId/withdraw {amount: 100}` returns transfer `{"id":10,"createdDate":"2020-12-16T14:57:32.487+00:00","sender":2,"recipient":null,"amount":100}`

transferMoney to another account `POST api/accounts/2/transfers {amount: 1, recipient: 3}` returns transfer `{"id":11,"createdDate":"2020-12-16T15:00:51.591+00:00","sender":2,"recipient":3,"amount":1}`

# For local development use:

- for frontend: `cd /frontend` `npm start` this command starts proxy server with parcel

- for backend: You need running postgres on localhost and then `mvnw spring-boot:run` this starts local development server
