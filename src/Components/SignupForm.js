import React from "react";
import { Mutation } from "react-apollo";
import { withApollo } from "react-apollo";
import cookie from "cookie";
// import redirect from "../lib/redirect";
import SIGNUP_MUTATION from "../graphql/mutation/register";

class Signup extends React.Component {

    constructor(props) {
      super()
  
      this.state = {
        email: '',
        password: '',
        name: '',
        emailSubscription: false,
      }
    }
    render(){
        return (
            <Mutation
              mutation={SIGNUP_MUTATION}
              onCompleted={data => {
                // Store the token in cookie
                document.cookie = cookie.serialize("token", data.register.token, {
                  maxAge: 30 * 24 * 60 * 60 // 30 days
                });
                // Force a reload of all the current queries now that the user is
                // logged in
                // client.cache.reset().then(() => {
                //   redirect({}, "/");
                // });
              }}
            >
              {(signup, { loading, error, data }) => (
                <form
                onSubmit={e => {
                    e.preventDefault();
                      signup({ variables: { name: this.state.name, password: this.state.password, email: this.state.email } });
                    
                  }}
                >
                  <input
                    type="text"
                    className="block w-full bg-grey-lighter p-4 rounded mb-4"
                    placeholder="Type your username"
                    onChange={(e) => this.setState({name: e.target.value})
                    }
                  />
                  <input
                    type="text"
                    className="block w-full bg-grey-lighter p-4 rounded mb-4"
                    placeholder="Type your password"
                    onChange={(e) => this.setState({password: e.target.value})
                }
                  />
                  <input
                    type="text"
                    className="block w-full bg-grey-lighter p-4 rounded mb-4"
                    placeholder="Type your email"
                    onChange={(e) => this.setState({email: e.target.value})
                    }
                  />
                  <button
                    className="gradient-primary text-white p-4 rounded font-bold block w-full uppercase text-sm"
                    type="submit"
                  >
                    {!loading && !data && "Let's chat!"}
                    {loading && "Signing up..."}
                    {!loading && data && "Redirecting..."}
                  </button>
                  {error && (
                    <p className="text-red mt-4">Opss! Something went wrong.</p>
                  )}
                </form>
              )}
            </Mutation>
          );
    }
  
};

export default withApollo(Signup);
