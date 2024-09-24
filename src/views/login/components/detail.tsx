import { useState } from 'react'
import { Anchor, Carousel, Col, Descriptions, Input, Row, Tag } from 'antd'
import styles from './index.module.less'
import Icon from '@/assets/detailIcon.svg'
import Compet1 from '@/assets/compet1.png'
import Compet2 from '@/assets/compet2.png'
import Compet3 from '@/assets/compet3.png'
import Patent from '@/assets/patent.png'

export default function DetailFC(props: any) {
  const { title } = props

  const industries = ['非金属矿物', '数字经济', '光伏', '物联网']
  const qualifications = ['中国企业500强', '高新技术企业', '民营', '国家级单项冠军', '上市企业', '主板上市']
  const devices = [
    { name: '减速器', count: 59 },
    { name: '伺服电机', count: 117 },
    { name: '控制器', count: 1562 },
    { name: '传感器', count: 442 }
  ]
  const softwares = [
    { name: '人工智能', count: 59 },
    { name: '操作系统', count: 117 },
    { name: 'SLAM', count: 1562 }
  ]
  const services = [
    { name: '家用机器人', count: 59 },
    { name: '公用机器人', count: 117 },
    { name: '特种机器人', count: 1562 }
  ]

  return (
    <div className={styles.detailStyle}>
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>基本信息</span>
      </div>
      <Descriptions title={null} column={4}>
        <Descriptions.Item label='成立日'>2020-04-12</Descriptions.Item>
        <Descriptions.Item label='注册额'>1810000000</Descriptions.Item>
        <Descriptions.Item label='员工数'>Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label='所在地'>empty</Descriptions.Item>
        <Descriptions.Item label='所属行业' span={4}>
          {industries?.map(tag => (
            <Tag color='#2db7f5' key={tag}>
              {tag}
            </Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label='公司资质' span={4}>
          {qualifications?.map(tag => (
            <Tag color='#fcb138' key={tag}>
              {tag}
            </Tag>
          ))}
        </Descriptions.Item>
      </Descriptions>
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>行业竞争力</span>
      </div>
      <img src={Compet1} width='100%' height='100%' />
      <img src={Compet2} width='100%' height='100%' />
      <img src={Compet3} width='100%' height='100%' style={{ marginBottom: 10 }} />
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>专利信息</span>
      </div>
      <img src={Patent} width='100%' height='100%' style={{ marginBottom: 10 }} />
      <div className={styles.titleColor}>
        <img src={Icon} style={{ paddingTop: 8 }} />
        <span className={styles.text}>产业链信息</span>
      </div>
      <Row gutter={10}>
        <Col span={8}>
          <div className={styles.infoTitle}>上游：核心设备及零部件</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span className={styles.leftSubTitle} style={{ marginRight: 10 }}>
              核心零部件
            </span>
            <span className={styles.leftSubTitle}>软件应用开发</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.deviceList}>
              {devices.map((device, index) => (
                <div key={index} className={styles.deviceItem}>
                  <div className={styles.deviceName}>{device.name}</div>
                  <div className={styles.deviceCount}>{device.count}</div>
                </div>
              ))}
            </div>
            <div className={styles.deviceList}>
              {softwares.map((soft, index) => (
                <div key={index} className={styles.softItem}>
                  <div className={styles.deviceName}>{soft.name}</div>
                  <div className={styles.deviceCount}>{soft.count}</div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.infoTitle}>中游：机器人制造</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span className={styles.leftSubTitle} style={{ marginRight: 10 }}>
              服务机器人
            </span>
            <span className={styles.leftSubTitle}>工业机器人</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.deviceList}>
              {devices.map((device, index) => (
                <div key={index} className={styles.deviceItem}>
                  <div className={styles.deviceName}>{device.name}</div>
                  <div className={styles.deviceCount}>{device.count}</div>
                </div>
              ))}
            </div>
            <div className={styles.deviceList}>
              {softwares.map((soft, index) => (
                <div key={index} className={styles.softItem}>
                  <div className={styles.deviceName}>{soft.name}</div>
                  <div className={styles.deviceCount}>{soft.count}</div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8}>col-8</Col>
      </Row>
    </div>
  )
}
