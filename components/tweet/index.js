import React from 'react'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import styles from './style.module.css'
import Photo from '../photo'
import IconButton from '../button/icon'
import * as Icon from '../icons'

function Tweet() {
  // created_at
  // retweet_count
  // favorite_count
  // retweeted
  // favorited
  // text
  // user.name
  // user.profile_image_url_https
  // user.screen_name

  return (
    <article className={styles.tweet}>
      {/* avatar */}
      <div className={styles.avatar}>
        <Photo src='https://avatars0.githubusercontent.com/u/34453494?s=400&u=c7f9d609abe43a7b50ca3478683de3de4a453a29&v=4' />
      </div>

      {/* body */}
      <div className={styles.body}>
        <header className={styles.header}>
          <span className={styles.name}>Alperen Ünal</span>{' '}
          <span>@alperenunal68</span> ·{' '}
          <span>1 hour</span>
        </header>

        <div className={styles.content}>Test Tweet</div>

        <footer className={styles.footer}>
          {/* reply */}
          <div className={styles.footerButton}>
            <IconButton className={styles.actionButton}>
              <Icon.Reply />
            </IconButton>
            {false && <span>3</span>}
          </div>

          {/* retweet */}
          <div className={styles.footerButton}>
            <IconButton className={styles.actionButton}>
              <Icon.Retweet />
            </IconButton>
            <span>50</span>
          </div>

          {/* like */}
          <div className={styles.footerButton}>
            <IconButton className={styles.actionButton}>
              <Icon.Like />
            </IconButton>
             <span>30</span>
          </div>

          {/* share */}
          <div className={styles.footerButton}>
            <IconButton className={styles.actionButton}>
              <Icon.Share />
            </IconButton>
          </div>
        </footer>
      </div>
    </article>
  )
}

export default Tweet
