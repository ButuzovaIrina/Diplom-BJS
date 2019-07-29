
class Profile {
    constructor({ username, name, password }) {
        this.username = username;
        this.name = name;
        this.password = password;
    }

    newUserAdd(callback) {
        ApiConnector.createUser(this.username, this.name, this.password,  (err, data) => {
            console.log(`Adding ${this.username}`);
            callback(err, data);
        });
    } 

    authorization(callback) {
        ApiConnector.performLogin(this.username, this.password,  (err, data) => {
            console.log(`Wrong ${this.username}`);
            callback(err, data);
        });
        console.log(this.username);
    }

    moneyAddToWallet({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
  
    }
    /*
    currencyConversion({ fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount}, (err, data) => {
            console.log(`Convert ${targetAmount} from ${fromCurrency} to ${targetCurrency}`);
            callback(err, data);
        });
    
    }
     
    tokenTo({ usernameResiver, resiverSum}, callback) {
        return ApiConnector.transferMoney({usernameResiver, resiverSum}, (err, data) => {
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
    Petr.newUserAdd();
 // Petr.authorization();
 
}


/*
function main(){
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });
    // сначала создаем и авторизуем пользователя

    // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    
    Petr.moneyAddToWallet({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Petr');
        } else {
                console.log(`Added 500000 euros to Petr`);
        }});
  console.log('ok');

*/