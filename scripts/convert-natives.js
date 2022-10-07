const NATIVES = require('./gta5-nativedb-data/natives.json')
const { createWriteStream } = require('fs')
const output = createWriteStream('./natives.d.ts')

output.write(`interface Vector3 {
    x: number,
    y: number,
    z: number
}\n`)
const TYPES = {
    float: "number",
    int: "number",
    Address: "number",
    Hash: "number",
    EntityHandle: "number",
    FloatPointer: "Address",
    IntPointer: "Address",
    BoolPointer: "Address",
    CamHandle: "number",
    Player: "EntityHandle",
    Vector3Pointer: "Address",
    ScriptHandle: "number",
    ScriptHandlePointer: "number",
    Blip: "number",
    Pickup: "number",
    Interior: "number"
}
for(const [key, value] of Object.entries(TYPES)) {
    output.write(`type ${key} = ${value}\n`)
}

for(const [namespace, natives] of Object.entries(NATIVES)) {
    output.write(`/** @noSelf **/\n`)
    output.write(`declare namespace ${namespace} {\n`)
    for(const [nativeHex, native] of Object.entries(natives)) {
        const comment = native.comment
            .replace(/\n/gm, '\n\t')
            .replace(/\/\*/g, '/ *')
            .replace(/\*\//g, '* /')
        output.write(`\t/** ${comment} **/\n`)
        output.write(`\tfunction ${native.name}(${_generate_params(native.params)}): ${_convert_type(native.return_type)}\n`)
    }

    output.write(`}\n\n`)
}

function _generate_params(params) {
    const output = [`this: void`]
    for(const param of params) {
        if(param.name == "var") param.name = 'variable'
        output.push(`${param.name}: ${_convert_type(param.type)}`)
    }
    return output.join(", ")
}

function _convert_type(type) {
    type = type.replace(/const /, '')
    if(type == "char*") return 'string'
    else if(type == "int") return 'int'
    else if(type == "float") return 'float'
    else if(type == "Any*") return "Address"
    else if(type == "Hash") return "Hash"
    else if(type == "void") return "void"
    else if(type == "BOOL") return "boolean"
    else if(type == "Ped") return "EntityHandle"
    else if(type == "Vehicle") return "EntityHandle"
    else if(type == "Object") return "EntityHandle"
    else if(type == "Entity") return "EntityHandle"
    else if(type == "float*") return "FloatPointer"
    else if(type == "int*") return "IntPointer"
    else if(type == "BOOL*") return "BoolPointer"
    else if(type == "Any") return "any"
    else if(type == "Cam") return "CamHandle"
    else if(type == "Vector3") return "Vector3"
    else if(type == "Player") return "Player"
    else if(type == "Vector3*") return "Vector3Pointer"
    else if(type == "ScrHandle*") return "ScriptHandlePointer"
    else if(type == "ScrHandle") return "ScriptHandle"
    else if(type.endsWith("*")) return "Address"
    else if(type == "FireId") return "number"
    else if(type == "Blip") return "Blip"
    else if(type == "Pickup") return "Pickup"
    else if(type == "Interior") return "Interior"
    else {
        throw Error(`Unknown type: ${type}`)
    }
}