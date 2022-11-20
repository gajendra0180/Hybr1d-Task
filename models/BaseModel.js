const Sequelize = require('sequelize');

class BaseModel extends Sequelize.Model {
  // constructor() {
  //     super();
  //     this.fillables = [];
  //     this.hidden = [ 'id' ];
  //     this.includes = {};
  // }

  // ===============================
  // Model Methods
  // ===============================
  static paginate(
    conditions = {},
    perPage = null,
    page = null,
    columns = ['*'],
    distinct = true,
    pageName = 'page',
    emergencyCountRequired = false
  ) {
    page = page || 1;
    let limit = App.helpers.getComputedPaginationLimit(perPage);
    let offset = page * limit - limit;

    // For fixing count distinct thing (specially a case for sequelize)
    if (!App.helpers.getObjProp(conditions, 'include')) {
      conditions['include'] = [];
    }

    console.log('Emergency Count', emergencyCountRequired);
    if (!emergencyCountRequired)
      return this.findAndCountAll(
        App.helpers.cloneObj(conditions, {
          distinct: distinct,
          offset: offset,
          limit: limit
        })
      );
    else
      return this.count(
        App.helpers.cloneObj(conditions, {
          distinct: distinct
        })
      );
  }

  static getId(where) {
    return this.findOne({
      where,
      attributes: ['id'],
      order: [['created_at', 'DESC']]
    });
  }

  static getIncludes(type = null) {
    if (App.lodash.isNull(type)) {
      return this.includes;
    } else if (App.lodash.isObject(type)) {
      return App.lodash.pickBy(this.includes, val => {
        return val[App.lodash.keys(type)[0]] == App.lodash.values(type)[0];
      });
    } else if (App.lodash.isString(type)) {
      switch (type) {
        case 'all':
          return this.includes;

        case 'only-defaults':
          return App.lodash.pickBy(this.includes, val => {
            return val.isDefault;
          });

        case 'no-defaults':
          return App.lodash.pickBy(this.includes, val => {
            return !val.isDefault;
          });
      }
    }

    return null;
  }

  // ===============================
  // Instance Methods
  // ===============================
  getData(dotNotationStr = null, defaultVal = null) {
    let key = `dataValues`;

    if (!App.lodash.isNull(dotNotationStr)) {
      key = `${key}.${dotNotationStr}`;
    }

    return App.helpers.getObjProp(this, key, defaultVal);
  }

  getModelName() {
    let modelName = this.constructor.name;
    switch (modelName) {
      case 'User':
        modelName = 'User';
        break;
      case 'ConciergeServiceCategory':
        modelName = 'ConciergeServiceCategory';
        break;
      case 'ConciergeService':
        modelName = 'ConciergeService';
        break;
      case 'Provider':
        modelName = 'Provider';
        break;
    }

    return modelName;
  }
}

// ===============================
// Instance Members
// ===============================
BaseModel.fillables = [];
BaseModel.hidden = ['id'];
BaseModel.includes = {};

module.exports = BaseModel;
