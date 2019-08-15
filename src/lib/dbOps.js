import hpError from "lib/hpError";
import $ from "jquery";
import store from "lib/store";
import getErrorText from "lib/getErrorText";

export default class dbOps {
  contentType = "application/json";
  dataTypeText = "text";
  typePost = "POST";
  errorMsgAdmin = " Please report to your admin if this continues.";
  state = store.getState();

  async postMessage(url, data, errorMsg) {
    let result;
    try {
      result = await $.ajax({
        type: this.typePost,
        url: this.state.URL + url,
        contentType: this.contentType,
        dataType: this.dataTypeText,
        data: JSON.stringify(data)
      });
      return result;
    } catch (err) {
      alert("***Reason:*** " + getErrorText(err.responseText) + "   Message: Error at " + url + ":  ***Server returned:*** " + result);
      throw new hpError("db", errorMsg);
    }
  }

  async getFields(data) {
    return await this.postMessage("/forms/getfields", data, "Could not get fields from the database. " + this.errorMsgAdmin);
  }

  async getSections(data) {
    return await this.postMessage("/forms/getsections", data, "Could not get sections from the database. " + this.errorMsgAdmin);
  }

  async getComm(data) {
    return await this.postMessage("/forms/getcomm", data, "Could not retrieve chat messages from the database. " + this.errorMsgAdmin);
  }

  async addComm(data) {
    return await this.postMessage("/forms/addcomm", data, "Could not add chat message to the database. " + this.errorMsgAdmin);
  }

  async addFieldData(data) {
    return await this.postMessage("/forms/addfielddata", data, "Could not add chat field data to the database. " + this.errorMsgAdmin);
  }

  async addEntity(data) {
    return await this.postMessage("/forms/addentity", data, "Could not add the entity to the database. " + this.errorMsgAdmin);
  }

  async addFormTemplate(data) {
    return await this.postMessage("/forms/addformtemplate", data, "Could not add the template to the database. " + this.errorMsgAdmin);
  }
}
