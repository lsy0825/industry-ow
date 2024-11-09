import { Button, Carousel, Input, Row, Col } from 'antd'
import Home1 from '@/assets/home1.jpg'
import Home2 from '@/assets/home2.jpg'
import Home3 from '@/assets/home3.jpg'
import Home4 from '@/assets/home4.jpg'
import Home5 from '@/assets/home5.jpg'
import logo1 from '@/assets/logo1.png'
import logo2 from '@/assets/logo2.png'
import logo3 from '@/assets/logo3.png'
import styles from './index.module.less'
import { HomeProps } from '../type'
import { useRequest } from 'ahooks'
import api from '@/api'
import { useStore } from '@/store'

const { Search } = Input

const imgMap = [Home1, Home2, Home3, Home4, Home5]

const contentStyle: React.CSSProperties = {
  height: '100%',
  color: '#fff',
  lineHeight: '375px',
  textAlign: 'center',
  background: '#364d79'
}

const HomeFC: React.FC<HomeProps> = ({ setCurrent }) => {
  const { getEnterValue } = useStore()
  // 热点词字典
  // const { data: hotword } = useRequest(
  //   async () => {
  //     const resp: string[] = (await api.getHotWord()) as string[]
  //     return resp
  //   },
  //   {
  //     manual: false
  //   }
  // )

  const onSearch = (value: string) => {
		if(value?.includes('产业链')){
    	setCurrent('3')
		}else if(value?.includes('政策')){
    	setCurrent('6')
		}else{
    	setCurrent('2')
		}
  }

  return (
    <div className={styles.homeStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: 590, height: 360, marginRight: 48 }}>
          <Carousel autoplay speed={1000}>
            {imgMap?.map((item, index) => {
              return (
                <div style={contentStyle} key={index}>
                  < img src={item} width='100%' height='360px' />
                </div>
              )
            })}
          </Carousel>
        </div>
        <div style={{ width: '100%' }}>
          <Search allowClear onSearch={onSearch} style={{ width: '100%' }} size='large' />
          <div className={styles.hotTopic}>
						<div className={styles.topicTitle}>热门专题</div>
						<div className={styles.text}>月度跟踪：钢铁产业链数据全景及传导逻辑分析
供应链管理协会（ASCM）确定了 2024 年大模型产业链分布专题
医疗器械产业链分布高峰论坛在京举办月度跟踪：钢铁产业链数据全景及传导逻辑分析
供应链管理协会（ASCM）确定了 2024 年大模型产业链分布专题
医疗器械产业链分布高峰论坛在京举办月度跟踪：钢铁产业链数据全景及传导逻辑分析
供应链管理协会（ASCM）确定了 2024 年大模型产业链分布专题
医疗器械产业链分布高峰论坛在京举办</div>
						<div className={styles.more} onClick={()=>setCurrent('info')}>{`...<< MORE`}</div>
					</div>
        </div>
      </div>
      <div style={{ marginTop: 24,display:'flex' }}>
				<div>
					<div style={{width:590}}>
						<span className={styles.link1}>产业链全景分析</span>
						<span className={styles.link}>区域经济与资源整合</span>
					</div>
					<div style={{width:590}}>
						<span className={styles.link2}>产品市场与竞争分析</span>
						<span className={styles.link}>企业综合竞争力评估</span>
					</div>
				</div>
				<div className={styles.dataAct}>
					<div className={styles.dataTitle}>数据动态</div>
					<div className={styles.dataText}>
						月度跟踪：钢铁产业链数据全景及传导逻辑分析
供应链管理协会（ASCM）确定了 2024 年大模型产业链分布专题
医疗器械产业链分布高峰论坛在京举办月度跟踪：钢铁产业链数据全景及传导逻辑分析
供应链管理协会（ASCM）确定了 2024 年大模型产业链分布专题
医疗器械产业链分布高峰论坛在京举办月度跟踪：钢铁产业链数据全景及传导逻辑分析
供应链管理协会（ASCM）确定了 2024 年大模型产业链分布专题
医疗器械产业链分布高峰论坛在京举办
					</div>
				</div>
      </div>
			{/* 底部链接栏 */}
			<div className={styles.footer}>
				<span>数据合作与支持单位</span>
				<img src={logo1} height={50}/>
				<img src={logo2} height={50}/>
				<img src={logo3} />
				<span>联系我们 xxxxxxxx</span>
				<span>社交媒体 xxx<img src='' /></span>
				<a href='https://www.example.com' target='_blank'>法律声明与隐私政策</a>
			</div>
    </div>
  )
}

export default HomeFC
