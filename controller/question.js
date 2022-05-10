const Question = require('../models/questions');
const Subject = require('../models/subject');
const mongoose = require("mongoose");
exports.createquestion = async (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const { description } = req.body
        const { alternatives } = req.body
        const {subjects}=req.body
        const question = await Question.create({
            description,
            alternatives,
            subjects
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}

exports.getquestion = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
  };

  exports.getquestionbyId = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const _id = req.params.id 
        const question = await (await Question.findOne({_id})).populate("subjects").execPopulate()  
        // const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}

exports.updatequestion = async (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const _id = req.params.id 
        // const { description, alternatives } = req.body
        const { description, alternatives, subjects } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives,
                subjects
            })    
            return res.status(201).json(question)
        }else{
            if (description) {
                question.description = description
            }
            if (alternatives) {
                question.alternatives = alternatives
            }
            if (subjects) {
                question.subjects = subjects
            }
            // if (subjects) {
            //     question.subjects = subjects.map((subject) => mongoose.Types.ObjectId(subject))
            // }
            // question.description = description
            // question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }

}

exports.deletequestion=async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }

}

exports.createsubject = async(req,res)=>{
    try {
        const {name} = req.body;
        const subject = await Subject.create({name})
        return res.status(200).json(subject)    
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
exports.getsubjects=async(req,res)=>{
    try {
        const subjects = await Subject.find()
        return res.status(200).json(subjects)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
exports.getsubjectbyId=async(req,res)=>{
    try {
        const _id = req.params.id 

        const questions = await Question.find({ subjects: _id });
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}