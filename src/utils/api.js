import axios from 'axios'
import CONFIG from './config'
import dialog from './dialog'
import merge from 'lodash/merge'
import combineURLs from 'axios/lib/helpers/combineURLs'
import isAbsoluteURL from 'axios/lib/helpers/isAbsoluteURL'
import buildURL from 'axios/lib/helpers/buildURL'
import qs from 'query-string'

export const DEFAULTS = {
  successCode: 0, // 后台返回表示成功的状态码
  debug: false,
  showLoading: true,
  loadingMessage: '请稍候...',
  loadingMask: true,
  showSuccess: false, // 提示成功信息
  showError: true, // 提示错误信息
  successMessage: '', // 操作成功时提示信息
  errorMessage: '', // 操作失败时提示信息
  resultHandler: null, // 查询结果处理
  logoutHandler: null, // 登录失效处理
  appendData: null, // 添加公共参数
  returnResponse: false, // 不解析response返回data，直接视为成功并返回
  paramsSerializer (params) {
    // URL参数为数组的处理方式
    return qs.stringify(params)
  },
}
function showLoading ({ loadingMessage = '加载中...', loadingMask = true }) {
  dialog.loading.show({
    message: loadingMessage,
    forbidClick: loadingMask,
  })
}

function hideLoading () {
  dialog.loading.hide()
}

function errorMessage (title, message, type = 'toast') {
  dialog[type]({
    type: dialog.ERROR,
    title,
    message: message || title,
  })
}

function successMessage (title, message, type = 'toast') {
  dialog[type]({
    type: dialog.SUCCESS,
    title,
    message: message || title,
  })
}

// 删除空参数
function deleteEmptyData (data) {
  if (data) {
    for (const key in data) {
      const val = data[key]
      if (typeof val === 'undefined' || val === '' || val === null) {
        delete data[key]
      }
    }
  }
  return data
}

// 添加通用参数
function appendData (config) {
  if (!config.params) {
    config.params = {}
  }
  // 添加公共参数
  if (config.appendData) {
    config.appendData(config)
  }
  return config
}

class API {
  constructor(apiConfig) {
    this.defaults = merge({}, DEFAULTS, apiConfig)
    this.instance = axios.create(this.defaults)
  }

  action (sourceConfig) {
    return new Promise((resolve, reject) => {
      const config = merge({}, this.defaults, sourceConfig)

      // 删除空参数
      deleteEmptyData(config.params)
      deleteEmptyData(config.data)
      // 添加公共参数
      appendData(config)

      if (config.showLoading) {
        showLoading(config)
      }
      this.instance
        .request(config)
        .then((res) => {
          if (config.showLoading) {
            hideLoading()
          }
          if (config.returnResponse) {
            if (config.showSuccess) {
              successMessage(config.successMessage)
            }
            resolve(res)
          } else {
            const result = res.data
            const { code, data } = result
            if (code === config.successCode) {
              if (config.showSuccess) {
                successMessage(config.successMessage, result.errorMessage)
              }
              resolve(data)
            } else {
              const e = new APIError(result)
              if (config.showError) {
                errorMessage(config.errorMessage, e.message)
              }
              if (e.code === 401) {
                if (config.logoutHandler) {
                  config.logoutHandler(e).then(() => {
                    reject(e)
                  })
                } else {
                  reject(e)
                }
              } else {
                reject(e)
              }
            }
          }
        })
        .catch((e) => {
          if (config.showLoading) {
            hideLoading()
          }
          if (config.showError) {
            errorMessage(config.errorMessage, e.message)
          }
          reject(e)
        })
    })
  }

  request (config) {
    return new Promise((resolve, reject) => {
      config = merge(
        {
          successMessage: '操作成功',
          errorMessage: '操作失败',
        },
        config,
      )
      this.action(config)
        .then((result) => {
          let data = result
          if (config.resultHandler) {
            data = config.resultHandler(data)
          }
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  query (config) {
    config = merge(
      {
        method: 'GET',
        showSuccess: false,
        errorMessage: '查询失败',
      },
      config,
    )
    return this.request(config)
  }

  // 分页查询数据
  paginationQuery (config, { pageSize = 10, currentPage = 1, simple = false }) {
    return new Promise((resolve, reject) => {
      config = merge(
        {
          method: 'GET',
          showSuccess: false,
          errorMessage: '查询失败',
        },
        config,
        {
          params: {
            pageSize: pageSize,
            pageIndex: currentPage,
          },
        },
      )
      this.action(config)
        .then((res) => {
          let pagingData
          if (simple) {
            // 后端不返回分页信息
            pagingData = {
              list: res, // 分页数据(required)
              total: 0, // 总数(required)
              currentPage: 1, // 当前页码(required)
              pageSize: 0, // 分页数设定值
              length: 0, // 分页数实际值(比如设定pageSize为10，但最后一页只有7条记录，size为7)
              pages: 1, // 总页数
              startRow: 0, // 当前起始索引
              endRow: 0, // 当前结尾索引
            }
          } else {
            const list = res.records
            const total = res.total
            const currentPage = res.current || 1
            const pageSize = res.size
            const length = list.length
            const pages = res.pages || 1
            const startRow = (currentPage - 1) * pageSize + 1
            const endRow = startRow + length - 1

            pagingData = {
              list, // 分页数据(required)
              total, // 总数(required)
              currentPage, // 当前页码(required)
              pageSize, // 分页数设定值
              length, // 分页数实际值(比如设定pageSize为10，但最后一页只有7条记录，size为7)
              pages, // 总页数
              startRow, // 当前起始索引
              endRow, // 当前结尾索引
            }
          }
          if (config.resultHandler) {
            pagingData.list = config.resultHandler(pagingData.list)
          }
          resolve(pagingData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  add (config) {
    config = merge(
      {
        method: 'POST',
        showSuccess: true,
        successMessage: '添加成功',
        errorMessage: '添加失败',
      },
      config,
    )
    return this.request(config)
  }

  update (config) {
    config = merge(
      {
        method: 'POST',
        showSuccess: true,
        successMessage: '修改成功',
        errorMessage: '修改失败',
      },
      config,
    )
    return this.request(config)
  }

  del (config) {
    config = merge(
      {
        method: 'DELETE',
        showSuccess: true,
        successMessage: '删除成功',
        errorMessage: '删除失败',
      },
      config,
    )
    return this.request(config)
  }

  setHeader (header) {
    merge(this.instance.defaults.headers.common, header)
  }

  setLogoutHandler (handler) {
    this.defaults.logoutHandler = handler
  }

  download (config) {
    config = merge({}, this.defaults, config)

    // 删除空参数
    deleteEmptyData(config.params)
    deleteEmptyData(config.data)
    // 添加公共参数
    appendData(config)
    let { url, params } = config
    config = merge(
      {
        baseURL: CONFIG.API.ROOT,
      },
      this.defaults,
      config,
    )
    if (config.baseURL && !isAbsoluteURL(url)) {
      url = combineURLs(config.baseURL, url)
    }
    const {
      Authorization,
    } = this.instance.defaults.headers.common
    params = merge(
      {},
      {
        token: Authorization,
      },
      params,
    )
    window.open(buildURL(url, params, config.paramsSerializer), '_blank')
  }

  upload (config, option) {
    config = merge(
      {},
      this.defaults,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        lock: false,
        showSuccess: false,
        // showError: false,
        method: 'POST',
        successMessage: '上传成功',
        errorMessage: '上传失败',
      },
      config,
    )
    const formData = new global.FormData()
    if (option.data) {
      Object.keys(option.data).forEach((key) => {
        formData.append(key, option.data[key])
      })
    }
    formData.append(option.filename, option.file)
    config.data = formData

    return new Promise((resolve, reject) => {
      this.request(config)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

class APIError extends Error {
  constructor(result) {
    super(result.errorMessage)
    this.data = result.data
    this.code = result.code
    this.name = 'APIError'
  }
}

export default API
