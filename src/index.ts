import fetch from 'node-fetch'
import FormData from 'form-data'
import { sign } from './utils'
import {
  Format,
  Version,
  SignatureMethod,
  SignatureVersion,
  RegionId,
  CommonRequestParameters,
  CreateProductParameters,
  UpdateProductParameters,
  QueryProductListParameters,
  QueryProductParameters,
  DeleteProductParameters,
  CreateProductTagsParameters,
  UpdateProductTagsParameters,
  DeleteProductTagsParameters,
  ListProductTagsParameters,
  ListProductByTagsParameters,
  RegisterDeviceParameters,
  QueryDeviceDetailParameters,
  QueryDeviceParameters,
  DeleteDeviceParameters,
  GetDeviceStatusParameters,
  BatchGetDeviceStateParameters,
  DisableThingParameters,
  EnableThingParameters,
  BatchCheckDeviceNamesParameters,
  BatchRegisterDeviceWithApplyIdParameters,
  BatchRegisterDeviceParameters,
  QueryBatchRegisterDeviceStatusParameters,
  QueryPageByApplyIdParameters,
  QueryDeviceEventDataParameters,
  QueryDevicePropertyDataParameters,
  QueryDevicePropertiesDataParameters,
  QueryDeviceServiceDataParameters,
  InvokeThingServiceParameters,
  InvokeThingsServiceParameters,
  QueryDevicePropertyStatusParameters,
  SetDevicePropertyParameters,
  SetDevicesPropertyParameters,
  SaveDevicePropParameters,
  QueryDevicePropParameters,
  DeleteDevicePropParameters,
  GetThingTopoParameters,
  NotifyAddThingTopoParameters,
  RemoveThingTopoParameters,
  QueryDeviceStatisticsParameters,
  GetGatewayBySubDeviceParameters,
  QueryDeviceByTagsParameters,
  SetDeviceDesiredPropertyParameters,
  QueryDeviceDesiredPropertyParameters,
  QueryDeviceFileListParameters,
  QueryDeviceFileParameters,
  DeleteDeviceFileParameters,
  BatchUpdateDeviceNicknameParameters,
  QueryLoRaJoinPermissionsParameters,
  CreateLoRaNodesTaskParameters,
  GetLoraNodesTaskParameters,
  CreateDeviceGroupParameters,
  DeleteDeviceGroupParameters,
  UpdateDeviceGroupParameters,
  QueryDeviceGroupInfoParameters,
  QueryDeviceGroupListParameters,
  BatchAddDeviceGroupRelationsParameters,
  BatchDeleteDeviceGroupRelationsParameters,
  SetDeviceGroupTagsParameters,
  QueryDeviceGroupTagListParameters,
  QueryDeviceGroupByDeviceParameters,
  QuerySuperDeviceGroupParameters,
  QueryDeviceListByDeviceGroupParameters,
  QueryDeviceGroupByTagsParameters,
  ListRuleParameters,
  CreateRuleParameters,
  GetRuleParameters,
  UpdateRuleParameters,
  DeleteRuleParameters,
  ListRuleActionsParameters,
  GetRuleActionParameters,
  CreateRuleActionParameters,
  UpdateRuleActionParameters,
  DeleteRuleActionParameters,
  StartRuleParameters,
  StopRuleParameters,
  QueryProductTopicParameters,
  CreateProductTopicParameters,
  UpdateProductTopicParameters,
  DeleteProductTopicParameters,
  CreateTopicRouteTableParameters,
  QueryTopicRouteTableParameters,
  QueryTopicReverseRouteTableParameters,
  DeleteTopicRouteTableParameters,
  PubParameters,
  RRpcParameters,
  PubBroadcastParameters,
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
    const { Timestamp, ...requestParams } = sign(params, this.accessKeySecret)
    const form = new FormData()
    // 使用 POST 请求时，请求参数中的时间戳不进行 URL 编码
    form.append('Timestamp', decodeURIComponent(Timestamp))
    Object.keys(requestParams)
      .forEach(k => form.append(k, requestParams[k]))
    return fetch(this.endpoint, {
      method: 'POST',
      body: form
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
      // 文档没说，但是从返回的报错信息来看，签名字符串中的时间戳要进行 URL 编码
      Timestamp: encodeURIComponent(new Date().toISOString()),
      SignatureVersion: this.signatureVersion,
      SignatureNonce: `${new Date().getTime()}`,
      RegionId: this.regionId
    }, requestParameters)
  }

  /**
   * 新建产品
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69123.html
   */
  public createProduct(createProductParams: CreateProductParameters) {
    createProductParams.Action = 'CreateProduct'
    const params = this.__mergeRequestParameters(createProductParams)
    return this.__request(params)
  }

  /**
   * 修改指定产品的信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69267.html
   */
  public updateProduct(updateProductParams: UpdateProductParameters) {
    updateProductParams.Action = 'UpdateProduct'
    const params = this.__mergeRequestParameters(updateProductParams)
    return this.__request(params)
  }

  /**
   * 查看所有产品列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69271.html
   */
  public queryProductList(queryProductListParams: QueryProductListParameters) {
    queryProductListParams.Action = 'QueryProductList'
    const params = this.__mergeRequestParameters(queryProductListParams)
    return this.__request(params)
  }

  /**
   * 查询指定产品的详细信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69272.html
   */
  public queryProduct(queryProductParams: QueryProductParameters) {
    queryProductParams.Action = 'QueryProduct'
    const params = this.__mergeRequestParameters(queryProductParams)
    return this.__request(params)
  }

  /**
   * 删除指定产品
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/89858.html
   */
  public deleteProduct(deleteProductParams: DeleteProductParameters) {
    deleteProductParams.Action = 'DeleteProduct'
    const params = this.__mergeRequestParameters(deleteProductParams)
    return this.__request(params)
  }

  /**
   * 为指定产品创建标签
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/101839.html
   */
  public createProductTags(createProductTagsParams: CreateProductTagsParameters) {
    createProductTagsParams.Action = 'CreateProductTags'
    const params = this.__mergeRequestParameters(createProductTagsParams)
    return this.__request(params)
  }

  /**
   * 更新产品标签
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/101862.html
   */
  public updateProductTags(updateProductTagsParams: UpdateProductTagsParameters) {
    updateProductTagsParams.Action = 'UpdateProductTags'
    const params = this.__mergeRequestParameters(updateProductTagsParams)
    return this.__request(params)
  }

  /**
   * 删除产品标签
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/101865.html
   */
  public deleteProductTags(deleteProductTagsParams: DeleteProductTagsParameters) {
    deleteProductTagsParams.Action = 'DeleteProductTags'
    const params = this.__mergeRequestParameters(deleteProductTagsParams)
    return this.__request(params)
  }

  /**
   * 查询指定产品的所有标签
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/101869.html
   */
  public listProductTags(listProductTagsParams: ListProductTagsParameters) {
    listProductTagsParams.Action = 'ListProductTags'
    const params = this.__mergeRequestParameters(listProductTagsParams)
    return this.__request(params)
  }

  /**
   * 根据标签分页查询产品列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/101872.html
   */
  public listProductByTags(listProductByTagsParams: ListProductByTagsParameters) {
    listProductByTagsParams.Action = 'ListProductByTags'
    const params = this.__mergeRequestParameters(listProductByTagsParams)
    return this.__request(params)
  }

  /**
   * 在指定产品下注册设备
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69470.html
   */
  public registerDevice(registerDeviceParams: RegisterDeviceParameters) {
    registerDeviceParams.Action = 'RegisterDevice'
    const params = this.__mergeRequestParameters(registerDeviceParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备的详细信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69594.html
   */
  public queryDeviceDetail(queryDeviceDetailParams: QueryDeviceDetailParameters) {
    queryDeviceDetailParams.Action = 'QueryDeviceDetail'
    const params = this.__mergeRequestParameters(queryDeviceDetailParams)
    return this.__request(params)
  }

  /**
   * 查询指定产品下的所有设备列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69905.html
   */
  public queryDevice(queryDeviceParams: QueryDeviceParameters) {
    queryDeviceParams.Action = 'QueryDevice'
    const params = this.__mergeRequestParameters(queryDeviceParams)
    return this.__request(params)
  }

  /**
   * 删除指定设备
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69281.html
   */
  public deleteDevice(deleteDeviceParams: DeleteDeviceParameters) {
    deleteDeviceParams.Action = 'DeleteDevice'
    const params = this.__mergeRequestParameters(deleteDeviceParams)
    return this.__request(params)
  }

  /**
   * 查看指定设备的运行状态
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69617.html
   */
  public getDeviceStatus(getDeviceStatusParams: GetDeviceStatusParameters) {
    getDeviceStatusParams.Action = 'GetDeviceStatus'
    const params = this.__mergeRequestParameters(getDeviceStatusParams)
    return this.__request(params)
  }

  /**
   * 批量查看同一产品下指定设备的运行状态
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69906.html
   */
  public batchGetDeviceState(batchGetDeviceStateParams: BatchGetDeviceStateParameters) {
    batchGetDeviceStateParams.Action = 'BatchGetDeviceState'
    const params = this.__mergeRequestParameters(batchGetDeviceStateParams)
    return this.__request(params)
  }

  /**
   * 禁用指定设备
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69602.html
   */
  public disableThing(disableThingParams: DisableThingParameters) {
    disableThingParams.Action = 'DisableThing'
    const params = this.__mergeRequestParameters(disableThingParams)
    return this.__request(params)
  }

  /**
   * 解除指定设备的禁用状态，即启用被禁用的设备
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69603.html
   */
  public enableThing(enableThingParams: EnableThingParameters) {
    enableThingParams.Action = 'EnableThing'
    const params = this.__mergeRequestParameters(enableThingParams)
    return this.__request(params)
  }

  /**
   * 在指定产品下批量自定义设备名称。IoT平台将检查名称的合法性
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69482.html
   */
  public batchCheckDeviceNames(batchCheckDeviceNamesParams: BatchCheckDeviceNamesParameters) {
    batchCheckDeviceNamesParams.Action = 'BatchCheckDeviceNames'
    const params = this.__mergeRequestParameters(batchCheckDeviceNamesParams)
    return this.__request(params)
  }

  /**
   * 根据申请批次ID（ApplyId）批量注册设备
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69514.html
   */
  public batchRegisterDeviceWithApplyId(batchRegisterDeviceWithApplyIdParams: BatchRegisterDeviceWithApplyIdParameters) {
    batchRegisterDeviceWithApplyIdParams.Action = 'BatchRegisterDeviceWithApplyId'
    const params = this.__mergeRequestParameters(batchRegisterDeviceWithApplyIdParams)
    return this.__request(params)
  }

  /**
   * 在指定产品下批量注册多个设备（随机生成设备名）
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69473.html
   */
  public batchRegisterDevice(batchRegisterDeviceParams: BatchRegisterDeviceParameters) {
    batchRegisterDeviceParams.Action = 'BatchRegisterDevice'
    const params = this.__mergeRequestParameters(batchRegisterDeviceParams)
    return this.__request(params)
  }

  /**
   * 查询批量注册设备申请的处理状态和结果
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69483.html
   */
  public queryBatchRegisterDeviceStatus(queryBatchRegisterDeviceStatusParams: QueryBatchRegisterDeviceStatusParameters) {
    queryBatchRegisterDeviceStatusParams.Action = 'QueryBatchRegisterDeviceStatus'
    const params = this.__mergeRequestParameters(queryBatchRegisterDeviceStatusParams)
    return this.__request(params)
  }

  /**
   * 查询批量注册的设备信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69518.html
   */
  public queryPageByApplyId(queryPageByApplyIdParams: QueryPageByApplyIdParameters) {
    queryPageByApplyIdParams.Action = 'QueryPageByApplyId'
    const params = this.__mergeRequestParameters(queryPageByApplyIdParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备的事件记录
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69573.html
   */
  public queryDeviceEventData(queryDeviceEventDataParams: QueryDeviceEventDataParameters) {
    queryDeviceEventDataParams.Action = 'QueryDeviceEventData'
    const params = this.__mergeRequestParameters(queryDeviceEventDataParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备的属性记录
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69539.html
   */
  public queryDevicePropertyData(queryDevicePropertyDataParams: QueryDevicePropertyDataParameters) {
    queryDevicePropertyDataParams.Action = 'QueryDevicePropertyData'
    const params = this.__mergeRequestParameters(queryDevicePropertyDataParams)
    return this.__request(params)
  }

  /**
   * 批量查询指定设备的属性上报数据
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/99237.html
   */
  public queryDevicePropertiesData(queryDevicePropertiesDataParams: QueryDevicePropertiesDataParameters) {
    queryDevicePropertiesDataParams.Action = 'QueryDevicePropertiesData'
    const params = this.__mergeRequestParameters(queryDevicePropertiesDataParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备的服务调用记录
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69574.html
   */
  public queryDeviceServiceData(queryDeviceServiceDataParams: QueryDeviceServiceDataParameters) {
    queryDeviceServiceDataParams.Action = 'QueryDeviceServiceData'
    const params = this.__mergeRequestParameters(queryDeviceServiceDataParams)
    return this.__request(params)
  }

  /**
   * 在一个设备上调用指定服务
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69584.html
   */
  public invokeThingService(invokeThingServiceParams: InvokeThingServiceParameters) {
    invokeThingServiceParams.Action = 'InvokeThingService'
    const params = this.__mergeRequestParameters(invokeThingServiceParams)
    return this.__request(params)
  }

  /**
   * 批量调用设备服务
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/96242.html
   */
  public invokeThingsService(invokeThingsServiceParams: InvokeThingsServiceParameters) {
    invokeThingsServiceParams.Action = 'InvokeThingsService'
    const params = this.__mergeRequestParameters(invokeThingsServiceParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备的属性快照
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69593.html
   */
  public queryDevicePropertyStatus(queryDevicePropertyStatusParams: QueryDevicePropertyStatusParameters) {
    queryDevicePropertyStatusParams.Action = 'QueryDevicePropertyStatus'
    const params = this.__mergeRequestParameters(queryDevicePropertyStatusParams)
    return this.__request(params)
  }

  /**
   * 为指定设备设置属性值
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69579.html
   */
  public setDeviceProperty(setDevicePropertyParams: SetDevicePropertyParameters) {
    setDevicePropertyParams.Action = 'SetDeviceProperty'
    const params = this.__mergeRequestParameters(setDevicePropertyParams)
    return this.__request(params)
  }

  /**
   * 批量设置设备属性值
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/96243.html
   */
  public setDevicesProperty(setDevicesPropertyParams: SetDevicesPropertyParameters) {
    setDevicesPropertyParams.Action = 'SetDevicesProperty'
    const params = this.__mergeRequestParameters(setDevicesPropertyParams)
    return this.__request(params)
  }

  /**
   * 为指定设备设置标签
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69618.html
   */
  public saveDeviceProp(saveDevicePropParams: SaveDevicePropParameters) {
    saveDevicePropParams.Action = 'SaveDeviceProp'
    const params = this.__mergeRequestParameters(saveDevicePropParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备的标签列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69633.html
   */
  public queryDeviceProp(queryDevicePropParams: QueryDevicePropParameters) {
    queryDevicePropParams.Action = 'QueryDeviceProp'
    const params = this.__mergeRequestParameters(queryDevicePropParams)
    return this.__request(params)
  }

  /**
   * 删除设备下的指定标签
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69635.html
   */
  public deleteDeviceProp(deleteDevicePropParams: DeleteDevicePropParameters) {
    deleteDevicePropParams.Action = 'DeleteDeviceProp'
    const params = this.__mergeRequestParameters(deleteDevicePropParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备的拓扑关系
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69770.html
   */
  public getThingTopo(getThingTopoParams: GetThingTopoParameters) {
    getThingTopoParams.Action = 'GetThingTopo'
    const params = this.__mergeRequestParameters(getThingTopoParams)
    return this.__request(params)
  }

  /**
   * 通知网关设备增加拓扑关系
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69771.html
   */
  public notifyAddThingTopo(notifyAddThingTopoParams: NotifyAddThingTopoParameters) {
    notifyAddThingTopoParams.Action = 'NotifyAddThingTopo'
    const params = this.__mergeRequestParameters(notifyAddThingTopoParams)
    return this.__request(params)
  }

  /**
   * 移除网关与子设备的拓扑关系
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69772.html
   */
  public removeThingTopo(removeThingTopoParams: RemoveThingTopoParameters) {
    removeThingTopoParams.Action = 'RemoveThingTopo'
    const params = this.__mergeRequestParameters(removeThingTopoParams)
    return this.__request(params)
  }

  /**
   * 查询设备统计数据
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69605.html
   */
  public queryDeviceStatistics(queryDeviceStatisticsParams: QueryDeviceStatisticsParameters) {
    queryDeviceStatisticsParams.Action = 'QueryDeviceStatistics'
    const params = this.__mergeRequestParameters(queryDeviceStatisticsParams)
    return this.__request(params)
  }

  /**
   * ，根据挂载的子设备信息，查询对应的网关设备信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/87257.html
   */
  public getGatewayBySubDevice(getGatewayBySubDeviceParams: GetGatewayBySubDeviceParameters) {
    getGatewayBySubDeviceParams.Action = 'GetGatewayBySubDevice'
    const params = this.__mergeRequestParameters(getGatewayBySubDeviceParams)
    return this.__request(params)
  }

  /**
   * 通过标签查询设备
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/96255.html
   */
  public queryDeviceByTags(queryDeviceByTagsParams: QueryDeviceByTagsParameters) {
    queryDeviceByTagsParams.Action = 'QueryDeviceByTags'
    const params = this.__mergeRequestParameters(queryDeviceByTagsParams)
    return this.__request(params)
  }

  /**
   * 为指定设备批量设置期望属性值
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/107582.html
   */
  public setDeviceDesiredProperty(setDeviceDesiredPropertyParams: SetDeviceDesiredPropertyParameters) {
    setDeviceDesiredPropertyParams.Action = 'SetDeviceDesiredProperty'
    const params = this.__mergeRequestParameters(setDeviceDesiredPropertyParams)
    return this.__request(params)
  }

  /**
   * 为指定设备批量设置期望属性值
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/107582.html
   */
  public queryDeviceDesiredProperty(queryDeviceDesiredPropertyParams: QueryDeviceDesiredPropertyParameters) {
    queryDeviceDesiredPropertyParams.Action = 'QueryDeviceDesiredProperty'
    const params = this.__mergeRequestParameters(queryDeviceDesiredPropertyParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备上传到物联网平台的所有文件列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/112001.html
   */
  public queryDeviceFileList(queryDeviceFileListParams: QueryDeviceFileListParameters) {
    queryDeviceFileListParams.Action = 'QueryDeviceFileList'
    const params = this.__mergeRequestParameters(queryDeviceFileListParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备上传到物联网平台的指定文件信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/112002.html
   */
  public queryDeviceFile(queryDeviceFileParams: QueryDeviceFileParameters) {
    queryDeviceFileParams.Action = 'QueryDeviceFile'
    const params = this.__mergeRequestParameters(queryDeviceFileParams)
    return this.__request(params)
  }

  /**
   * 删除指定设备上传到物联网平台的指定文件
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/112003.html
   */
  public deleteDeviceFile(deleteDeviceFileParams: DeleteDeviceFileParameters) {
    deleteDeviceFileParams.Action = 'DeleteDeviceFile'
    const params = this.__mergeRequestParameters(deleteDeviceFileParams)
    return this.__request(params)
  }

  /**
   * 批量修改设备备注名称
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/112165.html
   */
  public batchUpdateDeviceNickname(batchUpdateDeviceNicknameParams: BatchUpdateDeviceNicknameParameters) {
    batchUpdateDeviceNicknameParams.Action = 'BatchUpdateDeviceNickname'
    const params = this.__mergeRequestParameters(batchUpdateDeviceNicknameParams)
    return this.__request(params)
  }

  /**
   * 查询LoRaWAN入网凭证列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/109293.html
   */
  public queryLoRaJoinPermissions(queryLoRaJoinPermissionsParams: QueryLoRaJoinPermissionsParameters) {
    queryLoRaJoinPermissionsParams.Action = 'QueryLoRaJoinPermissions'
    const params = this.__mergeRequestParameters(queryLoRaJoinPermissionsParams)
    return this.__request(params)
  }

  /**
   * 生成批量注册LoRaWAN设备的任务
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/109299.html
   */
  public createLoRaNodesTask(createLoRaNodesTaskParams: CreateLoRaNodesTaskParameters) {
    createLoRaNodesTaskParams.Action = 'CreateLoRaNodesTask'
    const params = this.__mergeRequestParameters(createLoRaNodesTaskParams)
    return this.__request(params)
  }

  /**
   * 查询批量注册LoRaWAN设备任务的状态
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/109304.html
   */
  public getLoraNodesTask(getLoraNodesTaskParams: GetLoraNodesTaskParameters) {
    getLoraNodesTaskParams.Action = 'GetLoraNodesTask'
    const params = this.__mergeRequestParameters(getLoraNodesTaskParams)
    return this.__request(params)
  }

  /**
   * 新建分组
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/93350.html
   */
  public createDeviceGroup(createDeviceGroupParams: CreateDeviceGroupParameters) {
    createDeviceGroupParams.Action = 'CreateDeviceGroup'
    const params = this.__mergeRequestParameters(createDeviceGroupParams)
    return this.__request(params)
  }

  /**
   * 删除指定分组
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/93353.html
   */
  public deleteDeviceGroup(deleteDeviceGroupParams: DeleteDeviceGroupParameters) {
    deleteDeviceGroupParams.Action = 'DeleteDeviceGroup'
    const params = this.__mergeRequestParameters(deleteDeviceGroupParams)
    return this.__request(params)
  }

  /**
   * 修改分组信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/93367.html
   */
  public updateDeviceGroup(updateDeviceGroupParams: UpdateDeviceGroupParameters) {
    updateDeviceGroupParams.Action = 'UpdateDeviceGroup'
    const params = this.__mergeRequestParameters(updateDeviceGroupParams)
    return this.__request(params)
  }

  /**
   * 查询分组详情
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/93355.html
   */
  public queryDeviceGroupInfo(queryDeviceGroupInfoParams: QueryDeviceGroupInfoParameters) {
    queryDeviceGroupInfoParams.Action = 'QueryDeviceGroupInfo'
    const params = this.__mergeRequestParameters(queryDeviceGroupInfoParams)
    return this.__request(params)
  }

  /**
   * 分页查询分组列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/93356.html
   */
  public queryDeviceGroupList(queryDeviceGroupListParams: QueryDeviceGroupListParameters) {
    queryDeviceGroupListParams.Action = 'QueryDeviceGroupList'
    const params = this.__mergeRequestParameters(queryDeviceGroupListParams)
    return this.__request(params)
  }

  /**
   * 添加设备到某一分组（可批量添加设备）
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/93358.html
   */
  public batchAddDeviceGroupRelations(batchAddDeviceGroupRelationsParams: BatchAddDeviceGroupRelationsParameters) {
    batchAddDeviceGroupRelationsParams.Action = 'BatchAddDeviceGroupRelations'
    const params = this.__mergeRequestParameters(batchAddDeviceGroupRelationsParams)
    return this.__request(params)
  }

  /**
   * 批量删除指定分组中的设备。（只删除设备与分组的关联关系，不会删除设备本身。
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/93543.html
   */
  public batchDeleteDeviceGroupRelations(batchDeleteDeviceGroupRelationsParams: BatchDeleteDeviceGroupRelationsParameters) {
    batchDeleteDeviceGroupRelationsParams.Action = 'BatchDeleteDeviceGroupRelations'
    const params = this.__mergeRequestParameters(batchDeleteDeviceGroupRelationsParams)
    return this.__request(params)
  }

  /**
   * 添加、更新、或删除分组标签
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/93362.html
   */
  public setDeviceGroupTags(setDeviceGroupTagsParams: SetDeviceGroupTagsParameters) {
    setDeviceGroupTagsParams.Action = 'SetDeviceGroupTags'
    const params = this.__mergeRequestParameters(setDeviceGroupTagsParams)
    return this.__request(params)
  }

  /**
   * 查询分组标签列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/93360.html
   */
  public queryDeviceGroupTagList(queryDeviceGroupTagListParams: QueryDeviceGroupTagListParameters) {
    queryDeviceGroupTagListParams.Action = 'QueryDeviceGroupTagList'
    const params = this.__mergeRequestParameters(queryDeviceGroupTagListParams)
    return this.__request(params)
  }

  /**
   * 查询某一设备所在的分组列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/98199.html
   */
  public queryDeviceGroupByDevice(queryDeviceGroupByDeviceParams: QueryDeviceGroupByDeviceParameters) {
    queryDeviceGroupByDeviceParams.Action = 'QueryDeviceGroupByDevice'
    const params = this.__mergeRequestParameters(queryDeviceGroupByDeviceParams)
    return this.__request(params)
  }

  /**
   * 根据子分组ID查询父分组信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/99196.html
   */
  public querySuperDeviceGroup(querySuperDeviceGroupParams: QuerySuperDeviceGroupParameters) {
    querySuperDeviceGroupParams.Action = 'QuerySuperDeviceGroup'
    const params = this.__mergeRequestParameters(querySuperDeviceGroupParams)
    return this.__request(params)
  }

  /**
   * 查询分组中的设备列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/99310.html
   */
  public queryDeviceListByDeviceGroup(queryDeviceListByDeviceGroupParams: QueryDeviceListByDeviceGroupParameters) {
    queryDeviceListByDeviceGroupParams.Action = 'QueryDeviceListByDeviceGroup'
    const params = this.__mergeRequestParameters(queryDeviceListByDeviceGroupParams)
    return this.__request(params)
  }

  /**
   * 根据标签查询设备分组
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/102323.html
   */
  public queryDeviceGroupByTags(queryDeviceGroupByTagsParams: QueryDeviceGroupByTagsParameters) {
    queryDeviceGroupByTagsParams.Action = 'QueryDeviceGroupByTags'
    const params = this.__mergeRequestParameters(queryDeviceGroupByTagsParams)
    return this.__request(params)
  }

  /**
   * 分页查询所有规则列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69486.html
   */
  public listRule(listRuleParams: ListRuleParameters) {
    listRuleParams.Action = 'ListRule'
    const params = this.__mergeRequestParameters(listRuleParams)
    return this.__request(params)
  }

  /**
   * 对指定Topic新建一个规则
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69495.html
   */
  public createRule(createRuleParams: CreateRuleParameters) {
    createRuleParams.Action = 'CreateRule'
    const params = this.__mergeRequestParameters(createRuleParams)
    return this.__request(params)
  }

  /**
   * 查询指定规则的详细信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69508.html
   */
  public getRule(getRuleParams: GetRuleParameters) {
    getRuleParams.Action = 'GetRule'
    const params = this.__mergeRequestParameters(getRuleParams)
    return this.__request(params)
  }

  /**
   * 修改指定的规则
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69513.html
   */
  public updateRule(updateRuleParams: UpdateRuleParameters) {
    updateRuleParams.Action = 'UpdateRule'
    const params = this.__mergeRequestParameters(updateRuleParams)
    return this.__request(params)
  }

  /**
   * 删除指定的规则
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69516.html
   */
  public deleteRule(deleteRuleParams: DeleteRuleParameters) {
    deleteRuleParams.Action = 'DeleteRule'
    const params = this.__mergeRequestParameters(deleteRuleParams)
    return this.__request(params)
  }

  /**
   * 查询指定规则下的所有规则动作列表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69517.html
   */
  public listRuleActions(listRuleActionsParams: ListRuleActionsParameters) {
    listRuleActionsParams.Action = 'ListRuleActions'
    const params = this.__mergeRequestParameters(listRuleActionsParams)
    return this.__request(params)
  }

  /**
   * 查询指定规则动作的详细信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69519.html
   */
  public getRuleAction(getRuleActionParams: GetRuleActionParameters) {
    getRuleActionParams.Action = 'GetRuleAction'
    const params = this.__mergeRequestParameters(getRuleActionParams)
    return this.__request(params)
  }

  /**
   * 在指定的规则下创建一个规则动作，定义将处理后的Topic数据转发至物联网平台的其他Topic或所支持的其他阿里云服务
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69586.html
   */
  public createRuleAction(createRuleActionParams: CreateRuleActionParameters) {
    createRuleActionParams.Action = 'CreateRuleAction'
    const params = this.__mergeRequestParameters(createRuleActionParams)
    return this.__request(params)
  }

  /**
   * 修改指定的规则动作
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69591.html
   */
  public updateRuleAction(updateRuleActionParams: UpdateRuleActionParameters) {
    updateRuleActionParams.Action = 'UpdateRuleAction'
    const params = this.__mergeRequestParameters(updateRuleActionParams)
    return this.__request(params)
  }

  /**
   * 删除指定的规则动作
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69520.html
   */
  public deleteRuleAction(deleteRuleActionParams: DeleteRuleActionParameters) {
    deleteRuleActionParams.Action = 'DeleteRuleAction'
    const params = this.__mergeRequestParameters(deleteRuleActionParams)
    return this.__request(params)
  }

  /**
   * 启动指定的规则
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69666.html
   */
  public startRule(startRuleParams: StartRuleParameters) {
    startRuleParams.Action = 'StartRule'
    const params = this.__mergeRequestParameters(startRuleParams)
    return this.__request(params)
  }

  /**
   * 停止指定的规则
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69667.html
   */
  public stopRule(stopRuleParams: StopRuleParameters) {
    stopRuleParams.Action = 'StopRule'
    const params = this.__mergeRequestParameters(stopRuleParams)
    return this.__request(params)
  }

  /**
   * 查询指定产品的Topic类
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69647.html
   */
  public queryProductTopic(queryProductTopicParams: QueryProductTopicParameters) {
    queryProductTopicParams.Action = 'QueryProductTopic'
    const params = this.__mergeRequestParameters(queryProductTopicParams)
    return this.__request(params)
  }

  /**
   * 为指定产品创建产品Topic类
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69649.html
   */
  public createProductTopic(createProductTopicParams: CreateProductTopicParameters) {
    createProductTopicParams.Action = 'CreateProductTopic'
    const params = this.__mergeRequestParameters(createProductTopicParams)
    return this.__request(params)
  }

  /**
   * 修改指定的产品Topic类
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69650.html
   */
  public updateProductTopic(updateProductTopicParams: UpdateProductTopicParameters) {
    updateProductTopicParams.Action = 'UpdateProductTopic'
    const params = this.__mergeRequestParameters(updateProductTopicParams)
    return this.__request(params)
  }

  /**
   * 删除指定的Topic类
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69648.html
   */
  public deleteProductTopic(deleteProductTopicParams: DeleteProductTopicParameters) {
    deleteProductTopicParams.Action = 'DeleteProductTopic'
    const params = this.__mergeRequestParameters(deleteProductTopicParams)
    return this.__request(params)
  }

  /**
   * 新建Topic间的消息路由关系
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69910.html
   */
  public createTopicRouteTable(createTopicRouteTableParams: CreateTopicRouteTableParameters) {
    createTopicRouteTableParams.Action = 'CreateTopicRouteTable'
    const params = this.__mergeRequestParameters(createTopicRouteTableParams)
    return this.__request(params)
  }

  /**
   * 查询向指定Topic订阅消息的目标Topic，即指定Topic的路由表。该接口只支持查询用户的Topic
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69918.html
   */
  public queryTopicRouteTable(queryTopicRouteTableParams: QueryTopicRouteTableParameters) {
    queryTopicRouteTableParams.Action = 'QueryTopicRouteTable'
    const params = this.__mergeRequestParameters(queryTopicRouteTableParams)
    return this.__request(params)
  }

  /**
   * 查询指定Topic订阅的源Topic，即反向路由表
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69922.html
   */
  public queryTopicReverseRouteTable(queryTopicReverseRouteTableParams: QueryTopicReverseRouteTableParameters) {
    queryTopicReverseRouteTableParams.Action = 'QueryTopicReverseRouteTable'
    const params = this.__mergeRequestParameters(queryTopicReverseRouteTableParams)
    return this.__request(params)
  }

  /**
   * 删除指定的Topic路由关系
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69926.html
   */
  public deleteTopicRouteTable(deleteTopicRouteTableParams: DeleteTopicRouteTableParameters) {
    deleteTopicRouteTableParams.Action = 'DeleteTopicRouteTable'
    const params = this.__mergeRequestParameters(deleteTopicRouteTableParams)
    return this.__request(params)
  }

  /**
   * 向指定Topic发布消息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69793.html
   */
  public pub(pubParams: PubParameters) {
    pubParams.Action = 'Pub'
    const params = this.__mergeRequestParameters(pubParams)
    return this.__request(params)
  }

  /**
   * 向指定设备发送请求消息，并同步返回响应
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69797.html
   */
  public rRpc(rRpcParams: RRpcParameters) {
    rRpcParams.Action = 'RRpc'
    const params = this.__mergeRequestParameters(rRpcParams)
    return this.__request(params)
  }

  /**
   * 向订阅了指定Topic的所有设备发布广播消息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69909.html
   */
  public pubBroadcast(pubBroadcastParams: PubBroadcastParameters) {
    pubBroadcastParams.Action = 'PubBroadcast'
    const params = this.__mergeRequestParameters(pubBroadcastParams)
    return this.__request(params)
  }

  /**
   * 查询指定设备的影子信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69953.html
   */
  public getDeviceShadow(getDeviceShadowParams: GetDeviceShadowParameters) {
    getDeviceShadowParams.Action = 'GetDeviceShadow'
    const params = this.__mergeRequestParameters(getDeviceShadowParams)
    return this.__request(params)
  }

  /**
   * 修改指定设备的影子信息
   * @param pubParams 参考文档 https://help.aliyun.com/document_detail/69954.html
   */
  public updateDeviceShadow(updateDeviceShadowParams: UpdateDeviceShadowParameters) {
    updateDeviceShadowParams.Action = 'UpdateDeviceShadow'
    const params = this.__mergeRequestParameters(updateDeviceShadowParams)
    return this.__request(params)
  }
}
