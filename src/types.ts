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
  [prop: string]: any
}


export interface CreateProductParameters {
  Action?: 'CreateProduct'
  ProductName: string
  NodeType: 0 | 1
  AliyunCommodityCode?: 'iothub_senior' | 'iothub'
  DataFormat: 0 | 1
  Description?: string
  Id2?: boolean
  ProtocolType?: 'modbus' | 'opc-ua' | 'customize' | 'ble' | 'zigbee'
  NetType?: 'WIFI' | 'CELLULAR' | 'ETHERNET' | 'LORA' | 'OTHER'
  JoinPermissionId?: string
}

export interface UpdateProductParameters {
  Action?: 'UpdateProduct'
}

export interface QueryProductListParameters {
  Action?: 'QueryProductList'
}

export interface QueryProductParameters {
  Action?: 'QueryProduct'
}

export interface DeleteProductParameters {
  Action?: 'DeleteProduct'
}

export interface CreateProductTagsParameters {
  Action?: 'CreateProductTags'
}

export interface UpdateProductTagsParameters {
  Action?: 'UpdateProductTags'
}

export interface DeleteProductTagsParameters {
  Action?: 'DeleteProductTags'
}

export interface ListProductTagsParameters {
  Action?: 'ListProductTags'
}

export interface ListProductByTagsParameters {
  Action?: 'ListProductByTags'
}

export interface RegisterDeviceParameters {
  Action?: 'RegisterDevice'
}

export interface QueryDeviceDetailParameters {
  Action?: 'QueryDeviceDetail'
}

export interface QueryDeviceParameters {
  Action?: 'QueryDevice'
}

export interface DeleteDeviceParameters {
  Action?: 'DeleteDevice'
}

export interface GetDeviceStatusParameters {
  Action?: 'GetDeviceStatus'
}

export interface BatchGetDeviceStateParameters {
  Action?: 'BatchGetDeviceState'
}

export interface DisableThingParameters {
  Action?: 'DisableThing'
}

export interface EnableThingParameters {
  Action?: 'EnableThing'
}

export interface BatchCheckDeviceNamesParameters {
  Action?: 'BatchCheckDeviceNames'
}

export interface BatchRegisterDeviceWithApplyIdParameters {
  Action?: 'BatchRegisterDeviceWithApplyId'
}

export interface BatchRegisterDeviceParameters {
  Action?: 'BatchRegisterDevice'
}

export interface QueryBatchRegisterDeviceStatusParameters {
  Action?: 'QueryBatchRegisterDeviceStatus'
}

export interface QueryPageByApplyIdParameters {
  Action?: 'QueryPageByApplyId'
}

export interface QueryDeviceEventDataParameters {
  Action?: 'QueryDeviceEventData'
}

export interface QueryDevicePropertyDataParameters {
  Action?: 'QueryDevicePropertyData'
}

export interface QueryDevicePropertiesDataParameters {
  Action?: 'QueryDevicePropertiesData'
}

export interface QueryDeviceServiceDataParameters {
  Action?: 'QueryDeviceServiceData'
}

export interface InvokeThingServiceParameters {
  Action?: 'InvokeThingService'
}

export interface InvokeThingsServiceParameters {
  Action?: 'InvokeThingsService'
}

export interface QueryDevicePropertyStatusParameters {
  Action?: 'QueryDevicePropertyStatus'
}

export interface SetDevicePropertyParameters {
  Action?: 'SetDeviceProperty'
}

export interface SetDevicesPropertyParameters {
  Action?: 'SetDevicesProperty'
}

export interface SaveDevicePropParameters {
  Action?: 'SaveDeviceProp'
}

export interface QueryDevicePropParameters {
  Action?: 'QueryDeviceProp'
}

export interface DeleteDevicePropParameters {
  Action?: 'DeleteDeviceProp'
}

export interface GetThingTopoParameters {
  Action?: 'GetThingTopo'
}

export interface NotifyAddThingTopoParameters {
  Action?: 'NotifyAddThingTopo'
}

export interface RemoveThingTopoParameters {
  Action?: 'RemoveThingTopo'
}

export interface QueryDeviceStatisticsParameters {
  Action?: 'QueryDeviceStatistics'
}

export interface GetGatewayBySubDeviceParameters {
  Action?: 'GetGatewayBySubDevice'
}

export interface QueryDeviceByTagsParameters {
  Action?: 'QueryDeviceByTags'
}

export interface SetDeviceDesiredPropertyParameters {
  Action?: 'SetDeviceDesiredProperty'
}

export interface QueryDeviceDesiredPropertyParameters {
  Action?: 'QueryDeviceDesiredProperty'
}

export interface QueryDeviceFileListParameters {
  Action?: 'QueryDeviceFileList'
}

export interface QueryDeviceFileParameters {
  Action?: 'QueryDeviceFile'
}

export interface DeleteDeviceFileParameters {
  Action?: 'DeleteDeviceFile'
}

export interface BatchUpdateDeviceNicknameParameters {
  Action?: 'BatchUpdateDeviceNickname'
}

export interface QueryLoRaJoinPermissionsParameters {
  Action?: 'QueryLoRaJoinPermissions'
}

export interface CreateLoRaNodesTaskParameters {
  Action?: 'CreateLoRaNodesTask'
}

export interface GetLoraNodesTaskParameters {
  Action?: 'GetLoraNodesTask'
}

export interface CreateDeviceGroupParameters {
  Action?: 'CreateDeviceGroup'
}

export interface DeleteDeviceGroupParameters {
  Action?: 'DeleteDeviceGroup'
}

export interface UpdateDeviceGroupParameters {
  Action?: 'UpdateDeviceGroup'
}

export interface QueryDeviceGroupInfoParameters {
  Action?: 'QueryDeviceGroupInfo'
}

export interface QueryDeviceGroupListParameters {
  Action?: 'QueryDeviceGroupList'
}

export interface BatchAddDeviceGroupRelationsParameters {
  Action?: 'BatchAddDeviceGroupRelations'
}

export interface BatchDeleteDeviceGroupRelationsParameters {
  Action?: 'BatchDeleteDeviceGroupRelations'
}

export interface SetDeviceGroupTagsParameters {
  Action?: 'SetDeviceGroupTags'
}

export interface QueryDeviceGroupTagListParameters {
  Action?: 'QueryDeviceGroupTagList'
}

export interface QueryDeviceGroupByDeviceParameters {
  Action?: 'QueryDeviceGroupByDevice'
}

export interface QuerySuperDeviceGroupParameters {
  Action?: 'QuerySuperDeviceGroup'
}

export interface QueryDeviceListByDeviceGroupParameters {
  Action?: 'QueryDeviceListByDeviceGroup'
}

export interface QueryDeviceGroupByTagsParameters {
  Action?: 'QueryDeviceGroupByTags'
}

export interface ListRuleParameters {
  Action?: 'ListRule'
}

export interface CreateRuleParameters {
  Action?: 'CreateRule'
}

export interface GetRuleParameters {
  Action?: 'GetRule'
}

export interface UpdateRuleParameters {
  Action?: 'UpdateRule'
}

export interface DeleteRuleParameters {
  Action?: 'DeleteRule'
}

export interface ListRuleActionsParameters {
  Action?: 'ListRuleActions'
}

export interface GetRuleActionParameters {
  Action?: 'GetRuleAction'
}

export interface CreateRuleActionParameters {
  Action?: 'CreateRuleAction'
}

export interface UpdateRuleActionParameters {
  Action?: 'UpdateRuleAction'
}

export interface DeleteRuleActionParameters {
  Action?: 'DeleteRuleAction'
}

export interface StartRuleParameters {
  Action?: 'StartRule'
}

export interface StopRuleParameters {
  Action?: 'StopRule'
}

export interface QueryProductTopicParameters {
  Action?: 'QueryProductTopic'
}

export interface CreateProductTopicParameters {
  Action?: 'CreateProductTopic'
}

export interface UpdateProductTopicParameters {
  Action?: 'UpdateProductTopic'
}

export interface DeleteProductTopicParameters {
  Action?: 'DeleteProductTopic'
}

export interface CreateTopicRouteTableParameters {
  Action?: 'CreateTopicRouteTable'
}

export interface QueryTopicRouteTableParameters {
  Action?: 'QueryTopicRouteTable'
}

export interface QueryTopicReverseRouteTableParameters {
  Action?: 'QueryTopicReverseRouteTable'
}

export interface DeleteTopicRouteTableParameters {
  Action?: 'DeleteTopicRouteTable'
}

export interface PubParameters {
  Action?: 'Pub'
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
  /**
   * 要发送的消息主体
   * 
   * 您需要将消息原文转换成二进制数据，并进行Base64编码，从而生成消息主体
   */
  MessageContent: string
  Qos?: 0 | 1
}

export interface RRpcParameters {
  Action?: 'RRpc'
  ProductKey: string
  DeviceName: string
  RequestBase64Byte: string
  Timeout: number
  Topic?: string
}

export interface PubBroadcastParameters {
  Action?: 'PubBroadcast'
  /** 要发送广播消息的产品 Key */
  ProductKey: string
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
  /**
   * 要发送的消息主体
   * 
   * 您需要将消息原文转换成二进制数据，并进行Base64编码，从而生成消息主体
   */
  MessageContent: string
}

export interface GetDeviceShadowParameters {
  Action?: 'GetDeviceShadow'
  ProductKey: string
  DeviceName: string
}

export interface UpdateDeviceShadowParameters {
  Action?: 'UpdateDeviceShadow'
  ProductKey: string
  DeviceName: string
  ShadowMessage: string
}
