const db = require('./connection');
const Joi = require('joi'); //schema validation, url validation, name validation

const urls = db.get('urls'); //urls is the collection inside the database 

/*

{
    Target: 'http://example.com,
    name: 'anyhting'
}
*/
const schema = Joi.object().keys({
    name: Joi.string().token().min(1).max(100).required(),
    url: Joi.string().uri({
        scheme : [
            /https?/
        ]
    }),
    
}).with('name', 'url');


function find(name){
    return urls.findOne({
        name: name
     });

}





async function create(Target){
    const result = Joi.validate(Target,schema);

    if ((result.error) === null){
        const url = await urls.findOne({
            name: Target.name
         });
         if (!url){
            return urls.insert(Target);
         }
         else{
             return Promise.reject({
                isJoi:true,
                details: [{
                    message: `${Target.name} Already in Use.`
                }]
             });
         }
        

    }
    else{
        return Promise.reject(result.error);
    }


}

module.exports = {create,find};