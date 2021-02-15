export default interface Token {
    _id: String,
    name: String,
    image: String,
    ownerId: String,
    readIds: String[],
    writeIds: String[],
    players: [{
        _id: String,
        name: String,
        image: String,
        stats: {level: Number},
        race: String
    }],
    lastMap: {
        _id: String,
        name: String,
        image: String
    },
}