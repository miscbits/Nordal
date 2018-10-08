const crypto = require('crypto')

module.exports = (req, res, next) => {
  const payload = JSON.stringify(req.body)
  if (!payload) {
    return next('Request body empty')
  }

  const hmac = crypto.createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET)
  const digest = 'sha1=' + hmac.update(payload).digest('hex')
  const checksum = req.headers["X-Hub-Signature"]
  if (!checksum || !digest || checksum !== digest) {
    return next(`Request body digest (${digest}) did not match X-Hub-Signature (${checksum})`)
  }
  return next()
}
