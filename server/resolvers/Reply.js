function message(parent, args, context) {
    return context.prisma.message({
        id: parent.id
    }).message();
}

module.exports = {
    message
}