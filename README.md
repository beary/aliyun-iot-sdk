# aliyun-iot-sdk
> ♥ 🇹🇸 纯 TypeScript 实现，提供完整声明文件

Aliyun Server Side IoT SDK for Node.js.（阿里云 IoT 服务端 Node.js SDK）

## 旧版 API
查看旧版 (0.0.5) API [点击此处](https://github.com/beary/aliyun-iot-sdk/tree/0.0.5#aliyun-iot-sdk)

## 使用示例

```typescript
import { Client } from 'aliyun-iot-sdk'

// 新建客户端
const client = new Client({
  accessKeyId: '<xxxxx>',
  accessKeySecret: '<xxxxx>',
  regionId: 'cn-shanghai'
})

// 调用接口
client.request({
  Action: 'GetDeviceShadow',
  DeviceName: 'test',
  ProductKey: 'test'
})
```

## API

### 新建客户端
- new Client()

### 发送请求
- Client.request(requestParameters)

  - requestParameters 请求参数，目前已经添加类型声明的接口在下面的列表中，对于没有添加类型声明的接口，使用 ts 时用 `as any` 过度
  - 返回值是一个 [axios](https://github.com/axios/axios) 的请求结果

## 声明文件完成进度

- 产品管理
  - [x] [createProduct](https://help.aliyun.com/document_detail/69123.html)
  - [ ] [updateProduct](https://help.aliyun.com/document_detail/69267.html)
  - [ ] [queryProductList](https://help.aliyun.com/document_detail/69271.html)
  - [ ] [queryProduct](https://help.aliyun.com/document_detail/69272.html)
  - [ ] [deleteProduct](https://help.aliyun.com/document_detail/89858.html)
  - [ ] [createProductTags](https://help.aliyun.com/document_detail/101839.html)
  - [ ] [updateProductTags](https://help.aliyun.com/document_detail/101862.html)
  - [ ] [deleteProductTags](https://help.aliyun.com/document_detail/101865.html)
  - [ ] [listProductTags](https://help.aliyun.com/document_detail/101869.html)
  - [ ] [listProductByTags](https://help.aliyun.com/document_detail/101872.html)
- 设备管理
  - [ ] [registerDevice](https://help.aliyun.com/document_detail/69470.html)
  - [ ] [queryDeviceDetail](https://help.aliyun.com/document_detail/69594.html)
  - [ ] [queryDevice](https://help.aliyun.com/document_detail/69905.html)
  - [ ] [deleteDevice](https://help.aliyun.com/document_detail/69281.html)
  - [ ] [getDeviceStatus](https://help.aliyun.com/document_detail/69617.html)
  - [ ] [batchGetDeviceState](https://help.aliyun.com/document_detail/69906.html)
  - [ ] [disableThing](https://help.aliyun.com/document_detail/69602.html)
  - [ ] [enableThing](https://help.aliyun.com/document_detail/69603.html)
  - [ ] [batchCheckDeviceNames](https://help.aliyun.com/document_detail/69482.html)
  - [ ] [batchRegisterDeviceWithApplyId](https://help.aliyun.com/document_detail/69514.html)
  - [ ] [batchRegisterDevice](https://help.aliyun.com/document_detail/69473.html)
  - [ ] [queryBatchRegisterDeviceStatus](https://help.aliyun.com/document_detail/69483.html)
  - [ ] [queryPageByApplyId](https://help.aliyun.com/document_detail/69518.html)
  - [ ] [queryDeviceEventData](https://help.aliyun.com/document_detail/69573.html)
  - [ ] [queryDevicePropertyData](https://help.aliyun.com/document_detail/69539.html)
  - [ ] [queryDevicePropertiesData](https://help.aliyun.com/document_detail/99237.html)
  - [ ] [queryDeviceServiceData](https://help.aliyun.com/document_detail/69574.html)
  - [ ] [invokeThingService](https://help.aliyun.com/document_detail/69584.html)
  - [ ] [invokeThingsService](https://help.aliyun.com/document_detail/96242.html)
  - [ ] [queryDevicePropertyStatus](https://help.aliyun.com/document_detail/69593.html)
  - [ ] [setDeviceProperty](https://help.aliyun.com/document_detail/69579.html)
  - [ ] [setDevicesProperty](https://help.aliyun.com/document_detail/96243.html)
  - [ ] [saveDeviceProp](https://help.aliyun.com/document_detail/69618.html)
  - [ ] [queryDeviceProp](https://help.aliyun.com/document_detail/69633.html)
  - [ ] [deleteDeviceProp](https://help.aliyun.com/document_detail/69635.html)
  - [ ] [getThingTopo](https://help.aliyun.com/document_detail/69770.html)
  - [ ] [notifyAddThingTopo](https://help.aliyun.com/document_detail/69771.html)
  - [ ] [removeThingTopo](https://help.aliyun.com/document_detail/69772.html)
  - [ ] [queryDeviceStatistics](https://help.aliyun.com/document_detail/69605.html)
  - [ ] [getGatewayBySubDevice](https://help.aliyun.com/document_detail/87257.html)
  - [ ] [queryDeviceByTags](https://help.aliyun.com/document_detail/96255.html)
  - [ ] [setDeviceDesiredProperty](https://help.aliyun.com/document_detail/107582.html)
  - [ ] [queryDeviceDesiredProperty](https://help.aliyun.com/document_detail/107582.html)
  - [ ] [queryDeviceFileList](https://help.aliyun.com/document_detail/112001.html)
  - [ ] [queryDeviceFile](https://help.aliyun.com/document_detail/112002.html)
  - [ ] [deleteDeviceFile](https://help.aliyun.com/document_detail/112003.html)
  - [ ] [batchUpdateDeviceNickname](https://help.aliyun.com/document_detail/112165.html)
  - [ ] [queryLoRaJoinPermissions](https://help.aliyun.com/document_detail/109293.html)
  - [ ] [createLoRaNodesTask](https://help.aliyun.com/document_detail/109299.html)
  - [ ] [getLoraNodesTask](https://help.aliyun.com/document_detail/109304.html)
- 分组管理
  - [ ] [createDeviceGroup](https://help.aliyun.com/document_detail/93350.html)
  - [ ] [deleteDeviceGroup](https://help.aliyun.com/document_detail/93353.html)
  - [ ] [updateDeviceGroup](https://help.aliyun.com/document_detail/93367.html)
  - [ ] [queryDeviceGroupInfo](https://help.aliyun.com/document_detail/93355.html)
  - [ ] [queryDeviceGroupList](https://help.aliyun.com/document_detail/93356.html)
  - [ ] [batchAddDeviceGroupRelations](https://help.aliyun.com/document_detail/93358.html)
  - [ ] [batchDeleteDeviceGroupRelations](https://help.aliyun.com/document_detail/93543.html)
  - [ ] [setDeviceGroupTags](https://help.aliyun.com/document_detail/93362.html)
  - [ ] [queryDeviceGroupTagList](https://help.aliyun.com/document_detail/93360.html)
  - [ ] [queryDeviceGroupByDevice](https://help.aliyun.com/document_detail/98199.html)
  - [ ] [querySuperDeviceGroup](https://help.aliyun.com/document_detail/99196.html)
  - [ ] [queryDeviceListByDeviceGroup](https://help.aliyun.com/document_detail/99310.html)
  - [ ] [queryDeviceGroupByTags](https://help.aliyun.com/document_detail/102323.html)
- 规则引擎
  - [ ] [listRule](https://help.aliyun.com/document_detail/69486.html)
  - [ ] [createRule](https://help.aliyun.com/document_detail/69495.html)
  - [ ] [getRule](https://help.aliyun.com/document_detail/69508.html)
  - [ ] [updateRule](https://help.aliyun.com/document_detail/69513.html)
  - [ ] [deleteRule](https://help.aliyun.com/document_detail/69516.html)
  - [ ] [listRuleActions](https://help.aliyun.com/document_detail/69517.html)
  - [ ] [getRuleAction](https://help.aliyun.com/document_detail/69519.html)
  - [ ] [createRuleAction](https://help.aliyun.com/document_detail/69586.html)
  - [ ] [updateRuleAction](https://help.aliyun.com/document_detail/69591.html)
  - [ ] [deleteRuleAction](https://help.aliyun.com/document_detail/69520.html)
  - [ ] [startRule](https://help.aliyun.com/document_detail/69666.html)
  - [ ] [stopRule](https://help.aliyun.com/document_detail/69667.html)
- Topic 管理
  - [ ] [queryProductTopic](https://help.aliyun.com/document_detail/69647.html)
  - [ ] [createProductTopic](https://help.aliyun.com/document_detail/69649.html)
  - [ ] [updateProductTopic](https://help.aliyun.com/document_detail/69650.html)
  - [ ] [deleteProductTopic](https://help.aliyun.com/document_detail/69648.html)
  - [ ] [createTopicRouteTable](https://help.aliyun.com/document_detail/69910.html)
  - [ ] [queryTopicRouteTable](https://help.aliyun.com/document_detail/69918.html)
  - [ ] [queryTopicReverseRouteTable](https://help.aliyun.com/document_detail/69922.html)
  - [ ] [deleteTopicRouteTable](https://help.aliyun.com/document_detail/69926.html)
- 消息通信
  - [x] [pub](https://help.aliyun.com/document_detail/69793.html)
  - [x] [rRpc](https://help.aliyun.com/document_detail/69797.html)
  - [x] [pubBroadcast](https://help.aliyun.com/document_detail/69909.html)
- 设备影子
  - [x] [getDeviceShadow](https://help.aliyun.com/document_detail/69953.html)
  - [x] [updateDeviceShadow](https://help.aliyun.com/document_detail/69954.html)
