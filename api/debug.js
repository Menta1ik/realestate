
export default function handler(req, res) {
  res.status(200).json({ 
    message: "Debug endpoint working", 
    timestamp: new Date().toISOString() 
  });
}
