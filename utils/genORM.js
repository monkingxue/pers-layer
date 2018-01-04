const fs = require('fs')
const path = require('path')

const {modelNames} = require('./modelNames')

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
    'entrypoint: node bundle.js'
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
  count : () => {
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

  create : () => {
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

  delete : () => {
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

  find : () => {
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

  update : () => {
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


const deleteFolder = function (folderPath) {
  if (!fs.existsSync(folderPath)) {
    return
  }

  fs.readdirSync(folderPath).forEach(file => {
    const curPath = path.join(folderPath, file)
    if (fs.lstatSync(curPath).isDirectory()) {
      deleteFolder(curPath)
    } else { // delete file
      fs.unlinkSync(curPath)
    }
  })
  fs.rmdirSync(path)
}

const projectPath = process.cwd()
const ops = ['count', 'create', 'delete', 'find', 'update']

modelNames.forEach(async modelName => {
  const ORMPath = path.join(projectPath, modelName)
  deleteFolder(ORMPath)
  fs.mkdirSync(ORMPath)
  fs.writeFile('common.js', getCommonJS(modelName))
  ops.forEach(async op => {
    await fs.mkdir(op)
    const code = getCodeHead(op) + template[op] + getCodeTail()
    fs.writeFile('func.js', code)
    fs.writeFile('func.yaml', getYAML())
  })
})