import Api from '../api/api';

let DesignActionCreators = {
  saveDesign(design, userID) {
    return Api.design.saveDesign(design, userID);
  }
};

export default DesignActionCreators;