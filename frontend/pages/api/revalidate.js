export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.NEXT_PUBLIC_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }
   
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate('/')
      await res.revalidate(`/home/${req.query.tag}`)
      return res.json({ revalidated: true })
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating')
    }
  }