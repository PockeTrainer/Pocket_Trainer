const CLIENT_ID = "c41yfr0NUXwFTnvuAWV3"
const REDIRECT_URI = "http://127.0.0.1:3000"
const STATE = "STATE_STRING"
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;