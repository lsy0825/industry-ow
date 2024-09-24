import { useState } from 'react'
import { Carousel, Input } from 'antd'
import Home1 from '@/assets/home1.jpg'
import Home2 from '@/assets/home2.jpg'
import Home3 from '@/assets/home3.jpg'
import Home4 from '@/assets/home4.jpg'
import Home5 from '@/assets/home5.jpg'
import styles from './index.module.less'

const { Search } = Input;

const imgMap = [Home1,Home2,Home3,Home4,Home5]

export default function HomeFC() {

    const contentStyle: React.CSSProperties = {
        height: '375px',
        color: '#fff',
        lineHeight: '375px',
        textAlign: 'center',
        background: '#364d79',
    };

    const onSearch = (value:string, e:any) => console.log( value);

  return (
    <div className={styles.homeStyle}>
        <Carousel autoplay speed={1000}>
            {imgMap?.map((item,index)=>{
                return <div style={contentStyle} key={index}>
                <img src={item} width='100%' height='100%'/>
            </div>
            })}
        </Carousel>
        <div style={{display:'flex', justifyContent:'center'}}>
            <Search placeholder="热门搜索：西安、智能机器人" allowClear onSearch={onSearch} style={{ width: 800, marginTop:48 }} size="large"/>
        </div>
    </div>
  )
}
