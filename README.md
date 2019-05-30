# aliyun-iot-sdk
> ♥ 🇹🇸 纯 TypeScript 实现，提供完整声明文件

Aliyun Server Side IoT SDK for Node.js.（阿里云 IoT 服务端 SDK）

## 使用示例

```typescript
import { IoT } from 'aliyun-iot-sdk'

const iot = new IoT({
  accessKeyId: '<xxxxx>',
  accessKeySecret: '<xxxxx>',
  regionId: 'cn-shanghai'
})

iot.createProduct({
  ProductName: 'aliyun_iot_sdk_test',
  NodeType: 0,
  DataFormat: 0
})

```

## API 列表

- 产品管理
  - [x] createProduct
- 消息通信
  - [x] pub
  - [x] rRpc
  - [x] pubBroadcast
- 设备影子
  - [x] getDeviceShadow
  - [x] updateDeviceShadow
