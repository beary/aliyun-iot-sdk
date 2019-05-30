import fetch from 'node-fetch'
import { sign } from './utils'
import {
  CommonRequestParameters,
  CreateProductParameters,
  Version,
  RegionId,
  Format,
  SignatureVersion,
  SignatureMethod,
  PubParameters,
  PubBroadcastParams,
  RRpcParameters,
  GetDeviceShadowParameters,
  UpdateDeviceShadowParameters
} from './types'

interface ClientInitParams {
  accessKeyId: string
  accessKeySecret: string
  regionId: RegionId
  version?: Version
}

export class IoT {
  private endpoint: string

  private accessKeyId: string
  private accessKeySecret: string
  private regionId: RegionId

  private format: Format
  private version: Version
  private signatureVersion: SignatureVersion
  private signatureMethod: SignatureMethod

  constructor(params: ClientInitParams) {
    this.endpoint = `https://iot.${params.regionId}.aliyuncs.com`

    this.accessKeyId = params.accessKeyId
    this.accessKeySecret = params.accessKeySecret
    this.regionId = params.regionId

    this.format = 'JSON'
    this.signatureVersion = '1.0'
    this.signatureMethod = 'HMAC-SHA1'
    if (params.version)
      this.version = params.version
    else
      this.version = '2018-01-20'
  }

  private __request<T extends CommonRequestParameters>(params: T) {
    const requestParams = sign(params, this.accessKeySecret)
    const queryString = Object.keys(requestParams)
      .map(k => `${k}=${requestParams[k]}`)
      .join('&')

    return fetch(`${this.endpoint}?${queryString}`, {
      method: 'GET'
    })
  }

  /**
   * 将调用 API 的请求参数与公共参数合并
   * @param requestParameters API 请求参数
   */
  private __mergeRequestParameters<T>(requestParameters: T) {
    return Object.assign({
      Format: this.format,
      Version: this.version,
      AccessKeyId: this.accessKeyId,
      SignatureMethod: this.signatureMethod,
      // 文档没说，但是从返回的报错信息来看，时间戳药
      Timestamp: encodeURIComponent(new Date().toISOString()),
      SignatureVersion: this.signatureVersion,
      SignatureNonce: `${new Date().getTime()}`,
      RegionId: this.regionId
    }, requestParameters)
  }

  /**
   * 创建 IoT 产品
   * @param createProductParams 创建产品参数，参考文档 https://help.aliyun.com/document_detail/69123.html
   */
  public createProduct(createProductParams: CreateProductParameters) {
    createProductParams.Action = 'CreateProduct'
    const params = this.__mergeRequestParameters(createProductParams)
    return this.__request(params)
  }

  /**
   * 向指定 Topic 发布消息
   * @param pubParams 发布消息参数，参考文档 https://help.aliyun.com/document_detail/69793.html#h2-url-1
   */
  public pub(pubParams: PubParameters) {
    pubParams.Action = 'Pub'
    const params = this.__mergeRequestParameters(pubParams)
    return this.__request(params)
  }

  /**
   * 向订阅了指定 Topic 的所有设备发布广播消息
   * @param pubParams 发布广播消息参数，参考文档 https://help.aliyun.com/document_detail/69909.html#h2-url-2
   */
  public pubBroadcast(pubBroadcastParams: PubBroadcastParams) {
    pubBroadcastParams.Action = 'PubBroadcast'
    const params = this.__mergeRequestParameters(pubBroadcastParams)
    return this.__request(params)
  }

  /**
   * 向指定设备发送请求消息，并同步返回响应
   * @param RRpcParams RRpc 请求参数，参考文档 https://help.aliyun.com/document_detail/69797.html#h2-url-1
   */
  public rRpc(RRpcParams: RRpcParameters) {
    RRpcParams.Action = 'RRpc'
    const params = this.__mergeRequestParameters(RRpcParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备的影子信息
   * @param getDeviceShadowParams 请求参数，参考文档 https://help.aliyun.com/document_detail/69953.html#h2-url-1
   */
  public getDeviceShadow(getDeviceShadowParams: GetDeviceShadowParameters) {
    getDeviceShadowParams.Action = 'GetDeviceShadow'
    const params = this.__mergeRequestParameters(getDeviceShadowParams)
    return this.__request(params)
  }

  /**
   * 修改指定设备的影子信息
   * @param getDeviceShadowParams 请求参数，参考文档 https://help.aliyun.com/document_detail/69954.html#h2-url-1
   */
  public updateDeviceShadow(updateDeviceShadowParams: UpdateDeviceShadowParameters) {
    updateDeviceShadowParams.Action = 'UpdateDeviceShadow'
    const params = this.__mergeRequestParameters(updateDeviceShadowParams)
    return this.__request(params)
  }
}
