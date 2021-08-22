const express=require('express')
const router = express.Router()
const userController  = require('../src/controller/user.controller')


// Show all -------------------------------------------
router.get("",(req,res)=>{
    res.redirect('/showAll')
})
// ----------------------------------------------------


// Add Customer Get and Post tasks --------------------
router.get('/add', (req,res)=>{
    res.render('add', {title: "add new customer"})
})

router.post('/add', (req,res)=>{
    console.log(req.body)
    let userData = {
        accountnumber: new Date().getTime(), 
        name: req.body.name, 
        balance: req.body.balance
    }

    // Search if account number is used -----


    userController.addCustomer(userData)
    res.redirect('/showAll')
})
// -----------------------------------------------------


// Show all users --------------------------------------
router.get('/showAll', (req,res)=>{
    allusers = userController.showAllUsers()
    res.render('all', {
        title:"all Data",
        allusers,
        isEmpty: allusers.length? false:true
    })
})
// ------------------------------------------------------


// Delete Customer --------------------------------------
router.get('/delete/:id', (req,res) => {
    userController.deleteCustomer(req.params.id)
    res.redirect('/showAll')
})
// ------------------------------------------------------


// Change Status ----------------------------------------
router.get('/changestatus/:id', (req,res) => {
    userController.changeStatus(req.params.id)
    res.redirect('/showAll')
})
// ------------------------------------------------------


// Withdraw || Deposit ----------------------------------
router.get('/withdep/:type/:id', (req,res) => {
    const id = req.params.id
    if(req.params.type == 1)
        res.render('withdep', {title: "Withdraw", id, type:1}) // type 1 withdraw - 2 deposit
    else res.render('withdep',{title:"Deposit", id, type:2})
})

router.post('/withdep/:type/:id', (req,res) => {
    const data = req.body
    console.log(req.body)
    const id = req.params.id
    let message;
    if(req.body.type == 1){
        message = userController.withdrawMoney(data)
        console.log(message)
        if(message == true) res.redirect('/showAll')
        res.render('withdep', {title: "Withdraw", id, type:1, status:true, message})
    }else{
        message = userController.addAccount(data)
        
        if(message == true) res.redirect('/showAll')
        res.render('withdep', {title: "Deposit", id, type:2, status:true, message})
    }
      
})
// ------------------------------------------------------

// Edit customer data -----------------------------------
router.get('/edit/:id', (req,res)=>{
    userdata = userController.searchUser(req.params.id)
    // console.log(userdata)
    res.render('edit', {title:"edit", user:userdata})
})
router.post('/edit/:id', (req,res)=>{
    user = req.body
    userController.editUser(req.params.id, req.body)
    res.redirect('/showAll')
})
// ------------------------------------------------------

module.exports = router