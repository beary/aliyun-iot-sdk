import { createHmac } from 'crypto'
import { CommonRequestParameters } from './types'

const hmacSha1 = (key: string, content: string) =>
  createHmac('sha1', key).update(content).digest('base64')

/**
 * 将接口调用的 JSON 结构的请求参数进行签名，并且将签名结果塞入传入的 JSON 中的 Signature 属性
 * @param params 请求参数
 * @param accessKeySecret 阿里云 AccessKeySecret
 * @param method 请求方法 POST/GET
 */
export const sign = <T extends CommonRequestParameters>(
  params: T,
  accessKeySecret: string,
  method = 'POST'
) => {
  const queryString = Object.keys(params)
    .sort()
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')
  const stringToSign = `${method}&${encodeURIComponent('/')}&${encodeURIComponent(queryString)}`
  // https://help.aliyun.com/document_detail/30563.html#h2-url-1
  // ❗❗❗ 计算签名时，使用的 Key 就是你的 AccessKeySecret 并加上一个与号 & 字符（ASCII:38）
  // 使用的哈希算法是 SHA1
  const signature = hmacSha1(`${accessKeySecret}&`, stringToSign)
  // 使用 POST 请求时，签名不要进行 URL 编码
  params.Signature = signature
  return params
}
