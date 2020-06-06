import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/KMean/Home';
import { updateDocs, clearDocs } from '../actions/docPostingList';

function mapStateToProps(state) {
  return {
    docs: state.docsPostingList
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      updateDocs,
      clearDocs
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
