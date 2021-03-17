export default class FluentSQLBuilder {
    #data = [] //membro privado
    #limit = 0
    #select = []
    #where = []
    #orderBy = ''
    
    constructor({database}){
        this.#data = database
    }

    static for(database){
        return new FluentSQLBuilder({database});
    }
    limit(max){
        this.#limit = max

        return this
    }

    select(props){
        this.#select = props
        return this
    }

    where(query){
      
        const [[prop,selectValue]] = Object.entries(query)

        const whereFilter = selectValue instanceof RegExp ? selectValue : new RegExp(selectValue)  

        
        this.#where.push({prop, filter: whereFilter})

        return this
    }

    orderBy(field){
        this.#orderBy = field

        return this
    }


    #performLimit(results){
        return this.#limit && results.length == this.#limit
    }

    #performWhere(item){
        for(const {filter,prop} of this.#where){
            if(!filter.test(item[prop])) return false;
        }

        return true
    }

    #performSelect(item){
        if(!this.#select.length) return item

        const currentItem = {}
        const entries = Object.entries(item)

        for(const [key,value] of entries){
            if(!this.#select.includes(key)) continue

            currentItem[key] = value
        }

        return currentItem
    }


    #performOrderBy(results){
        if(!this.#orderBy) return results

        return results.sort((prev,next) => {
            return String(prev[this.#orderBy]).localeCompare(String(next[this.#orderBy]))
        })
    }

    build(){
        const results = []
        
        for(const item of this.#data){
            if(!this.#performWhere(item)) continue

            const currentItem = this.#performSelect(item)

            results.push(currentItem)

            if(this.#performLimit(results)) break;
        }

        return  this.#performOrderBy(results)
    }

    


}