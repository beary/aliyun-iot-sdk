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
  method = 'GET'
) => {
  const queryString = Object.keys(params)
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&')
  const stringToSign = `${method}&${encodeURIComponent('/')}&${encodeURIComponent(queryString)}`
  // https://help.aliyun.com/document_detail/30563.html#h2-url-1
  // ❗❗❗ 计算签名时，使用的 Key 就是您的 AccessKeySecret 并加上一个与号 & 字符（ASCII:38）【我不知道为什么要搞这个鬼东西，调了特么半天】
  // 使用的哈希算法是 SHA1
  const signature = encodeURIComponent(hmacSha1(`${accessKeySecret}&`, stringToSign))
  params.Signature = signature
  return params
}

// GET&%2F&AccessKeyId%3DLTAIZBLddGWi57kW%26Action%3DCreateProduct%26DataFormat%3D0%26Format%3DJSON%26NodeType%3D1%26ProductName%3Dsdk_device%26RegionId%3Dcn-shanghai%26SignatureMethod%3DHMAC-SHA1%26SignatureNonce%3D1559204502144%26SignatureVersion%3D1.0%26Timestamp%3D2019-05-30T08%253A21%253A42.144Z%26Version%3D2018-01-20