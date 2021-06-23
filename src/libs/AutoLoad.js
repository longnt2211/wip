'use strict'

const fs = require('fs')
const path = require('path')
const runtime = require('./RuntimeUtils')

module.exports = (dirname, filename, args = []) => {
  const basename = path.basename(filename)
  const objReuslt = {}
  fs.readdirSync(dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    })
    .forEach((file) => {
      let instance = require(path.join(dirname, file))
      if (!runtime.isClass(instance)) {
        instance = require(path.join(dirname, file))(...args)
      }
      objReuslt[instance.name] = instance
    })
  return objReuslt
}
