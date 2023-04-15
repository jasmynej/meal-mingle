interface CategoryInt {
    id:String
    name:String
}

class Category implements CategoryInt{
    id: String;
    name: String;

    constructor(id:String,name:String) {
        this.id = id;
        this.name = name;
    }

}

export default Category;