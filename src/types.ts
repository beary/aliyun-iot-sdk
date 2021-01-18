// 公共请求参数值 https://help.aliyun.com/document_detail/30561.html#h2-url-1

/** 返回值的类型，支持JSON和XML类型。默认为XML。 */
export type Format = 'JSON' | 'XML'
/** API版本号，为日期形式：YYYY-MM-DD，最新版本为2018-01-20 。每个接口可以存在多个版本。  */
export type Version = '2018-01-20'
/** 签名方式，目前支持HMAC-SHA1。 */
export type SignatureMethod = 'HMAC-SHA1'
/** 签名算法版本。目前版本是1.0。 */
export type SignatureVersion = '1.0'
/** 设备所在地域（与控制台上的Region对应） */
export type RegionId = 'cn-shanghai' | 'ap-southeast-1' | 'us-west-1' | 'ap-northeast-1' | 'eu-central-1'

/**
 * 公共请求参数
 */
export interface CommonRequestParameters {
  Format: Format
  Version: Version
  AccessKeyId: string
  Signature?: string
  SignatureMethod: SignatureMethod
  Timestamp: string
  SignatureVersion: SignatureVersion
  SignatureNonce: string
  RegionId: RegionId
}

export type RequestParameters = PubParameters | PubBroadcastParameters | RRpcParameters |
  GetDeviceShadowParameters | UpdateDeviceShadowParameters

/** 通过自定义Topic向指定设备发布消息 */
export interface PubParameters {
  Action: 'Pub'
  /**
   * 要发送的消息主体
   *
   * 您需要将消息原文转换成二进制数据，并进行Base64编码，从而生成消息主体
   */
  MessageContent: string
  /** 要发送消息的产品 Key */
  ProductKey: string
  /**
   * 要接收消息的Topic
   *
   * 您可以调用QueryProductTopic接口查询产品下的Topic类列表，或在设备详情页的Topic列表页签下查看设备的具体Topic
   *
   * * 不支持系统Topic
   * * 指定Topic的操作权限须为发布或发布和订阅
   */
  TopicFullName: string
  /** 实例ID。公共实例不传此参数，企业版实例需传入 */
  IotInstanceId?: string
  /**
   * 指定消息的发送方式。取值：
   * 0：最多发送一次。
   * 1：最少发送一次。
   * 如果不传入此参数，则使用默认值0
   */
  Qos?: 0 | 1
  /** 使用MQTT 5.0版本通信协议时，请求和响应模式中的响应主题，即通信的Topic */
  ResponseTopic?: string
  /** 使用MQTT 5.0版本通信协议时，请求和响应模式中的相关数据，用户可自定义 */
  CorrelationData?: string
}

/** 向指定产品所有设备，或向订阅了指定Topic的所有设备发布广播消息 */
export interface PubBroadcastParameters {
  Action: 'PubBroadcast'
  /**
   * 要发送的消息主体
   *
   * 您需要将消息原文转换成二进制数据，并进行Base64编码，从而生成消息主体
   */
  MessageContent: string
  /** 要发送广播消息的产品 Key */
  ProductKey: string
  /** 实例ID。公共实例不传此参数，企业版实例需传入 */
  IotInstanceId?: string
  /**
   * 要接收广播消息的Topic全称
   *
   * 格式为：/broadcast/${productKey}/自定义字段
   *
   * 其中，${productKey}是要接收广播消息的具体产品Key；自定义字段中您可以指定任意字段
   * * 广播Topic是在设备开发时编码定义的，无需控制台创建
   * * 一个广播Topic最多可被1,000个设备订阅。
如果您的设备超过数量限制，您可以对设备进行分组。例如，如果您有5,000个设备，您可以将设备按每组1,000个，而分成5组。您需要分5次调用广播Topic，自定义字段分别设置为group1/2/3/4/5，然后让每组设备分别订阅各自分组的广播Topic
   */
  TopicFullName: string
}

/** 向指定设备发送请求消息，并同步返回响应 */
export interface RRpcParameters {
  Action: 'RRpc'
  /** 要接收消息的设备名称 */
  DeviceName: string
  /** 要发送消息产品的 ProductKey */
  ProductKey: string
  /** 要发送的消息内容经过Base64编码得到的字符串格式数据 */
  RequestBase64Byte: string
  /** 等待设备回复消息的时间，单位是毫秒，取值范围是 1000 ~ 8000 */
  Timeout: number
  /** 实例ID。公共实例不传此参数，企业版实例需传入 */
  IotInstanceId?: string
  /**
   * 使用自定义的RRPC相关Topic。需要设备端配合使用，请参见设备端开发自定义Topic。
   *
   * 不传入此参数，则使用系统默认的RRPC Topic
   */
  Topic?: string
}

export interface GetDeviceShadowParameters {
  Action: 'GetDeviceShadow'
  ProductKey: string
  DeviceName: string
  IotInstanceId?: string
}

export interface UpdateDeviceShadowParameters {
  Action: 'UpdateDeviceShadow'
  ProductKey: string
  DeviceName: string
  ShadowMessage: string
  IotInstanceId?: string
  DeltaUpdate?: boolean
}
