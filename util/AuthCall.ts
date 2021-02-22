const AuthCall =  async (getAccessTokenSilently, payload, query) => {
    return await getAccessTokenSilently({
        audience: `https://api.definitelynotdnd.com`,
      })
      .then(authJWT => {
        return query({...payload, authJWT});
      })
}

export default AuthCall;