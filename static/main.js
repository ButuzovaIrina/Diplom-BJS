
class Profile {
  constructor({ username, name, password }) {
    this.username = username;
    this.name = name;
    this.password = password;
  }

  newUserAdd(callback) {        
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
    
  currencyConversion({ fromCurrency, targetCurrency, targetAmount }, callback) {
    return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
      console.log(`Convert ${targetAmount} from ${fromCurrency} to ${targetCurrency}`);
      callback(err, data);
    });
    
  }
    
  tokenTo({ to, amount }, callback) {
    return ApiConnector.transferMoney({ to, amount }, (err, data) => {
      console.log(`Transfer ${amount} from ${this.username} to ${to}`);
      callback(err, data);
    });
  }
}

function receivingExchangeRates(callback) {
  return ApiConnector.getStocks((err, data) => {
    console.log(`Convertation...`);
    callback(err, data);
  });   
}

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


  Petr.newUserAdd((err, data) => {
    if (err) {
      console.error(`Error during creating user ${this.username}.`);
    } else {
      console.log(`Petr is created.`);

        Petr.authorization((err, data) => {
          if (err) {
            console.error(`Error authorization of ${this.username}.`);
          } else {
            console.log(`Petr is authorized.`);

            Petr.moneyAddToWallet({ currency: 'RUB', amount: 10000 }, (err, data) => {
              if (err) {
                console.error('Error during adding money to Petr');
              } else {
                console.log(`Added 10000 RUB to Petr.`);
     
              receivingExchangeRates((err, data) => {
                if (err) {
                  console.error('Error during convertation');
                } else {
                  console.log('Convertation is ok');
                  currencyRate = data;
                  for (let i = (currencyRate.length-1); i >= 0; i--) {
                    if ('RUB_NETCOIN' in currencyRate[i]) {
                      valueExchange = currencyRate[i].RUB_NETCOIN;
                      break;
                    }
                  }

                Petr.currencyConversion({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: (10000 * valueExchange) }, (err, data) => {
                  if (err) {
                    console.error('Error during convertation');
                  } else {
                    console.log(` 10000 RUB converted to netcoin.`); 
                    
                    Mari.newUserAdd((err, data) => {
                      if (err) {
                        console.error(`Error during creating user ${this.username}.`);
                      } else {
                        console.log(`Mari is created.`);
                    
                    Petr.tokenTo({ to: 'Mari', amount: 10}, (err, data) => {
                      if (err) {
                        console.error('Error during send money to Mari');
                      } else {
                        console.log(`Mari has got 10 NETCOINS.`); 
                      }});    
                  }});    
              }});
            }});                   
        }});
     }});        
  }});   
}
let currencyRate, valueExchange;
 
main();