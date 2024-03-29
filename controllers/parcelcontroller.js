const moment = require("moment");
const queries = require("../query");
const db = require("../database")

exports.placeOrderForParcel = async (req, res) => {
    const date = new Date();
    const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const { sender_name, price, weight, location, destination, sender_note } = req.body;
    const user_id = req.user.user_id

    const status = "pending"

    if (!sender_name || !price || !weight || !location || !destination || !sender_note) {
        res.status(404).json({
            message: "Please fill the necessary credentials"
        })
    }
    const queryObject = {
        text: queries.orderParcelQuery,
        values: [user_id, sender_name, price, weight, location, destination, status, sender_note, created_at, created_at]

    }
    const { rows, rowCount } = await db.query(queryObject);

    try {
        const dbresponse = rows[0]
        if (rowCount === 0) {
            res.status(400).json({ message: "could not create parcel order" })
        }
        if (rowCount > 0) {
            res.status(201).json({ message: "Your order has been placed", dbresponse })
        }
    } catch (error) {
        res.status(500).json({ message: "error creating parcel order" })
    }

}
exports.getUserParcelById = async (req, res) => {
    const { id } = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }
    const queryObject = {
        text: queries.getUserOrderById,
        values: [id]
    }
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({ message: "This is your order by id", data: rows[0] })
        }
        if (rowCount === 0) {
            return res.status(400).json({ message: "there is no id found" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "error finding id" })
    }
}

exports.getUserParcel = async (req, res) => {
    const queryObject = {
        text: queries.getUserOrder

    }
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({ message: "This is your order by id", data: rows[0] })
        }
        if (rowCount === 0) {
            return res.status(400).json({ message: "there is no id found" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "error finding id" })
    }
}

exports.updateDestinationByUserId = async (req, res) => {

    const { id } = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }
    const { destination } = req.body;

    const d = new Date();
    const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    
    const queryObject = {
        text: queries.updateOrderDestination,
        values: [destination, updated_at, id]
    }
    const queryObject1 = {
        text: queries.getParcelStatus,
        values: [id]
    }

    try {
        const { rowCount,rows } = await db.query(queryObject1)
        const parcelStatus= rows[0].status
        if (rowCount > 0) {
            if(parcelStatus === 'delivered' || parcelStatus=== 'transit'){
            return res.status(400).json({
                message: "cannot update destination of this parcel order",
            })
        }
        }
        const response =await db.query(queryObject)
        const dbResult=response.rows[0]
        if (rowCount === 0) {
            return res.status(500).json({ message: "parcel with id not found" })
        }
        if (rowCount > 0) {
            return res.status(200).json({ message: " Updated Destination Successfully", dbResult })
        }
    } catch (error) {
        res.status(400).json({ message: "error uddating destination" })
    }
}
exports.cancelDeliveryOrder = async (req, res) => {

    const { id } = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }

    const queryObject = {
        text: queries.deleteParcelOrder,
        values: [id]
    }
    const queryObject1 = {
        text: queries.getParcelStatus,
        values: [id]
    }

    try {
        const { rowCount,rows } = await db.query(queryObject1)
        const parcelStatus= rows[0].status
        if (rowCount > 0) {
            if(parcelStatus === 'delivered' || parcelStatus=== 'transit'){
            return res.status(400).json({
                message: "cannot update status of a delivered parcel",
            })
        }
        }
        const response = await db.query(queryObject)
        const dbResult=response.rows[0]
        if (rowCount === 0) {
            return res.status(500).json({ message: "parcel with id not found" })
        }
        if (rowCount > 0) {
            return res.status(200).json({ message: "order deleted successfully" , dbResult})
        }
    } catch (error) {
        res.status(400).json({ message: "error deleting" })
    }
}

exports.updateLocationByAdmin = async (req, res) => {
    const { id } = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }
    const { location } = req.body;
    const d = new Date();
    const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const queryObject = {
        text: queries.updateOrderLocation,
        values: [location, updated_at, id]
    }
    const queryObject1 = {
        text: queries.getParcelStatus,
        values: [id]
    }
    try {
        const { rowCount,rows } = await db.query(queryObject1)
        const parcelStatus= rows[0].status
        if (rowCount > 0) {
            if(parcelStatus === 'delivered' || parcelStatus=== 'transit'){
            return res.status(400).json({
                message: "cannot update status of a delivered parcel",
            })
        }
        }
        const response = await db.query(queryObject)
        const dbResult=response.rows[0]
        if (rowCount === 0) {
            return res.status(500).json({ message: "parcel with id not found" })
        }
        if (rowCount > 0) {
            return res.status(200).json({ message: "parcel order location updated successfully", dbResult })
        }
    } catch (error) {
        res.status(400).json({ message: "error finding id" })
    }
}


exports.updateStatusByAdmin = async (req, res, next) => {
    const { id } = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }
    const { status } = req.body;
    
    const d = new Date();
    const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const queryObject = {
        text: queries.getParcelStatus,
        values: [id]
    }
    const queryObject1 = {
        text: queries.updateOrderStatus,
        values: [status, updated_at, id]
    }
    try {
        const { rowCount,rows } = await db.query(queryObject)
        const parcelStatus= rows[0].status
        if (rowCount > 0) {
            if(parcelStatus === 'delivered' || parcelStatus=== 'cancelled'){
            return res.status(400).json({
                message: "cannot update status of a delivered parcel",
            })
        }
        }
    const response =await db.query(queryObject1)
    const dbResult=response.rows[0]
    if (rowCount === 0) {
        return res.status(500).json({ message: "parcel with id not found" })
    }
        if(rowCount > 0) {
            return res.status(200).json({ message: "parcel status successfully", dbResult })
        }
       
    }
        catch (error) {
        res.status(400).json({ message: "error updating status " })
    }
}