interface RecipeImageInt {
    id:String
    fileName:String
}

class RecipeImage implements RecipeImageInt {
    public fileName: String;
    public id: String;
    constructor(id:String,fileName:String) {
        this.id = id;
        this.fileName = fileName;

    }

    public getS3Link(): String{
        return `https://meal-mingle.s3.amazonaws.com/`
    }


}
export default RecipeImage;