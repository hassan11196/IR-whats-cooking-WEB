import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/WhatsCooking/Home';


function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {

    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
