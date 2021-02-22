import API from '../API';

const fetchUser = async (arg: any) => {
    const response: any = await API.get('/user', {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    console.log(response);
    const { __v, _id, ...details } = response.data

    return details;
}

export default fetchUser;