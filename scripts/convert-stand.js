const { createWriteStream, readFileSync } = require('fs')
const prefix = readFileSync('./scripts/stand-prefix.d.ts', 'utf-8')
const output = createWriteStream('./stand.d.ts')
const cheerio = require('cheerio');
const html = readFileSync('./scripts/lua-api-docs.xml', 'utf-8')

// console.log(html)
const namespaces = {}
const $ = cheerio.load(html, null, false)
$('div .content-wrapper div div')
    .contents().filter('h5')
    .each(function() {
        const namespace = $(this).contents().eq(1).text().slice(1, -1)
        const params = []
        const rawParams = $(this).find('i').contents().slice()
        const fname = $(this).find('span.text-primary').text()
        // console.log(rawParams)
        for(let i = 1; i < rawParams.length; i+= 2) {
            const type = rawParams.eq(i).text()
            const name = rawParams.eq(i + 1).text()
            params.push({
                name,
                type
            })
        }
        const comments =  $(this).next('p').text()
        const func = {
            returnType: $(this).find('i.text-success').first().text(),
            name: $(this).find('span.text-primary').text(),
            comments,
            params
        }
        if(!func.name || !func.returnType) return
        if(!namespaces[namespace]) namespaces[namespace] = []
        namespaces[namespace].push(func)
    })
    .toArray()

output.write(prefix + "\n\n")

const functionOverloads = {
    new: "NewV3",
    colour: "ColourMenu",
    send_sms: "SendSMS",
    draw_texture: "DrawTexture",
    draw_line: "DrawLine"
}
let hasOverload = {}

for(const [namespace, funcs] of Object.entries(namespaces)) {
    output.write(`/** @noSelf **/\n`)
    output.write(`declare let ${namespace}: {\n`)
    let skipFunction = false
    for(const func of funcs) {
        
        if(func.comments)
            output.write(`\t/** ${func.comments} **/\n`)
        const types = _convert_type(func.returnType.trim())
        if(func.name === "delete")
            func.name = '_delete'
        for(const [overloadName, overloadType] of Object.entries(functionOverloads)) {
            if(func.name === overloadName) {
                skipFunction = true
                if(hasOverload[func.name]) {
                    break
                }
                output.write(`\t${overloadName}: ${overloadType}\n`)
                hasOverload[func.name] = true
            }
        }
        if(skipFunction) {
            skipFunction = false
            continue
        }
        output.write(`\t${func.name}: (${_generate_params(func.params)}) => ${types}\n`)
        // output.write(`\tfunction ${func.name}(${_generate_params(func.params)}): ${types}\n`)
    }
    output.write(`}\n\n`)
}

function _generate_params(params) {
    const output = [`this: void`]
    let hasOptional = false
    for(const param of params) {
        if(param.type === "...") return `...arguments: any`
        if(param.name === "...") return "...arguments: any"
        if(param.name === "new") param.name = 'newValue'
        if(param.name === "default") param.name = 'defaultValue'
        const isOptional = hasOptional || param.type.startsWith("?")
        if(param.type.startsWith("?")) {
            hasOptional = true
            param.type = param.type.substring(1)
        }
        const types = _convert_type(param.type.trim())
        output.push(`${param.name}${isOptional?'?':''}: ${types}`)
    }
    return output.join(", ")
}

function _convert_type(type) {
    if(type.startsWith("table")) {
        const match = type.match(/<(\w+),\s?(\w+)>/)
        if(!match) {
            throw new Error("Invalid table: " + type)
        } 
        if(match[2] === "table") {
            match[2] = "any"
        }
        if(match[1] == "int" || (match[1] == "any" && match[2] == "string")) return `${match[2]}[]`
        return `LuaTable<${match[1]}, ${match[2]}>`
    }
    let types = type.split("|")
    if(types.length > 1) {
        return types.map(type => _convert_type(type)).join(" | ")
    }
    types = type.split(",")
    if(types.length > 1) {
        return `LuaMultiReturn<[${types.map(type => _convert_type(type)).join(", ")}]>`
    }
    switch(type.trim()) {
        case "function": return "Function"
        case "bool": return "boolean"
        case "userdata": return "any"
        case "lightuserdata": return "any"
        case "CommandRef":
        case "int":
        case "string":
        case "Label":
        case "CommandRef":
        case "Colour":
        case "number":
        case "void":
        case "CommandUniqPtr":
        case "Vector3":
        case "float":
            return type
        default:
            throw new Error("Unknown type: '" + type + "'")
    }
}