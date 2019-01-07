export default class Mongodb {
  /**
   * 公共find方法 非关联查找
   * @param model
   * @param conditions
   * @param fields 查找时限定的条件，如顺序，某些字段不查找等
   * @param options
   * @param callback
   */
  static find(model, conditions, fields, options = {}) {
    let sort = options.sort == undefined ? {
      _id: -1
    } : options.sort
    delete options.sort
    options.sort = sort
    return new Promise((resolve, reject) => {
      model.find(conditions, fields, options, function (err, res) {
        if (err) {
          console.error('Error: ' + JSON.stringify(err))
          reject(err)
          return false
        } else {
          if (res.length != 0) {
            console.log('find success!')
            resolve(res)
          } else {
            console.log('find fail:no this data!')
            resolve(res)
          }
        }
      })

    })
  }

  /*
   * 公共update方法
   * @param model 要操作数据库的模型
   * @param conditions 增加的条件,如{id:xxx}
   * @param update 更新条件{set{id:xxx}}
   * @param options
   */
  static update(model, conditions, update, options) {
    return new Promise((resolve, reject) => {
      model.update(conditions, update, options, (err, res) => {
        if (err) {
          console.error('Error: ' + JSON.stringify(err));
          reject(err);
          return false;
        }
        if (res.n != 0) {
          console.log('update success!');
          resolve(res);
        } else {
          console.log('update fail:no this data!');
          reject(res);
        }
      })
    })
  }

  /**
   *批量更新
   * @static
   * @param {*} model
   * @param {*} conditions
   * @param {*} update
   * @param {*} options
   * @returns
   * @memberof Mongodb
   */
  static updateMany(model, conditions, update, options) {
    return new Promise((resolve, reject) => {
      model.updateMany(conditions, update, options, (err, res) => {
        if (err) {
          console.error('Error: ' + JSON.stringify(err));
          reject(err);
          return false;
        }
        if (res.n != 0) {
          console.log('update success!');
          resolve(res);
        } else {
          console.log('update fail:no this data!');
          reject(res);
        }
      })
    })
  }


  /* 
   * 公共create方法
   * @param model 要操作数据库的模型
   * @param conditions 增加的条件,如{id:xxx}
   */
  static create(model, conditions) {
    return new Promise((resolve, reject) => {
      model.create(conditions, (err, res) => {
        if (err) {
          console.error('Error: ' + JSON.stringify(err));
          reject(err);
          return false;
        }
        console.log('save success!')
        resolve(res);
      })
    })
  }

  /**
   *插入多条数据
   * @static
   * @param {*} model
   * @param {*} conditions
   * @returns
   * @memberof Mongodb
   */
  static insertMany(model, conditions) {
    return new Promise((resolve, reject) => {
      model.insertMany(conditions, (err, res) => {
        if (err) {
          console.error('Error: ' + JSON.stringify(err));
          reject(err);
          return false;
        }
        console.log('save success!')
        resolve(res);
      })
    })
  }

  /**
   * 公共remove方法
   * @param model
   * @param conditions
   */
  static remove(model, conditions) {
    return new Promise((resolve, reject) => {
      model.remove(conditions, (err, res) => {
        if (err) {
          console.error('Error: ' + JSON.stringify(err));
          reject(err);
          return false;
        } else {
          if (res.n != 0) {
            console.log('remove success!');
            resolve(res);
          } else {
            console.log('remove fail:no this data!');
            reject(res);
          }

        }
      });
    })
  }

  /**
   *获取长度
   * @static
   * @param {*} model
   * @param {*} conditions
   * @param {*} fields
   * @param {*} [options={}]
   * @returns
   * @memberof Mongodb
   */
  static getCount(model, conditions, fields, options = {}) {
    return new Promise((resolve, reject) => {
      model.find(conditions, fields).countDocuments({}, (err, res) => {
        if (err) {
          console.log('查询长度错误')
          return reject(err);
        }
        resolve(res)
      })
    })
  }

  /**
   * 公共findOne方法 非关联查找
   * @param model
   * @param conditions
   * @param fields 查找时限定的条件，如顺序，某些字段不查找等
   * @param options
   * @param callback
   */
  static findOne(model, conditions, fields, options = {}) {
    var sort = options.sort == undefined ? {
      _id: -1
    } : options.sort
    delete options.sort
    return new Promise((resolve, reject) => {
      model.findOne(conditions, fields, options, (err, res) => {
        if (err) {
          console.error('Error: ' + JSON.stringify(err))
          reject(err)
          return false
        } else {
          if (res) {
            console.log('find success!')
            resolve(res)
          } else {
            console.log('find fail:no this data!')
            resolve(res)
          }
        }
      }).sort(sort)
    })
  }

  /**
   *分页查找
   * @static
   * @param {*} model
   * @param {*} conditions
   * @param {*} fields
   * @param {*} [options={}]
   * @returns
   * @memberof Mongodb
   */
  static async findPage(model, conditions, fields, options = {}) {
    var sort = options.sort == undefined ? {
      _id: -1
    } : options.sort
    delete options.sort
    const getCount = () => {
      return new Promise((resolve, reject) => {
        model.find(conditions, fields).countDocuments({}, (err, res) => {
          if (err) {
            console.log('查询长度错误')
            return reject(err)
          }
          resolve(res)
        })
      })
    }
    const count = await getCount()
    return new Promise((resolve, reject) => {
      model.find(conditions, fields, options, function (err, res) {
        if (err) {
          console.error('Error: ' + JSON.stringify(err))
          reject(err)
          return false
        } else {
          if (res.length != 0) {
            console.log('find success!')
            resolve({
              list: res,
              total: count
            })
          } else {
            console.log('find fail:no this data!')
            resolve({
              list: res,
              total: count
            })
          }
        }
      }).sort(sort)
    })
  }


  /**
   *随机查询
   * @static
   * @param {*} model
   * @param {*} match
   * @param {*} conditions
   * @memberof Mongodb
   */
  static random(model, match, conditions) {
    var sort = conditions.sort == undefined ? {
      _id: -1
    } : conditions.sort;
    delete conditions.sort;
    return new Promise((resolve, reject) => {
      const {
        size,
        $project
      } = conditions
      const paramsArr = [{
          $match: match
        },
        {
          $sort: sort
        }
      ]
      if (size) {
        paramsArr.push({
          $sample: {
            size: conditions.size
          }
        })
      }
      if ($project) {
        paramsArr.push({
          $project: conditions.$project
        })
      }
      model.aggregate(paramsArr, (err, res) => {
        if (err) {
          console.error('Error: ' + JSON.stringify(err));
          reject(err);
          return false;
        } else {
          if (res) {
            console.log('find success!');
            resolve(res);
          } else {
            console.log('find fail:no this data!');
            reject('暂无数据')
          }
        }
      })
    })
  }

  static lookup(model, match, asField = {}, conditions) {
    var sort = conditions.sort == undefined ? {
      _id: -1
    } : conditions.sort;
    delete conditions.sort;
    return new Promise((resolve, reject) => {
      const {
        skip,
        limit,
        $project
      } = conditions
      const paramsArr = []
      paramsArr.push({
        $match: match
      }, {
        $sort: sort
      }, )
      if ($project) {
        paramsArr.push({
          $project
        })
      }
      paramsArr.push({
        $lookup: {
          from: asField.model,
          localField: asField.localField,
          foreignField: asField.foreignField,
          as: asField.name
        }
      }, {
        $skip: skip
      }, {
        $limit: limit
      })
      model.aggregate(paramsArr, (err, res) => {
        if (err) {
          console.error('Error: ' + JSON.stringify(err));
          reject(err);
          return false;
        } else {
          if (res) {
            console.log('find success!');
            resolve(res);
          } else {
            console.log('find fail:no this data!');
            reject('暂无数据')
          }
        }
      })
    })
  }

  // static lookup(model, match, asField = {}, conditions) {
  //     var sort = conditions.sort == undefined ? {
  //         _id: -1
  //     } : conditions.sort;
  //     delete conditions.sort;
  //     return new Promise((resolve, reject) => {
  //         model.aggregate([
  //             {$match: match},
  //             {
  //                 $lookup: {
  //                     from: asField.model,
  //                     localField: asField.localField,
  //                     foreignField: asField.foreignField,
  //                     as: asField.name
  //                 }
  //             },
  //             { $sort: sort},
  //             { $skip:  conditions.skip},
  //             { $limit:  conditions.limit }
  //         ],  (err, res) => {
  //             if (err) {
  //                 console.error('Error: ' + JSON.stringify(err));
  //                 reject(err);
  //                 return false;
  //             } else {
  //                 if (res) {
  //                     console.log('find success!');
  //                     resolve(res);
  //                 } else {
  //                     console.log('find fail:no this data!');
  //                     reject('暂无数据')
  //                 }
  //             }
  //         })
  //     })
  // }

}