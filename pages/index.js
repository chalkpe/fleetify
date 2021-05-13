import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()
  const login = session ? (
    <>
      @{session.screen_name} <br />
      <Image src={session.user.image} width="400" height="400" />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
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
        {login}
        loading: {loading.toString()}
      </main>
    </div>
  )
}
