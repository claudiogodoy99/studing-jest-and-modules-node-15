import {expect,describe,test} from '@jest/globals'
import FluentSQLBuilder from '../src/fluetSQL'

const data = [{
    id: 2,
    name: 'erickwendel',
    category: 'developer'
},{
    id: 0,
    name: 'jaozin',
    category: 'developer'
},{
    id: 1,
    name: 'mariazinha',
    category: 'manager'
}]

describe('Teste Suit for FluentSQL Builder', () => {
    test('#for should return a FluentSQLBuilder instance', () => {
        const result = FluentSQLBuilder.for(data)
        const expected = new FluentSQLBuilder({database: data})

        expect(result).toStrictEqual(expected) 
    })
    test('#build should return the empty object instance', () => {
        const result = FluentSQLBuilder.for(data).build()
        const expected = data

        expect(result).toStrictEqual(expected)
    })

    test('#limit given a collection it should limit results',() => {
        const result = FluentSQLBuilder.for(data).limit(1).build();
        const expected = [data[0]]

        expect(result).toStrictEqual(expected)
    })

    test('#where given a collection it should filter data', () => {
        const result = FluentSQLBuilder.for(data).where({
            category: /^dev/
        }).build();

        const expected = data.filter(({category}) => category.slice(0,3).toString() === 'dev')
    
        expect(result).toStrictEqual(expected)
    })

    test('#select given a collection it shold return only specific fields', () => {
        const result = FluentSQLBuilder.for(data).select([
            'id'
        ]).build();
        const expected = data.map(({id}) =>  {return {id}} )
        expect(result).toStrictEqual(expected)
    })

    test('#orderBy given a collection it should ordenade by specifc field',() => {
        const result = FluentSQLBuilder.for(data).orderBy('name').build();

        const expected = data.sort((prev,next) => {
            return prev['name'].localeCompare(next['name'])})

        expect(result).toStrictEqual(expected)
    })

    test('pipeline', () => {
        const result = FluentSQLBuilder.for(data).where({
            category: 'developer'
        })
        .select(['id'])
        .orderBy('id')
        .build();


        const expected = [{
            id: 0
        },{
            id: 2
        }]

        expect(result).toStrictEqual(expected)
    })
})

