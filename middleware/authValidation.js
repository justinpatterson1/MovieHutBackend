const Joi = require('joi');

const validation = ()=>{

    const schema = Joi.object({
        email:Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        
        password:Joi.string()
        .alphanum()
        .min(8)
    })
}

exports.module = validation;