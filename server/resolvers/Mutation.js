function postMessage(parent, args, context, info) {
    return context.prisma.createMessage({
        text: args.text,
        likes: args.likes,
        dislikes: args.dislikes
    })
}

async function postReply(parent, args, context, info) {
    const messageExists = await context.prisma.$exists.message({
        id: args.messageId
    });

    if(!messageExists)
        throw new Error(`Product with id ${args.messageId} does not exist`);

    return context.prisma.createReply({
        text: args.text,
        message: {connect: { id: args.messageId } }
    });
}

async function likeMessage(parent, args, context, info) {
    const id = args.messageId;
    const messageExists = await context.prisma.message({
        id
    });

    if(!messageExists)
        throw new Error(`Product with id ${args.messageId} does not exist`);

    messageExists.likes++;
    const {text, likes, dislikes} = messageExists;
    return context.prisma.updateMessage({
        where: {id},
        data: {
            text,
            likes,
            dislikes
        }
    });
}

async function dislikeMessage(parent, args, context, info) {
    const id = args.messageId;
    const messageExists = await context.prisma.message({
        id
    });

    if(!messageExists)
        throw new Error(`Product with id ${args.messageId} does not exist`);

    messageExists.dislikes++;
    const {text, likes, dislikes} = messageExists;
    return context.prisma.updateMessage({
        where: {id},
        data: {
            text,
            likes,
            dislikes
        }
    });
}


module.exports = {
    postMessage,
    postReply,
    likeMessage,
    dislikeMessage
}