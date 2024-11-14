import { Carousel, Input } from 'antd'
import Home1 from '@/assets/CarouselImg1.png'
import Home2 from '@/assets/CarouselImg2.png'
import Home3 from '@/assets/CarouselImg3.png'
import logo1 from '@/assets/logo1.png'
import logo2 from '@/assets/logo2.png'
import logo3 from '@/assets/logo3.png'
import styles from './index.module.less'
import { HomeProps } from '../type'
import { useRequest } from 'ahooks'
import api from '@/api'
import { useStore } from '@/store'

const { Search } = Input

const imgMap = [Home1, Home2, Home3]

const contentStyle: React.CSSProperties = {
  height: '100%',
  color: '#fff',
  lineHeight: '375px',
  textAlign: 'center',
  background: '#364d79'
}

const HomeFC: React.FC<HomeProps> = ({ setCurrent }) => {
  // 数据动态
  const { data: dataDynamics } = useRequest(
    async () => {
      const resp: any[] = (await api.getDataDynamics()) as any[]
      return resp
    },
    {
      manual: false
    }
  )

  const onSearch = (value: string) => {
    if (value?.includes('产业链')) {
      setCurrent('3')
    } else if (value?.includes('政策')) {
      setCurrent('6')
    } else {
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
                  <img src={item} width='100%' height='360px' />
                </div>
              )
            })}
          </Carousel>
        </div>
        <div style={{ width: '100%' }}>
          <Search allowClear onSearch={onSearch} style={{ width: '100%' }} size='large' />
          <div className={styles.hotTopic}>
            <div className={styles.topicTitle}>热门专题</div>
            <div className={styles.text}>
              月度跟踪：钢铁产业链数据全景及传导逻辑分析 供应链管理协会（ASCM）确定了 2024 年大模型产业链分布专题
              医疗器械产业链分布高峰论坛在京举办月度跟踪：钢铁产业链数据全景及传导逻辑分析 供应链管理协会（ASCM）确定了
              2024 年大模型产业链分布专题 医疗器械产业链分布高峰论坛在京举办月度跟踪：钢铁产业链数据全景及传导逻辑分析
              供应链管理协会（ASCM）确定了 2024 年大模型产业链分布专题 医疗器械产业链分布高峰论坛在京举办
            </div>
            <div className={styles.more} onClick={() => setCurrent('info')}>{`...<< MORE`}</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, display: 'flex' }}>
        <div>
          <div style={{ width: 590 }}>
            <span className={styles.link1} onClick={() => setCurrent('industry')}>
              产业链全景与多维分析
            </span>
            <span className={styles.link} onClick={() => setCurrent('areaEco')}>
              区域经济动态与资源整合
            </span>
          </div>
          <div style={{ width: 590 }}>
            <span className={styles.link2} onClick={() => setCurrent('product')}>
              产品市场竞争与供应链流向
            </span>
            <span className={styles.link} onClick={() => setCurrent('firmCompete')}>
              企业竞争力与上下游协同
            </span>
          </div>
        </div>
        <div className={styles.dataAct}>
          <div className={styles.dataTitle}>数据动态</div>
          <div className={styles.dataText}>
            {dataDynamics?.map((item: any) => (
              <div>{`${item.dataDynamicsDate} ${item.remark} ${item.dataDynamicsNum} 条记录`}</div>
            ))}
          </div>
        </div>
      </div>
      {/* 底部链接栏 */}
      <div className={styles.footer}>
        <span>数据合作与支持单位</span>
        <img src={logo1} height={50} />
        <img src={logo2} height={50} />
        <img src={logo3} />
        <span>联系我们 xxxxxxxx</span>
        <span>
          社交媒体 xxx
          <img src='' />
        </span>
        <a href='https://www.example.com' target='_blank'>
          法律声明与隐私政策
        </a>
      </div>
    </div>
  )
}

export default HomeFC
