export default async (getAccessTokenSilently, payload, dispatch, action) => {
    await getAccessTokenSilently({
        audience: `https://api.definitelynotdnd.com`,
      })
      .then(authJWT => {
        return dispatch(action({ ...payload, authJWT }))
      })
      .catch(err => {
        console.log(err);
      })
}