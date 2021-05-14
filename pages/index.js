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
  const [color, setColor] = useState('#00a3f9')

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
    <div>
      <p className={styles.description}>
        {session.user.name}{' '}
        <span className={styles.secondary}>@{session.screen_name}</span>
      </p>
      <div className={styles.picker}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <span onClick={(e) => setColor('#00a3f9')}>Fleet</span>
        <span onClick={(e) => setColor('#745deb')}>Space</span>
      </div>
      <nav className={styles.group}>
        <button onClick={() => postImage()}>Fleetify my profile pic!</button>
        <button onClick={() => signOut()}>Sign out</button>
      </nav>
    </div>
  ) : (
    <div>
      <button onClick={() => signIn('twitter')}>Sign in with Twitter</button>
    </div>
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
        <header>
          <h1 className={styles.title}>Fleetify</h1>
          <p className={styles.description}>
            Make your Twitter profile pic look as if you have uploaded a fleet.
          </p>
        </header>

        <div className={styles.group}>
          <Image
            aria-label="Original profile pic"
            src={src}
            width="400"
            height="400"
          />
          <span aria-label="to">→</span>
          <ProfileCanvas
            aria-label="Fleetified profile pic"
            src={src}
            color={color}
            onChange={setDataURL}
          />
        </div>

        {login}
      </main>

      <foooter className={styles.footer}>
        <span>
          &copy; 2021 <a href="https://twitter.com/chalk_alt">Chalk</a>
        </span>
        <span>
          Inspired by{' '}
          <a href="https://twitter.com/64bitfox/status/1392383765591191556">
            @64bitfox
          </a>
        </span>
        <a href="https://github.com/ChalkPE/fleetify">View on GitHub</a>
      </foooter>
    </div>
  )
}
