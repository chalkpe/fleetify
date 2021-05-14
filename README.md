# fleetify

<p align="center">
  <a href="https://fleetify.vercel.app"><img src="https://fleetify.vercel.app/fleetify.png" alt="screenshot" /></a>
  <br />
  <h3 align="center">Make your Twitter profile pic look as if you have uploaded a fleet.</h3>
</p>

## Inspired by

- RT [@64bitfox](https://twitter.com/64bitfox):
  프로필 사진 이렇게 해 놓으면 사람들이 플릿 있는 줄 알고 막 눌러보겠지? [*↗*](https://twitter.com/64bitfox/status/1392383765591191556)

## Installation

```sh
git clone https://github.com/ChalkPE/fleetify
cd fleetify && vim .env.local && yarn && yarn dev
```

### Environment variables

| Key | Value |
| :-: | :- |
| `NEXTAUTH_URL` | [NextAuth.js](https://next-auth.js.org/configuration/options#nextauth_url) URL |
| `TWITTER_KEY` | Twitter API Key|
| `TWITTER_SECRET` | Twitter API Secret Key |

### Callback URLs (Twitter API)

- `http://localhost:3000/api/auth/callback/twitter`
- `https://fleetify.vercel.app/api/auth/callback/twitter`

## License

[MIT License](LICENSE)