import React from 'react'
import { List, Tag } from 'antd'
import styles from './index.module.less'
import moment from 'moment'
import { ListProps } from '../type'
import { getName } from '@/utils'
import { useStore } from '@/store'

const CommonPolicyList: React.FC<ListProps> = ({ dataList, title, setSearchValue, searchValue }) => {
  const { areaNames } = useStore()

  const jumpUrl = (item: any) => {
    window.open(item.policyUrl || item?.url, '_blank')
  }

  const showTotal = (total: number) => `共 ${total} 条`

  return (
    <div>
      <List
        itemLayout='horizontal'
        dataSource={dataList}
        pagination={
          title === 'policy'
            ? {
                onChange: (page, size) => {
                  console.log(page)
                  setSearchValue({ ...searchValue, pageNo: page, pageSize: size })
                },
                pageSize: 10,
                total: dataList?.total,
                showTotal,
                showSizeChanger: true,
                showQuickJumper: true
              }
            : false
        }
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <span className={styles.rightTitle}>{`时间：${moment(item?.createTime).format('YYYY-MM-DD')}`}</span>,
              <span className={styles.rightTitle}>{`来源：${item?.issuingAuthority || item?.urlSource}`}</span>
            ]}
            onClick={() => jumpUrl(item)}
          >
            <List.Item.Meta
              title={<span className={styles.leftTitle}>{item?.policyName || item?.urlText}</span>}
              description={
                <>
                  {(item?.involveIndustrialChain || item?.policyLevelText) && (
                    <Tag color='orange'>{item?.involveIndustrialChain || item?.policyLevelText}</Tag>
                  )}
                  {(item?.policyType || item?.policyTypeText) && (
                    <Tag color='orange'>{item?.policyType || item?.policyTypeText}</Tag>
                  )}
                  {(item?.area || item?.provincialRegion) && (
                    <Tag color='orange'>{item?.area || item?.provincialRegion}</Tag>
                  )}
                  {(item?.policyContentSummary || item?.declarationTypeText) && (
                    <Tag color='orange'>{item?.policyContentSummary || item?.declarationTypeText}</Tag>
                  )}
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default CommonPolicyList
