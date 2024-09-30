import { Button, Carousel, Input } from 'antd'
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
  height: '375px',
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
      <Carousel autoplay speed={1000}>
        {imgMap?.map((item, index) => {
          return (
            <div style={contentStyle} key={index}>
              <img src={item} width='100%' height='100%' />
            </div>
          )
        })}
      </Carousel>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Search allowClear onSearch={onSearch} style={{ width: 800, marginTop: 48 }} size='large' />
      </div>
      <div style={{ marginTop: 8, textAlign: 'center' }}>
        <span>热门搜索：</span>
        {hotword?.map((word: string) => (
          <Button type='text' onClick={() => handleSearch(word)} key={word}>
            {word}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default HomeFC
