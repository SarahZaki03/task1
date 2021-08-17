// الحد الاقصي للسحب ٥٠٠٠ 
// الحد الاقصي للايداع ١٠٠٠٠ ==========
// لا يمكن سحب اعلى من الرصيد
// لكل عميل حاله مفعل او غير مفعل اذا كان غير مفعل لا يمكنه السحب او الايداع

const fs = require('fs')

class Bank {
	customerData = null;
	
	readData(){
        try{
            this.customerData = JSON.parse(fs.readFileSync('all.json').toString())
            // JSON.parse convert json to array of objects
            if(!Array.isArray(this.customerData)) throw new Error('')
        }
        catch(e){
            this.customerData=[]
        }
    }

    writeData() {
        fs.writeFileSync('all.json', JSON.stringify(this.customerData) )
        // JSON.stringify convert object to json string
    }
	
	addCustomer(data){
		let userData = {
            accountnumber: data.accountnumber, 
            name: data.name, 
            balance: data.balance, 
            status: false
        }
        this.readData(); // Why we read before adding 
        this.customerData.push(userData);
        this.writeData();
	}
	
    changeStatus(data){
        this.readData();
        let search = this.customerData.findIndex(num => num.accountnumber == data.accountnumber);
        if(search == -1){
            return console.log('Not available user')
        } else {
            this.readData();
            // Want to use find instead of forEach ------------
            this.customerData.forEach(cstmr =>  {
                if(cstmr.accountnumber == data.accountnumber) {
                    cstmr.status = data.status; 
                    this.writeData();
                    return
                } 
            })
        }
    }

    checkStatus(id){
        this.readData();
        
        let search = this.customerData.findIndex(num => num.accountnumber == id);
        if(search == -1){
            return console.log('Not available user')
        }
        // console.log(this.customerData[search].status);
        return this.customerData[search].status
    }

	// Add money ------------------------------------------------
    addAccount(data){
        // Get from user account number and change the
        // balance with the new balance => money + oldBalance

        if(!this.checkStatus(data.accountnumber)){
            return console.log('User Status is False, you can not create deposit for this account');
        }

        if(data.money < 0 || data.money == 0){
            return console.log('Money must be greater than 0');
        }

        this.readData();
        let search = this.customerData.findIndex(num => num.accountnumber == data.accountnumber);
        if(search == -1){
            return console.log('Not available user')
        } else if(data.money > 10000){
            return console.log('Maximum ammount for deposit = 10000')
        } else {
            this.readData();
            this.customerData.forEach(cstmr =>  {
                if(cstmr.accountnumber == data.accountnumber) {
                    let old = Number(cstmr.balance);
                    let add = Number(data.money)
                    cstmr.balance = old + add; 
                    this.writeData();
                    return
                } 
            })
        }
    }
	// -----------------------------------------------------------

    // Withdraw money --------------------------------------------
	withdrawMoney(data){
        // data.accountnumber data.money

        if(!this.checkStatus(data.accountnumber)){
            return console.log('User Status is False, You can not withdraw money from this account');
        }

        if(data.money < 0 || data.money == 0) {
            return console.log('Money must be greater than 0');
        }

        this.readData();
        let search = this.customerData.findIndex(num => num.accountnumber == data.accountnumber);
        if(search == -1){
            return console.log('Not available user')
        } else if(data.money > 5000){
            return console.log('Maximum ammount for withdraw = 5000')
        } else {
            this.readData();
            // Want to use find instead of forEach ------------
            this.customerData.forEach(cstmr =>  {
                if(cstmr.accountnumber == data.accountnumber) {
                    let old = Number(cstmr.balance);
                    let sub = Number(data.money)
                    cstmr.balance = old - sub; 
                    this.writeData();
                    return
                } 
            })
        }
    }
	// -----------------------------------------------------------

	deleteCustomer(data) {

        if(!this.checkStatus(data.accountnumber))
            return console.log('User Status is False, You can not delete this account');
            
        // data.accountnumber
        this.readData();
        let search = this.customerData.findIndex(num => num.accountnumber == data.accountnumber);
        if(search == -1){
            return console.log('Not available user')
        }
        this.customerData.splice(search,1)
        this.writeData()
    }
}

let bank = new Bank()
//bank.deleteCustomer(201)
module.exports = bank

