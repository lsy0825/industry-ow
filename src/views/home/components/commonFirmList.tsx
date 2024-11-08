import React, { useState } from 'react'
import { List, Modal, Tag } from 'antd'
import styles from './index.module.less'
import moment from 'moment'
import { IsOpenProps, ListProps } from '../type'
import Detail from './detail'
import { useStore } from '@/store'

const CommonFirmList: React.FC<ListProps> = ({ dataList, title, setSearchValue, searchValue, setCurrent }) => {
  const [isModalOpen, setIsModalOpen] = useState<IsOpenProps>({ type: false, record: {} })
	const { getRowFirm } = useStore()
  const showTotal = (total: number) => `共 ${total} 条`
	const handleClick = (item:any) => {
		getRowFirm(item)
		setCurrent('8')
	}

  return (
    <div>
      <List
        itemLayout='horizontal'
        dataSource={dataList}
        pagination={
          title === 'firm'
            ? {
                onChange: (page, size) => {
                  setSearchValue({ ...searchValue, pageNo: page, pageSize: size })
                },
                pageSize: searchValue?.pageSize,
                total: dataList?.length,
                showTotal,
                showSizeChanger: true,
                showQuickJumper: true
              }
            : false
        }
        renderItem={(item: Record<string, any>, index) => (
          <List.Item
            actions={[
              <span className={styles.rightTitle} key={index}>{`成立时间：${moment(item.dateEstablishment).format(
                'YYYY-MM-DD'
              )}`}</span>,
              <span className={styles.rightTitle} key={index}>{`注册资本：${item.annualIncome}万元`}</span>
            ]}
            onClick={()=>handleClick(item)}
          >
            <List.Item.Meta
              title={<span className={styles.leftTitle}>{item.name}</span>}
              description={
                <>
                  {/* 产业链 */}
                  {item?.industryClass?.map((i: string) => (
                    <Tag color='#f50' key={i}>
                      {i}
                    </Tag>
                  ))}
                  {/* 资质类别 */}
                  {item?.qualificationsId?.map((i: string) => (
                    <Tag color='#2db7f5' key={i}>
                      {i}
                    </Tag>
                  ))}

                  {/* <Tag color='#fcb138'>{item.desc3产品}</Tag> */}
                </>
              }
            />
          </List.Item>
        )}
      />
      {/* <Modal
        title={isModalOpen?.record?.title}
        open={isModalOpen.type}
        footer={null}
        onCancel={() => setIsModalOpen({ type: false, record: {} })}
        width={1400}
        centered={true}
      >
        <Detail isModalOpen={isModalOpen} />
      </Modal> */}
    </div>
  )
}

export default CommonFirmList
