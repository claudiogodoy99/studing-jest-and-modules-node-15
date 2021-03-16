export default class FluentSQLBuilder {
    #data = [] //membro privado
    constructor({data}){
        this.#data = data
    }

    static for(database){
        return new FluentSQLBuilder({database});
    }


    build(){
        const results = []

        return results
    }
}