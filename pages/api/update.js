import Twitter from 'twitter-lite'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = new Twitter({
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret: process.env.TWITTER_SECRET,
      access_token_key: req.body.oauth_token,
      access_token_secret: req.body.oauth_token_secret
    })

    try {
      res.json(await client.post('account/update_profile_image', {
        image: req.body.image
      }))
    } catch (err) {
      res.status(500).json(err)
    }
  }
}