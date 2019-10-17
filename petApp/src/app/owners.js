class Owner
{
	constructor(name)
	{
		this._name = name;
		this._owners = [];
	}
	set id(x)
	{
		this._id = x;
	}
	set name(name)
	{
		this._name = name;
	}
	set houseHold(house)
	{
		this._household = house;
	}
	get name()
	{
		return this._name;
	}
	get id()
	{
		return this._id;
	}
	get houseHold()
	{
		return this._household;
	}
	addOwner(name)
	{
		this._owners.push(name);
	}
	deleteOwner(name)
	{
		for(let i =0; i < _owners.length; i++)
		{
			//if the owner is found, delete it from the array of other owners
		}
	}
	removeFromHouse()
	{
		this._household = " ";//setting the household to a empty string
	}


}

module.exports = Owner; //exporting the owner class