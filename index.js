function fromDynamoDb(dynamoItem) {
	function basic(data) {
		let jValue;
		for (const type in data) {
			if (typeof type !== 'string') continue;
			const value = data[type];
			switch (type.toUpperCase()) {
				case 'S':
					jValue = '' + value;
					break;
				case 'N':
					jValue = +value;
					break;
				case 'L':
					jValue = value.map(basic);
					break;
				case 'M':
					const map = {};
					for (const i in value)
						map[i] = basic(value[i]);
					jValue = map;
					break;
				case 'BOOL':
					jValue = value;
					break;
				default:
					console.log("not supported");
					jValue = JSON.stringify(value[type]);
					break;
			}
		}
		return jValue;
	}

	const plainObj = {};
	for (const key in dynamoItem) {
		const value = dynamoItem[key];
		plainObj[key] = basic(value);
	}
	return plainObj;
}

module.exports = fromDynamoDb;