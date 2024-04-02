/*
 * Copyright 2024 Teppo Kurki <teppo.kurki@iki.fi>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ejs = require('ejs')
const { join } = require('path')
const Qty = require('js-quantities')
const express = require('express')

module.exports = function (app) {
  const plugin = {}

  plugin.start = () => {
  }

  plugin.stop = () => {
  }

  plugin.id = 'ejs-plugin'
  plugin.name = 'Ejs template plugin'
  plugin.description = 'Plugin for serving http content using ejs templates'

  plugin.schema = function () {
    return {}
  }

  const v = (path, { c = [], dec = 1 }) => {
    const [from, to] = c
    const convert = from && to ? (v) => Qty.swiftConverter(from, to)(v).toFixed(dec) : (v) => v
    const fullValue = app.getSelfPath(path)
    return fullValue && fullValue.value !== undefined ? convert(fullValue.value) : '-'
  }

  plugin.registerWithRouter = (router) => {
    router.get('/:page', (req, res, next) => {
      if (req.path.endsWith('.html')) {
        ejs.renderFile(join(app.getDataDirPath(), req.params.page), { v }, {}, function (err, str) {
          if (err) {
            res.status(500)
            res.send(err.message)
          } else {
            res.type('html')
            res.send(str)
          }
        })
      } else {
        next()
      }
    })
    router.use('/', express.static(app.getDataDirPath()))
  }
  return plugin
}
