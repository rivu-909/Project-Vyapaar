interface User {
    token: string | null;
    isLoggingIn: boolean;
    isLoggedIn: boolean;
    isSigningUp: boolean;
    fetchingToken: boolean;
}

export default User;
