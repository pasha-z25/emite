export default async function testHook(req, res) {
  console.log(req)
  res.status(200).json(req)
}
