
class Profile {
  constructor({ username, name, password }) {
      this.username = username;
      this.name = name;
      this.password = password;
    }

  newUserAdd(callback) {        
    console.log({ username: this.username, name: this.name, password: this.password });
    return ApiConnector.createUser({ username: this.username, name: this.name, password: this.password },  (err, data) => {
      console.log(`Creating user ${this.username}...`);
      callback(err, data);
    });
  } 

  authorization(callback) {
    return ApiConnector.performLogin({ username: this.username, password: this.password },  (err, data) => {
      console.log(`Authorizing user ${this.username}...`);
      callback(err, data);
    });
        
  }

  moneyAddToWallet({ currency, amount }, callback) {
    return ApiConnector.addMoney({ currency, amount }, (err, data) => {
      console.log(`Adding ${amount} of ${currency} to ${this.username}...`);
      callback(err, data);
    });
  }
/*    
    currencyConversion({ fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Convert ${targetAmount} from ${fromCurrency} to ${targetCurrency}`);
            callback(err, data);
        });
    
    }
     
    tokenTo({ usernameResiver, resiverSum}, callback) {
        return ApiConnector.transferMoney({ usernameResiver, resiverSum }, (err, data) => {
            console.log(`Transfer ${resiverSum} from ${this.username} to ${usernameResiver}`);
            callback(err, data);
        });
    }*/
 

}

function receivingExchangeRates() {

  let exchangeRates = ApiConnector.getStocks();   
}

//2
function main() {
  const Petr = new Profile({
    username: 'Petr',
    name: { firstName: 'Petr', lastName: 'Pupkin' },
    password: 'petrpass'
  });
  const Mari = new Profile({
    username: 'Mari',
    name: { firstName: 'Mari', lastName: 'Garu' },
    password: 'marypass'
  });

   // console.log(Petr);

  Petr.newUserAdd((err, data) => {
    if (err) {
      console.error(`Error during creating user ${this.username}.`);
    } else {
      console.log(`Petr is created.`);

      Mari.newUserAdd((err, data) => {
        if (err) {
          console.error(`Error during creating user ${this.username}.`);
        } else {
          console.log(`Mari is created.`);
      }});

      Petr.authorization((err, data) => {
        if (err) {
          console.error(`Error authorization of ${this.username}.`);
        } else {
          console.log(`Petr is authorized.`);
          Petr.moneyAddToWallet({ currency: 'RUB', amount: 100 }, (err, data) => {
            if (err) {
              console.error('Error during adding money to Petr');
            } else {
              console.log(`Added 100 RUB to Petr.`);
          }});
      }});
  }});   
}

main();
