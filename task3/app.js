// اضافه عميل
// ايداع رصيد
// سحب رصيد
// مسح عميل
// لكل عميل رقم حساب و اسم و مبلغ رصيد و حاله


const yargs = require('yargs')
const functions = require('./functions')

// Add Customer ------------------------
yargs.command({
    command:"addCustomer",
    describe:"Add new customer",
    builder:{
        accountnumber:{demandOption:true, type:"number"},
        name:{ demandOption:true, type:"string"},
        balance:{demandOption:true, type:"string"}
        // status:{demandOption:true, type:"boolean"}
    },
    handler:function(argv){ functions.addCustomer(argv)}
})

// Change Customer Status ------------------------
yargs.command({
    command:"changeCustomerStatus",
    describe:"change customer status",
    builder:{
        accountnumber:{demandOption:true, type:"number"},
        status:{demandOption:true, type:"boolean"}
    },
    handler:function(argv){ functions.changeStatus(argv)}
})

// Deposit --------------------------------
yargs.command({
    command:"addAccount",
    describe:"Add money",
    builder:{
        accountnumber:{demandOption:true, type:"number"},
        money:{demandOption:true, type:"number"}
    },
    handler:function(argv){ functions.addAccount(argv)}
})

// Withdraw Money ------------------------
yargs.command({
    command:"withdrawMoney",
    describe:"Withdraw money",
    builder:{
        accountnumber:{demandOption:true, type:"number"},
        money:{demandOption:true, type:"number"}
    },
    handler:function(argv){ functions.withdrawMoney(argv)}
})

// Delete Customer ------------------------
yargs.command({
    command:"deleteCustomer",
    describe:"Delete customer",
    builder:{
        accountnumber:{demandOption:true, type:"number"}
    },
    handler:function(argv){ functions.deleteCustomer(argv)}
})

yargs.argv