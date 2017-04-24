export class LoginModel {
    public userName: string;
    public password: string;
    public grant_type: string;
}

export class TokenModel {
    public access_token: string;
    public token_type: string;
    public expires_in: string;
    public userName: string;
}

/*

"{"access_token":"6i...",
"token_type":"bearer",
"expires_in":1209599,
"userName":"bob@mail.com",
".issued":"Mon, 24 Apr 2017 05:05:09 GMT",
".expires":"Mon, 08 May 2017 05:05:09 GMT"}"

*/