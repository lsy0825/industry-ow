import React, { useState } from 'react'
import { List, Modal, Tag } from 'antd'
import styles from './index.module.less'
import moment from 'moment'
import { ListProps } from '../type'
import Detail from './detail'

const CommonPolicyList: React.FC<ListProps> = ({ dataList, title, setSearchValue, searchValue }) => {
  //   const [isModalOpen, setIsModalOpen] = useState<any>({ type: false, record: {} })
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
                total: dataList.length,
                showTotal,
                showSizeChanger: true,
                showQuickJumper: true
              }
            : false
        }
        renderItem={item => (
          <List.Item
            actions={[
              <span className={styles.rightTitle}>{`时间：${item.time}`}</span>,
              <span className={styles.rightTitle}>{`来源：${item.source}`}</span>
            ]}
            //   onClick={() => setIsModalOpen(true)}
          >
            <List.Item.Meta
              title={<span className={styles.leftTitle}>{item.title}</span>}
              description={item.desc?.map(it => (
                <Tag color='orange'>{it}</Tag>
              ))}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default CommonPolicyList
