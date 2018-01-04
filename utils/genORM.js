const fs = require('fs')
const promisify = require('util').promisify
const {join} = require('path')

// const {modelNames} = require('./modelNames')
const modelNames = ['user']

const getCommonJS = (modelName) => {
  return 'const dbUrl = `http://${process.env.SERVER_IP}:8080/r/persistent-layer/models`\n' +
    'const modelName = \'' + modelName + '\'\n' +
    '\n' +
    'function baseErrorLog (opName) {\n' +
    '  return (message) => console.log(JSON.stringify({error: modelName + `/${opName}: ` + message}))\n' +
    '}\n' +
    '\n' +
    'module.exports = {\n' +
    '  dbUrl,\n' +
    '  modelName,\n' +
    '  baseErrorLog,\n' +
    '}'
}

const getYAML = () => {
  return 'version: 0.0.1\n' +
    'runtime: node\n' +
    'entrypoint: node bundle.js\n' +
    'headers:\n' +
    '  content-type:\n' +
    '  - application/json'
}

const getCodeHead = (op) => {
  return 'const fs = require(\'fs\')\n' +
    'const fetch = require(\'node-fetch\')\n' +
    '\n' +
    'const {dbUrl, modelName, baseErrorLog} = require(\'../common\')\n' +
    'const errorRes = baseErrorLog(\'' + op + '\')\n' +
    '\n' +
    ';(async () => {\n' +
    '  try {\n' +
    '    const input = fs.readFileSync(\'/dev/stdin\').toString()' +
    '\n'
}

const getCodeTail = () => {
  return '    console.log(JSON.stringify(result))\n' +
    '\n' +
    '  } catch (e) {\n' +
    '    return errorRes(e.message)\n' +
    '  }\n' +
    '})()'
}

const template = {
  count: () => {
    return '    let constraint = {}\n' +
      '    if (input) {\n' +
      '      constraint = {where: JSON.parse(input)}\n' +
      '    }\n' +
      '\n' +
      '    const reqBody = {module: modelName, method: \'count\', param: [constraint]}\n' +
      '    const res = await fetch(dbUrl, {\n' +
      '      method: \'POST\',\n' +
      '      body: JSON.stringify(reqBody),\n' +
      '    })\n' +
      '    const result = await res.json()\n' +
      '\n' +
      '    if (result.error) {\n' +
      '      return errorRes(result.error)\n' +
      '    }\n'
  },

  create: () => {
    return '    if (!input) {\n' +
      '      return errorRes(\'No param is detected.\')\n' +
      '    }\n' +
      '    const param = JSON.parse(input)\n' +
      '\n' +
      '    const reqBody = {module: modelName, method: \'create\', param: [param]}\n' +
      '    const res = await fetch(dbUrl, {\n' +
      '      method: \'POST\',\n' +
      '      body: JSON.stringify(reqBody),\n' +
      '    })\n' +
      '    const result = await res.json()\n' +
      '\n' +
      '    if (result.error) {\n' +
      '      return errorRes(result.error)\n' +
      '    }\n'
  },

  delete: () => {
    return '    if (!input) {\n' +
      '      return errorRes(\'No param is detected.\')\n' +
      '    }\n' +
      '    const param = {where: JSON.parse(input)}\n' +
      '\n' +
      '    const reqBody = {module: modelName, method: \'destroy\', param: [param]}\n' +
      '    const res = await fetch(dbUrl, {\n' +
      '      method: \'POST\',\n' +
      '      body: JSON.stringify(reqBody),\n' +
      '    })\n' +
      '    const result = await res.json()\n' +
      '\n' +
      '    if (result.error) {\n' +
      '      return errorRes(result.error)\n' +
      '    } else if (result.data === 0) {\n' +
      '      return errorRes(\'Delete fail\')\n' +
      '    }\n'
  },

  find: () => {
    return '    let constraint = {}, method = \'findAll\'\n' +
      '    if (input) {\n' +
      '      method = \'findOne\'\n' +
      '      const req = JSON.parse(input)\n' +
      '      constraint = {where: req.cond}\n' +
      '      if (req.type === \'all\') {\n' +
      '        method = \'findAll\'\n' +
      '      }\n' +
      '    }\n' +
      '\n' +
      '    const reqBody = {module: modelName, method, param: [constraint]}\n' +
      '    const res = await fetch(dbUrl, {\n' +
      '      method: \'POST\',\n' +
      '      body: JSON.stringify(reqBody),\n' +
      '    })\n' +
      '    const result = await res.json()\n' +
      '\n' +
      '    if (result.error) {\n' +
      '      return errorRes(result.error)\n' +
      '    }\n'
  },

  update: () => {
    return '    let param = []\n' +
      '    if (input) {\n' +
      '      const req = JSON.parse(input)\n' +
      '      param.push(req.values, {where: req.cond})\n' +
      '    } else {\n' +
      '      return errorRes(\'No param is detected\')\n' +
      '    }\n' +
      '\n' +
      '    const reqBody = {module: modelName, method: \'update\', param}\n' +
      '    const res = await fetch(dbUrl, {\n' +
      '      method: \'POST\',\n' +
      '      body: JSON.stringify(reqBody),\n' +
      '    })\n' +
      '    const result = await res.json()\n' +
      '\n' +
      '    if (result.error) {\n' +
      '      return errorRes(result.error)\n' +
      '    } else if (result.data[0] === 0) {\n' +
      '      return errorRes(\'Update fail\')\n' +
      '    }\n'
  },
}

const deleteFolderSync = function (folderPath) {
  if (!fs.existsSync(folderPath)) {
    return
  }

  fs.readdirSync(folderPath).forEach(file => {
    const curPath = join(folderPath, file)
    if (fs.lstatSync(curPath).isDirectory()) {
      deleteFolderSync(curPath)
    } else {
      fs.unlinkSync(curPath)
    }
  })
  fs.rmdirSync(folderPath)
}

const projectPath = process.cwd()
const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

modelNames.forEach(async model => {
  const ORMPath = join(projectPath, model)
  deleteFolderSync(ORMPath)
  fs.mkdirSync(ORMPath)

  const firstCharUpper = str => str.charAt(0).toUpperCase() + str.slice(1)
  writeFile(join(ORMPath, 'common.js'), getCommonJS(firstCharUpper(model)))
  Object.keys(template).forEach(async op => {
    const opPath = join(ORMPath, op)
    await mkdir(opPath)
    const code = getCodeHead(firstCharUpper(op)) + template[op]() + getCodeTail()
    writeFile(join(opPath, 'func.js'), code)
    writeFile(join(opPath, 'func.yaml'), getYAML())
  })
})