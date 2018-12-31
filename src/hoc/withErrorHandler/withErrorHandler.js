import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal'

const WithErrorHandler = (WrappedComponenet, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount(){
      // interceptors is the listen for axios
      // example : axios.interceptors.response.use will run on every response getting back
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req;
      })
      this.resInterceptor = axios.interceptors.response.use(res => res , error => {
        this.setState({ error })
      })
    }

    // remove interceptor to prevent memeory leak
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmHandler = () => {
      this.setState({error: null})
    }
    render() {
      return (
        <Aux>
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponenet {...this.props} />
        </Aux>
      )
    }
  }
}

export default WithErrorHandler;