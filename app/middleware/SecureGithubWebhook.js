const crypto = require('crypto')

module.exports = (req, res, next) => {
  const payload = JSON.stringify(req.body)
  if (!payload) {
    return next('Request body empty')
  }

  const hmac = crypto.createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET)
  const digest = 'sha1=' + hmac.update(payload).digest('hex')
  const checksum = req.headers['x-hub-signature']
  if (!checksum || !digest || checksum !== digest) {
    return res.status(401).json("Request body digest did not match X-Hub-Signature");
  }
  return next()
}
