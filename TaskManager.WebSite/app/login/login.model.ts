export class LoginModel {
    public userName: string;
    public password: string;
    public grant_type: string;
}

export class TokenModel {
    access_token: string;
    token_type: string;
    expires_in: string;
    userName: string;
}

/*

"{"access_token":"6ike5D2VV7Xioe2uzqTApQrm_1kJwNtaoDN20rLU0SPvjitQ-jSPy9tyTg0rhxjnRzVmt-9tmVnnXDNcv5aHxrr_Bnu0v6Csz8Uyd473n2Pa-Aq8Epv7-2yMqoUsRs8i0hOSa8QitdLe8j1d_6ufWGMs48jRepeKwJfVz1mzv_7CFcoAtzjNve9dv0KM9w7LNFV_h0Q2HH_1KI63kVrhnIcawXMtBaMLdxI3y24OTn3NO53CPFHFifTdx1YQCiN65PQR1DjIYC4e7JWhNoyqVDLTZ30wO1J6ntuJH1FQlPyLkqx3hNJBR0P5lLOavJYu7sg2Ab7x_TdNlVaIY2mP_8Or-JSD9AI3O-EZDY6OpSq65usUC69n4bIfMMu53ajgcb8vVZ6Xei-ABbZgAEHTMh1POwMfP_g-A4L2kd9123ZNi-1lAjTcqhReNEfDi4-BWYGCTllbnHEuXzP2JYbDhVa4wxj7AGOs7pq7KFIPFTo",
"token_type":"bearer",
"expires_in":1209599,
"userName":"bob@mail.com",
".issued":"Mon, 24 Apr 2017 05:05:09 GMT",
".expires":"Mon, 08 May 2017 05:05:09 GMT"}"

*/