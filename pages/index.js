import { useState, useMemo } from 'react'
import styles from '../styles/Home.module.css'

import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/client'
import ProfileCanvas from '../components/ProfileCanvas'

export default function Home() {
  const [session] = useSession()
  const [dataURL, setDataURL] = useState()

  const src = useMemo(
    () =>
      session?.user?.image ||
      'https://pbs.twimg.com/profile_images/1354479643882004483/Btnfm47p_400x400.jpg',
    [session]
  )

  const postImage = () =>
    axios
      .post('/api/update', {
        oauth_token: session.oauth_token,
        oauth_token_secret: session.oauth_token_secret,
        image: dataURL.slice(dataURL.indexOf(',') + 1)
      })
      .then(() => alert('done!'))
      .catch((err) => alert(`error: ${JSON.stringify(err?.response?.data)}`))

  const login = session ? (
    <>
      <div>@{session.screen_name}</div>
      <div>{session.user.image}</div>
      <button onClick={() => postImage()}>Update</button>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <button onClick={() => signIn('twitter')}>Sign in with Twitter</button>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Fleetify</title>
        <meta
          name="description"
          content="Make your Twitter profile pic look as if you have uploaded a fleet."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fleetify</h1>
        <p className={styles.description}>
          Make your Twitter profile pic look as if you have uploaded a fleet.
        </p>

        <div className={styles.images}>
          <Image src={src} width="400" height="400" />
          <span>→</span>
          <ProfileCanvas src={src} onChange={setDataURL} />
        </div>

        {login}
      </main>

      <foooter className={styles.footer}>
        <span>&copy; 2021 Chalk</span>
        <a href="https://github.com/ChalkPE/fleetify">View on GitHub</a>
      </foooter>
    </div>
  )
}
