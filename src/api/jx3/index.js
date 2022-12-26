import api from '@/api/api'

export const chat = () => {
  return api.jx3.query({
    url: `data/chat/random`,
  })
}