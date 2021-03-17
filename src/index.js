import data from '../database/data.json'
import FluentSQLBuilder from '../src/fluetSQL.js'


const result = FluentSQLBuilder.for(data)
    .where({
        registered: /^(2020|2019)/
    })
    .where({
        category: /^(security|developer)/
    })
    .build()

console.table(result)