const {
  AppError
} = require('../utilities')

class GroupService {
  constructor (groupModel) {
    this.groupModel = groupModel
  }

  async getGroups ({ query, body, groupSearchQueryValidator }) {
    const validQuery = await groupSearchQueryValidator.validateAsync(query)
    const userID = body._jwt_.xid

    const page = validQuery.page || 1
    const count = validQuery.count || 10
    const offset = (page - 1) * count

    let userGroupQueryBuilder = this.groupModel.query().select().where({
      user_id: userID
    })

    if ('sort' in validQuery && 'sort_on' in validQuery) {
      userGroupQueryBuilder = userGroupQueryBuilder
        .orderBy(validQuery.sort_on, validQuery.sort)
    } else {
      // default sorting is based on title and asc
      userGroupQueryBuilder = userGroupQueryBuilder
        .orderBy('group_name', 'asc')
    }

    userGroupQueryBuilder = userGroupQueryBuilder.limit(count).offset(offset)

    const userGroups = await userGroupQueryBuilder

    return userGroups
  }

  async createGroup ({ body, groupValidator }) {
    const userID = body._jwt_.xid
    let group = await groupValidator.validateAsync(body, {
      stripUnknown: true
    })
    // create group
    // add current users id
    group = {
      ...group,
      user_id: userID
    }
    const result = await this.groupModel.query().insert(group)
    return result
  }

  async deleteGroup ({ id, idValidator, body }) {
    const groupID = await idValidator.validateAsync(id)
    const userID = body._jwt_.xid
    const result = await this.groupModel.query().del().where({
      user_id: userID,
      group_id: groupID
    })
    if (result !== 1) {
      throw new AppError(`group resource with id ${groupID} does not exist`, 404)
    }
    return { result, groupID }
  }

  async updateGroup ({ body, idValidator, groupValidator, id }) {
    const groupID = await idValidator.validateAsync(id)
    const userID = body._jwt_.xid

    const group = await groupValidator.validateAsync(body, {
      stripUnknown: true
    })

    const updateResult = await this.groupModel.query().patch(group).where({
      group_id: groupID,
      user_id: userID
    })

    if (updateResult !== 1) {
      throw new AppError(`group resource with id ${groupID} does not exist`, 404)
    }

    return { updateResult, groupID, group }
  }
}

module.exports = GroupService
