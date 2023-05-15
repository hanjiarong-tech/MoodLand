import request from '@/api/request'

export function getComment() {
  return request({
    url: '/moodland/diary/123/123/comment',
    method: 'get'
  })
}