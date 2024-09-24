import { useState } from 'react'
import { Col, Row } from 'antd'
import styles from './index.module.less'
import Icon from '@/assets/detailIcon.svg'

export default function CommonDetailFC(props: any) {
  const { title } = props
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
      <div className={styles.titleStyle}>西安市机器人产业链图谱</div>
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
