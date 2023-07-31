import dbConnect from "@/config/connection";
import Order from "../../../models/Order";


const handler = async (req,res) => {
    const {method, query:{id}, cookies } = req;
    const token = cookies.token

    await dbConnect();
    if(method === "GET"){
        try {
            const order = await Order.findById(id);
            res.status(200).json(order);
        } catch (error) {
            request.status(500).json(error)
        }
    }
    if (method === "PUT") {
      if(!token || token !== process.env.token){
        return res.status(401).json("Not authenticated!")
      }
        try {
          const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.status(200).json(order);
        } catch (err) {
          res.status(500).json(err);
        }
      }
      if (method === "DELETE") {
        if(!token || token !== process.env.TOKEN) {
          return res.status(401).json("Not Authenticated")
        }
        try {
          await Product.findByIdAndDelete(id);
          res.status(200).json("The Order has been deleted!");
        } catch (err) {
          res.status(500).json(err);
        }
      }
}

export default handler;