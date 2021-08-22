const fs = require('fs')
let customerData = []

const readJsonFile = ()=>{
    try{
        customerData = JSON.parse(fs.readFileSync('src/model/data.json').toString())
        if(!Array.isArray(customerData)) throw new Error()
    }
    catch(e){ 
        customerData = [] 
        console.log(customerData)
    }
}
const saveJsonFile = () =>{
    fs.writeFileSync('src/model/data.json', JSON.stringify(customerData))
}

class Bank { 

	addCustomer(data){
		let userData = {
            accountnumber: data.accountnumber, 
            name: data.name, 
            balance: data.balance, 
            status: false
        }
        readJsonFile(); // Why we read before adding 
        customerData.push(userData);
        saveJsonFile();
	}
	
    searchUser(userId){
        readJsonFile()
        let index = customerData.findIndex(user=> user.accountnumber == userId)
        return customerData[index]
    }

    editUser(userId, newData) {
        readJsonFile()
        let index = customerData.findIndex(user => user.accountnumber == userId)
        newData.status = customerData[index].status
        newData.accountnumber = customerData[index].accountnumber
        customerData[index] = newData      
        saveJsonFile()
    }

    showAllUsers(){
        readJsonFile();
        return customerData;
    }

    changeStatus(id){
        readJsonFile();
        let search = customerData.findIndex(num => num.accountnumber == id);
        if(search == -1){
            return console.log('Not available user')
        } else {
            readJsonFile();
            // Want to use find instead of forEach ------------
            customerData.forEach(cstmr =>  {
                if(cstmr.accountnumber == id) {
                    cstmr.status = !cstmr.status; 
                    saveJsonFile();
                    return
                } 
            })
        }
    }

    checkStatus(id){
        readJsonFile();
        
        let search = customerData.findIndex(num => num.accountnumber == id);
        if(search == -1){
            return console.log('Not available user')
        }
        return customerData[search].status
    }

	// Add money ------------------------------------------------
    addAccount(data){
        // Get from user account number and change the
        // balance with the new balance => money + oldBalance

        if(data.money < 0 || data.money == 0){
            return 'Money must be greater than 0' 
        }

        readJsonFile();
        let search = customerData.findIndex(num => num.accountnumber == data.accountnumber);
        if(search == -1){
            return 'Not available user' 
        } else if(data.money > 10000){
            return 'Maximum amount for deposit = 10000' 
        } else {
            customerData[search].balance = Number(customerData[search].balance)+Number(data.money)
            saveJsonFile()
            return true
        }
    }
	// -----------------------------------------------------------

    // Withdraw money --------------------------------------------
	withdrawMoney(data){
        // data.accountnumber data.money
        if(data.money < 0 || data.money == 0 ) {
            return 'Money must be greater than 0' ;
        }
        readJsonFile();
        let search = customerData.findIndex(num => num.accountnumber == data.accountnumber);
        console.log(search)
        if(search == -1){
            return 'Not available user' 
        } else if(data.money > 5000){
            return 'Maximum amount for withdraw = 5000'
        } else {
            if(Number(customerData[search].balance) < Number(data.money)) return 'Error'
            customerData[search].balance = Number(customerData[search].balance)-Number(data.money)
            saveJsonFile()
            return true
        }
    }
	// -----------------------------------------------------------

	deleteCustomer(id) {

        if(!this.checkStatus(id))
            return console.log('User Status is False, You can not delete this account');
            
        // data.accountnumber
        readJsonFile();
        let search = customerData.findIndex(num => num.accountnumber == id);
        if(search == -1){
            return console.log('Not available user')
        }
        customerData.splice(search,1)
        saveJsonFile();
    }
}

let bank = new Bank()
//bank.deleteCustomer(201)
module.exports = bank