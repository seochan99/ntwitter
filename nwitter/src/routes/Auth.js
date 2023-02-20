const Auth = () => {
    return (
        <div>
            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Contunue With Google</button>
                <button>Contunue With Github</button>
            </div>
        </div>
    );
};

export default Auth;
