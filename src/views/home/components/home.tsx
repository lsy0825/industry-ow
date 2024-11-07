import { Button, Carousel, Input, Row, Col } from 'antd'
import Home1 from '@/assets/home1.jpg'
import Home2 from '@/assets/home2.jpg'
import Home3 from '@/assets/home3.jpg'
import Home4 from '@/assets/home4.jpg'
import Home5 from '@/assets/home5.jpg'
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
  const { data: hotword } = useRequest(
    async () => {
      const resp: string[] = (await api.getHotWord()) as string[]
      return resp
    },
    {
      manual: false
    }
  )

  const onSearch = (value: string) => {
    setCurrent('7')
    getEnterValue(value)
  }

  const handleSearch = (value: string) => {
    setCurrent('7')
    getEnterValue(value)
  }

  return (
    <div className={styles.homeStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '40%', height: 250, marginRight: 48 }}>
          <Carousel autoplay speed={1000}>
            {imgMap?.map((item, index) => {
              return (
                <div style={contentStyle} key={index}>
                  <img src={item} width='100%' height='250px' />
                </div>
              )
            })}
          </Carousel>
        </div>
        <div style={{ width: '100%' }}>
          <Search allowClear onSearch={onSearch} style={{ width: '100%' }} size='large' />
          <div style={{ border: '1px solid #333', height: '186px', marginTop: 24 }}>热门专题</div>
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <Row gutter={24}>
          <Col span={8}>
            <div style={{ border: '1px solid #333' }}>快速导航</div>
          </Col>
          <Col span={8}>
            <div style={{ border: '1px solid #333' }}>研究报告</div>
          </Col>
          <Col span={8}>
            <div style={{ border: '1px solid #333' }}>数据动态</div>
          </Col>
        </Row>
      </div>
      {/* <div style={{ marginTop: 8, textAlign: 'center' }}>
        <span>热门搜索：</span>
        {hotword?.map((word: string) => (
          <Button type='text' onClick={() => handleSearch(word)} key={word}>
            {word}
          </Button>
        ))}
      </div> */}
    </div>
  )
}

export default HomeFC
