const moment = require("moment");
const queries = require("../query");
const db = require("../database")

exports.placeOrderForParcel = async (req,res)=>{
const date = new Date();
const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');
const {sender_name, user_name, price, weight, location, destination, sender_note} = req.body; 
if (!sender_name || !user_name || !price || !weight || !location || !destination || !sender_note){
    res.status(404).json({
        message: "Please fill the necessary credentials"
    })
}
const queryObject = {
    text: queries.orderParcelQuery,
    values: [sender_name, user_name, price, weight, location, destination, sender_note, created_at, created_at]

   
}
const {rowCount} = await db.query(queryObject);

try{
    const {rows} = await db.query(queryObject);
    const dbresponse = rows[0]
    if (rowCount===0){
        res.status(400).json({message:"could not create parcel order"})
    }
    if (rowCount > 0){
        res.status(201).json({message:"Your order has been placed", data:dbresponse})
    }
}catch(error){
    res.status(500).json({message:"error creating parcel order", })
}
}
exports.getUserParcelByUserName = async (req,res)=>{
    const {user_name} = req.body
const queryObject = {
    text:queries.getUserOrderByUserName,
    values:[user_name]
}
try{
    const {rows, rowCount} = await db.query(queryObject)
    if(rowCount > 0){
        return res.status(200).json({message:"This is your placed order", data:rows[0]})
    }
    if(rowCount===0){
        return  res.status(400).json({message:"there is no username like this"})
    }
}
catch(error){
    res.status(400).json({message:"error finding username"})
}
}
exports.getUserParcelById = async (req,res)=>{
    const {id} = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }
const queryObject = {
    text: queries.getUserOrderById,
    values:[id]
}
try{
    const {rows, rowCount} = await db.query(queryObject)
    if(rowCount > 0){
        return res.status(200).json({message:"This is your order by id", data:rows[0]})
    }
    if(rowCount===0){
        return  res.status(400).json({message:"there is no id found"})
    }
}
catch(error){
    res.status(400).json({message:"error finding id"})
}
}

exports.updateParcelDeliveryLocation= async(req, res) =>{
    const {id} = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }
    const { destination } = req.body;
    // const d = new Date();
    // const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const queryObject={
        text: queries.updateOrderDestination,
        values:[ destination, id]
    }
    try {
        const{rowCount} = await db.query(queryObject)
        if(rowCount === 0){
            return res.status(500).json({message:"parcel with id not found"})
        }
        if(rowCount > 0){
            return res.status(200).json({message:"parcel updated successfully"})
        }
    } catch (error) {
        res.status(400).json({message:"error deleting"})
    }
}

exports.cancelDeliveryOrder = async (req, res)=>{
    const {id} = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }
const queryObject={
    text: queries.deleteParcelOrder,
    values:[ id]
}

try {
    const{rowCount} = await db.query(queryObject)
    if(rowCount === 0){
        return res.status(500).json({message:"parcel with id not found"})
    }
    if(rowCount > 0){
        return res.status(200).json({message:"order deleted successfully"})
    }
} catch (error) {
    res.status(400).json({message:"error deleting"})
}
}
