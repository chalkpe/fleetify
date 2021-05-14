import { useState, useMemo } from 'react'
import styles from '../styles/Home.module.css'

import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/client'
import ProfileCanvas from '../components/ProfileCanvas'

export default function Home() {
  const [session, sessionLoading] = useSession()
  const [dataURL, setDataURL] = useState()
  const [color, setColor] = useState('#00a3f9')
  const [loading, setLoading] = useState(false)

  const src = useMemo(
    () =>
      session?.user?.image?.replace(/_normal\.(jpg|png|gif)$/, '.$1') ||
      'https://pbs.twimg.com/profile_images/1354479643882004483/Btnfm47p_400x400.jpg',
    [session]
  )

  const postImage = () => {
    setLoading(true)
    axios
      .post('/api/update', {
        oauth_token: session.oauth_token,
        oauth_token_secret: session.oauth_token_secret,
        image: dataURL.slice(dataURL.indexOf(',') + 1)
      })
      .then(() => alert('Done!'))
      .catch((err) => alert(JSON.stringify(err?.response?.data, null, 2)))
      .finally(() => setLoading(false))
  }

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
        <span onClick={() => setColor('#00a3f9')}>Fleet</span>
        <span onClick={() => setColor('#745deb')}>Space</span>
      </div>
      <nav className={styles.group}>
        <button disabled={loading} onClick={() => postImage()}>
          Fleetify my profile pic! {loading && ' (applying...)'}
        </button>
        <button disabled={sessionLoading} onClick={() => signOut()}>
          Sign out
        </button>
      </nav>
    </div>
  ) : (
    <div>
      <button disabled={sessionLoading} onClick={() => signIn('twitter')}>
        Sign in with Twitter
      </button>
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
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#00a3f9" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#00a3f9"></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fleetify" />
        <meta
          name="twitter:description"
          content="Make your Twitter profile pic look as if you have uploaded a fleet."
        />
        <meta
          name="twitter:image"
          content="https://fleetify.vercel.app/fleetify.png"
        />
        <meta name="twitter:creator" content="@chalk_alt" />
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
