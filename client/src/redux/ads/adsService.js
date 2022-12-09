import axios from 'axios'

const url = '/api'

// POST ADS
const postAd = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }

  const ad = await axios({
    method: 'post',
    url: `${url}/post`,
    headers: header,
    data,
  })

  return ad.data
}

// GET ADS
const getAds = async () => {
  const ads = await axios.get(`${url}/items`)

  return ads.data
}

// GET ITEM USER
const getItemUser = async (userId) => {
  const user = await axios({
    method: 'post',
    url: `${url}/item/user`,
    data: { userId },
  })

  return user.data
}