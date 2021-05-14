import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const copy = (dst, org, keys) =>
  Object.assign(
    dst,
    Object.fromEntries(
      Object.entries(org || {}).filter(([k]) => keys.includes(k))
    )
  )

export default NextAuth({
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_KEY,
      clientSecret: process.env.TWITTER_SECRET
    })
  ],
  callbacks: {
    async jwt(token, _user, account, profile, _isNewUser) {
      copy(token, account, ['oauth_token', 'oauth_token_secret'])
      copy(token, profile, ['screen_name'])
      return token
    },
    async session(session, token) {
      copy(session, token, ['oauth_token', 'oauth_token_secret', 'screen_name'])
      return session
    }
  }
})
