
// 公用数据
import * as commonApi from './common'
 
import * as indexApi from './index'

// 企业、单位管理
import * as companyManagementApi from './companyManagement'

export default {
  ...commonApi, 
  ...indexApi,
  ...companyManagementApi
}
