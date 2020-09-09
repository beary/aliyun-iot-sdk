import { createHmac } from 'crypto'
import axios from 'axios'
import FormData from 'form-data'
import { nanoid } from 'nanoid'
import {
  Format,
  RegionId,
  Version,
  SignatureVersion,
  SignatureMethod,
  CommonRequestParameters,
  RequestParameters,
} from './types'

interface ClientOptions {
  accessKeyId: string
  accessKeySecret: string
  regionId: RegionId
  version?: Version
}

export class Client {
  private endpoint: string
  private method: string

  private accessKeyId: string
  private accessKeySecret: string
  private regionId: RegionId

  private format: Format
  private version: Version
  private signatureVersion: SignatureVersion
  private signatureMethod: SignatureMethod

  constructor(params: ClientOptions) {
    this.endpoint = `https://iot.${params.regionId}.aliyuncs.com`
    this.method = 'POST'

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

  public request(params: RequestParameters) {
    const requestParams = this.__sign__(this.__mergeRequestParameters__(params), this.accessKeySecret)
    const form = new FormData()
    Object.entries(requestParams).forEach(([k, v]) => form.append(k, v))
    return axios.post(this.endpoint, form, { headers: form.getHeaders() })
  }

  /**
   * 将调用 API 的请求参数与公共参数合并
   * @param requestParameters API 请求参数
   */
  private __mergeRequestParameters__<T>(requestParameters: T) {
    return Object.assign({
      Format: this.format,
      Version: this.version,
      AccessKeyId: this.accessKeyId,
      SignatureMethod: this.signatureMethod,
      Timestamp: new Date().toISOString(),
      SignatureVersion: this.signatureVersion,
      SignatureNonce: nanoid(),
      RegionId: this.regionId
    }, requestParameters)
  }

  private __sign__<T extends CommonRequestParameters>(params: T, accessKeySecret: string) {
    const queryString = Object.entries(params)
      .sort()
      .map(([k, v]) => [encodeURIComponent(k), encodeURIComponent(v)].join('='))
      .join('&')
    const stringToSign = `${this.method}&${encodeURIComponent('/')}&${encodeURIComponent(queryString)}`
    // https://help.aliyun.com/document_detail/30563.html#h2-url-1
    // ❗❗❗ 计算签名时，使用的 Key 就是你的 AccessKeySecret 并加上一个与号 & 字符（ASCII:38）
    // 使用的哈希算法是 SHA1
    const signature = createHmac('sha1', `${accessKeySecret}&`)
      .update(stringToSign)
      .digest('base64')
    // 使用 POST 请求时，签名不要进行 URL 编码
    params.Signature = signature
    return params
  }
}
