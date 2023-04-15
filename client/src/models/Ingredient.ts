interface IngredientInt {
    id:String
    name:String
}

class Ingredient implements IngredientInt {

    id: String;
    private _name: String;

    constructor(id:String,name:String) {
        this.id = id
        this._name = name
    }
    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }
}

export default Ingredient