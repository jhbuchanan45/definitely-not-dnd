export default interface Campaign {
    _id: String,
    name: String,
    image: String,
    ownerId: String,
    players: String[],
    lastMap: String,
    maps: String[],
    tokens: String[],
    __v: Number,
}