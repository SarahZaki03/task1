const addForm = document.querySelector('#addForm');
customerHeads = ['name', 'address', 'accNum', 'balance']

let users = []
let mainWrap = document.querySelector('#userDataWrap')
addForm.addEventListener('submit', function(e){
	let user = {}
	e.preventDefault();
	customerHeads.forEach(cHead => {
		user[cHead] = this.elements[cHead].value
	});
	
	console.log(user);
	users.push(user);
	// ---- 1 
	doIt()
	// ---- 2
	console.log(users);
})

function deleteUser(user,index){
	users.splice(index,1);
	console.log(users);
	
	// ---- 1 
	doIt()
	// ---- 2
}

function doIt(){
	mainWrap.innerHTML = '';
	users.forEach((user, index) => {
		let mainCard = createNewElement('div', '', 'col-4 mb-4',mainWrap,[]);
		let card = createNewElement('div', '', 'border shadow m-4 p-4', mainCard ,[]);
		createNewElement('h1', user.name, '', card ,[]);
		createNewElement('address', user.address, '', card ,[]);
		createNewElement('p', 'Acc Number: '+user.accNum+', Balance: '+user.balance, '', card ,[]);
		btndel = createNewElement('button', 'delete', 'btn btn-warning', card, [])
		btndel.addEventListener('click',function(e) {deleteUser(user,index)})
	})
}

let createNewElement = (elementTag, elementTxt, elementClasses,parent ,attributes) =>{
	myNewEl = document.createElement(elementTag)
	if(elementTxt!='') myNewEl.innerText = elementTxt
	if(elementClasses!="") myNewEl.className =elementClasses
	if(attributes.length > 0)
		attributes.forEach(attr => {
			myNewEl.setAttribute(attr.name, attr.value)
		}); 
	parent.appendChild(myNewEl)  
	return myNewEl  
}


















