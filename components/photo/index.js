import React from 'react'
import cn from 'classnames'

import styles from './style.module.css'

function Photo({
  src = 'https://avatars0.githubusercontent.com/u/34453494?s=400&u=c7f9d609abe43a7b50ca3478683de3de4a453a29&v=4',
  alt,
  size = 47
}) {
  return (
    <div className={cn([styles.photo])} style={{ width: size, height: size }}>
      <img className={styles.img} src={src} alt={alt} />
    </div>
  )
}
export default Photo
