const {
    Model
} = require('objection')

class BaseModel extends Model {
    $formatDatabaseJson(json) {
        json = super.$formatDatabaseJson(json);

        return _.mapKeys(json, (value, key) => {
            return _.snakeCase(key);
        });
    }

    $parseDatabaseJson(json) {
        json = _.mapKeys(json, function (value, key) {
            return _.camelCase(key);
        });

        return super.$parseDatabaseJson(json);
    }
}

module.exports = {
    BaseModel
}