const { employeeBio } = require('../models')
const errorHandler = require('../helper/errorHandler')
const { Op } = require("sequelize")
const path = require('path')

class userController{
    static async createEmply(req,res){
        try {
            const payload = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                province: req.body.province,
                city: req.body.city,
                streetAddress: req.body.streetAddress,
                zipCode: req.body.zipCode,
                ktpNumber: req.body.ktpNumber,
                position: req.body.position,
                bankAccount: req.body.bankAccount,
                accountNumber: req.body.accountNumber,
                file: req.file.filename,
                fileSize: req.file.size
            }
            await employeeBio.create(payload)
            return res.status(200).json({message: "bio successfully created"})
        } catch (error) {
            const er = errorHandler(error)
            er ? res.status(400).json({message: er}) : res.status(500).json({message: "Bad Network"})
        }
    }
    static async updateBio(req,res){
        try {
            const { id } = req.params
            const payload = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                province: req.body.province,
                city: req.body.city,
                streetAddress: req.body.streetAddress,
                zipCode: req.body.zipCode,
                ktpNumber: req.body.ktpNumber,
                position: req.body.position,
                bankAccount: req.body.bankAccount,
                accountNumber: req.body.accountNumber,
            }
            if(req.file){
                const path = req.file.path
                const size = req.file.size
                payload.file = path
                payload.fileSize = size
            }
            await employeeBio.update(payload,{where:{id:id}})
            return res.status(200).json({message: "bio successfully updated"})
        } catch (error) {
            const er = errorHandler(error)
            er ? res.status(400).json({message: er}) : res.status(500).json({message: "Bad Network"})
        }
    }
    static async deleteBio(req,res){
        try {
            const { id } = req.params
            await employeeBio.destroy({where: {id: id}})
            return res.status(200).json({message: "delete success"})
        } catch (error) {
            res.status(500).json({message: "Bad Network"})
        }
    }
    static async view(req,res){
        try {
            const {firstName, position} = req.body
            let filter = []
            if(firstName) filter.push({firstName: {[Op.iLike]: firstName.includes(' ') ? firstName.split(' ').join('%') : firstName.concat('%')}})
            if(position) filter.push({position: {[Op.iLike]: position.trim().concat('%')}})
            const bios = await employeeBio.findAll({
                where:{
                    [Op.and]: filter
            }})
            if(!bios) return res.status(400).json({message: "data not found"})
            return res.status(200).json({data: bios})
        } catch (error) {
            res.status(500).json({message: "Bad Network"})
        }
    }
    static async viewID(req,res){
        try {
            const { id } = req.params
            const findPath = await employeeBio.findByPk(id)
            if(!findPath) return res.status(400).json({message: "file not found"})
            const dir = path.resolve()
            const files = path.join(dir,'files',findPath.file) 
            return res.sendFile(files)
        } catch (error) {
            res.status(500).json({message: "Bad Network"})
        }
    }
}

module.exports = userController