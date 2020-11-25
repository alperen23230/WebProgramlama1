import React from 'react'

import styles from './index.module.css'

import Layout from '../components/layout'
import Tweet from '../components/tweet'

function HomePage() {
  var tweets = []

  for(var i = 0; i<20; i++) {
    tweets.push(<Tweet/>)
  }

  return (
    <Layout>

      {
        tweets.map((tweet)=>{
          return tweet
        })
      }
    </Layout>
  )
}

export default HomePage
