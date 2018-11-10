const dynamodbToJSON = require('./index');



const item = {
	strings : {"s" : "string"},
	number : {"n" : "11"},
};

console.log(JSON.stringify(dynamodbToJSON(item)));
