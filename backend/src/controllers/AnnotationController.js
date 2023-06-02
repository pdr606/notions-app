const Annotations = require('../models/AnnotationData')

module.exports = {

    async read(request, response) {
        const annotationList = await Annotations.find()

        return response.json(annotationList)

    },

 async create(request, response) {
    const {title, notes, priority} = request.body

    if (!notes || !title){
        return response.status(400).json({error: "Necessário um título/anotação"})
    }

    const annotationCreated = await Annotations.create({
        title,
        notes,
        priority
    })

    return response.json(annotationCreated)

    },

    async delete(request, response) {
        const {id} =  request.params;

        try {
            const annotationDeleted = await Annotations.findByIdAndDelete({_id : id})

        if (annotationDeleted) {
            return response.json(annotationDeleted)
        }

        return response.status(401).json({error: 'Não foi encontrado o registro para deletar'})

        } catch (error) {
            return response.status(500).json({error: 'Ocorreu um erro ao excluir o registro'})
        }

        

    }



}