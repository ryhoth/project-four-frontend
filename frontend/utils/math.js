
module.exports = {
	objOrg : function (obj) {
	var placeHolderObject = {
		expenseName : [],
		amount : []
	};
	for (var prop in obj){
		placeHolderObject["expenseName"].push(prop);
		placeHolderObject["amount"].push(obj[prop]);
	}
	// console.log(placeHolderObject)
	return placeHolderObject;
	},


	// this.objOrg(budget[0]["consultants"])
	employeeInputOrganize : function (arr) {
	// creates a place holder object
	var placeHolderObject = {};
	// fills that object with arrays from one sample form
		for (var prop in arr[0]){
			placeHolderObject[prop] = [];
		}
	// pushes those arrays with values
		for (var i=0; i<arr.length; i++){
			for (var propi in arr[i]) {
				placeHolderObject[propi].push(arr[i][propi]);
			}
		}
			return placeHolderObject;
	},

	sumRow : function (obj, key) {
		var sum = 0;
		if (typeof obj[key][0] === "number") {
			for (var i = 0; i < obj[key].length ; i++){
				sum += obj[key][i];
			}
		} else {
				console.log("please enter a number data array");
		}
		return sum;
	},

	sumColumn : function (obj, idx) {
		var sum = 0;
			for (var prop in obj){
				if (typeof obj[prop][idx] === "number") {
					sum += obj[prop][idx];
				}
			}
		return sum;
	},

	makeColumnArray : function(obj, idx){
		var columnArray = [];
		for (var prop in obj){
			columnArray.push(obj[prop][idx]);
		}
		return columnArray;
	},

	sumArray : function (arr){
		var sum = 0;
		for(var i=0; i < arr.length ; i++){
			sum += arr[i];
		}
		return sum;
	},

	addsSumToEndArray : function (arr) {
		var theSum = this.sumArray(arr);
		var placeHolderArr = arr;
		placeHolderArr.push(theSum);
		return placeHolderArr;
	},

	monthsGenerator : function (){
		var arr = [];
		for(var i = 0; i <= 12; i++){
			arr.push("Month "+i);
		}
		return arr;
	},

	// spreadElements : function(RowArrayToPush, objectWithMembers, memberProp, key){
	// 	for(var i = 0; i < objectWithMembers[memberProp].length; i++){
	// 		var onerow =[];
	// 		for(var j = 0; j < 12; j++){
	// 			onerow.push(objectWithMembers[key][i]);
	// 		}
	// 		var completeRow = this.addsSumToEndArray(onerow);
	// 		onerow.unshift(objectWithMembers[memberProp][i]);
	// 		RowArrayToPush.push(onerow);
	// 	}
	// },
	spreadElements : function(RowArrayToPush, objectWithMembers, memberProp, key){
		for(var i = 0; i < objectWithMembers[memberProp].length; i++){
			var onerow =[];
			for(var j = 0; j < 12; j++){
				onerow.push(objectWithMembers[key][i]);
			}
			var completeRow = this.addsSumToEndArray(onerow);
			onerow.unshift(objectWithMembers[memberProp][i]);
			RowArrayToPush.push(onerow);
		}
	},

	sumMonthlies : function(RowArrayToPush, objectWithMembers, memberProp, key){
			var onerow =[];
			for(var j = 0; j < 12; j++){
				onerow.push(this.sumRow(objectWithMembers, key));
			}
			var completeRow = this.addsSumToEndArray(onerow);
			onerow.unshift("Salary");
			RowArrayToPush.push(onerow);
			return onerow;
	},

	arrOp : function (arr1, arr2, operator){
		var arrayPlaceholder = [];
		switch(operator){
			case "add":
				for(var i=0; i < arr1.length; i++){
					if (typeof arr1[i] === "number" ){
						arrayPlaceholder.push(arr1[i] + arr2[i]);
					}
				}
				return arrayPlaceholder;
			case "sbutract":
				for(var j=0; j < arr1.length; j++){
					if (typeof arr1[j] === "number" ){
						arrayPlaceholder.push(arr1[j] - arr2[j]);
					}
				}
				return arrayPlaceholder;
			case "multiply":
				for(var k=0; k < arr1.length; k++){
					if (typeof arr1[k] === "number" ){
						arrayPlaceholder.push(arr1[k] * arr2[k]);
					}
				}
				return arrayPlaceholder;
			case "divide":
				for(var h = 0 ; h < arr1.length; h++){
					if (typeof arr1[h] === "number" ){
						arrayPlaceholder.push(arr1[h] * arr2[h]);
					}
				}
				return arrayPlaceholder;
		}
	},

	arrOpSingle : function (arr1, singleNum, operator){
		var arrayPlaceholder = [];
		switch(operator){
			case "add":
				for(var i=0; i < arr1.length; i++){
					if (typeof arr1[i] === "number" ){
						arrayPlaceholder.push(arr1[i] + singleNum);
					}
				}
				return arrayPlaceholder;
			case "sbutract":
				for(var j=0; j < arr1.length; j++){
					if (typeof arr1[j] === "number" ){
						arrayPlaceholder.push(arr1[j] - singleNum);
					}
				}
				return arrayPlaceholder;
			case "multiply":
				for(var k=0; k < arr1.length; k++){
					if (typeof arr1[k] === "number" ){
						arrayPlaceholder.push(arr1[k] * singleNum);
					}
				}
				return arrayPlaceholder;
			case "divide":
				for(var h = 0 ; h < arr1.length; h++){
					if (typeof arr1[h] === "number" ){
						arrayPlaceholder.push(arr1[h] * singleNum);
					}
				}
				return arrayPlaceholder;
		}
	},

	headCountTable : function (objRaw) {
		var renda =[];
		var obj = this.employeeInputOrganize(objRaw);
		// console.log("this is the object after it was parsed in headcount tab fxn", obj)
		this.spreadElements(renda, obj, "employeePosition", "employeeSalary");
		// console.log("this is renda in headcount fxn after spreadElements", renda);
		var monthlies = this.sumMonthlies(renda, obj, "employeePosition", "employeeSalary");
		var bonusPerc = 0.05;
		var bonuses = this.arrOpSingle(monthlies, bonusPerc, "multiply");
		bonuses.unshift("Bonus");
		renda.push(bonuses);
		var totalMontliesPlusBonuses = this.arrOp(monthlies, bonuses, "add");
		renda.push(totalMontliesPlusBonuses);
		var tax = 0.11;
		var taxesAndBenefits = this.arrOpSingle(totalMontliesPlusBonuses, tax, "multiply");
		totalMontliesPlusBonuses.unshift("Salary and Bonus");
		taxesAndBenefits.unshift("Taxes and Benefits");
		renda.push(taxesAndBenefits);
		var totalMontliesPlusBonusesPlusTaxes = this.arrOp(totalMontliesPlusBonuses, taxesAndBenefits, "add");
		totalMontliesPlusBonusesPlusTaxes.unshift("Grand Total")
		renda.push(totalMontliesPlusBonusesPlusTaxes);
		// renda = this.table(renda, "Employees")
		console.log("RENDAAAA", renda);
		// console.log("randa in headcouttable fxn:",renda);
		return renda;

	},

	budgetTable : function(objRaw, objRaw2, objRaw3){
		var renda = [];
		// consultants
		var obj = this.objOrg(objRaw)
		this.spreadElements(renda, obj, "expenseName", "amount");
		var monthlies = this.sumMonthlies(renda, obj, "expenseName", "amount");
		// ops
		if(objRaw2){
			var obj2 = this.objOrg(objRaw2)
			this.spreadElements(renda, obj2, "expenseName", "amount");
			var monthlies2 = this.sumMonthlies(renda, obj2, "expenseName", "amount");
			// whatever
			if(objRaw3){
				var obj3 = this.objOrg(objRaw3)
				this.spreadElements(renda, obj3, "expenseName", "amount");
				var monthlies3 = this.sumMonthlies(renda, obj3, "expenseName", "amount");
			}
		}
		return renda;
	},


	small : function(arr, legendLeft){
		var legend = [legendLeft,
								"Month 1",
								"Month 2",
								"Month 3",
								"Month 4",
								"Month 5",
								"Month 6",
								"Month 7",
								"Month 8",
								"Month 9",
								"Month 10",
								"Month 11",
								"Month 12",
								"Total"];

			// this is the arr that will hold all the objects
			var obj = {};
			for (var i=0; i< legend.length; i++){
				obj[legend[i]] = arr[i]
			}
			return obj;
		},

		table : function(AofA, param2){
						var arr = [];
						for(var i=0; i < AofA.length; i++){
							arr.push( this.small(AofA[i], param2) )
							}
							return arr;
						}

}//end of export



// var x = xlFactory.form2Table(arrayOfForms);
// var y = xlFactory.objOrg(budget[0]["consultants"])
// xlFactory.budgetTable(budget[0]["consultants"], budget[0]["operations"])
// xlFactory.headCountTable(arrayOfForms);


var arrayOfForms = [
	{name: "ryan",
	role:"killa",
	salary: 2000,
	bonus: 10,
	bonues_percentage: 0.05
	},
	{name: "travis",
	role: "thug",
	salary: 1000,
	bonus: 30,
	bonues_percentage: 0.05
	},
	{name: "pooja",
	role: "pimp",
	salary: 5000,
	bonus: 20,
	bonues_percentage: 0.05
	}
];
//
var budgetData = [
	{
		consultants:{
			finance:250,
			legal: 500,
			tech: 500,
		},
		operations:{

		},
		capex:{

		},
		marketing:{

		}
	}
	];


	var revData = {
		unitA:{
			name:"A",
			projections:[0,1,2,3,4,12]
		},
		eventB:{
			name:"B",
			projections:[1,1,2,3,4,4]
		},
		mediumC:{
			name: "C",
			projections:[]
		},
		probOfB:{
					name:"P(B)",
					projections:[1,1,2,3,4,4]
				},
		percOfC: {
					name:"P(C)",
					projections:[1,1,2,3,4,4]
				},
		dollarPerPofB:{
					name:"DollarPerP(C)",
					projections:[1,1,2,3,4,4]
		``		},
		dollarPerPofC:{
					name:"DollarPerP(C)",
					projections:[1,1,2,3,4,4]
		``		},
	}
