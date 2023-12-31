sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
        }, 

        createFilterModel: function() {
			
			var oModel = {
				
				userId: [],
				id: [],
				title: [],
				completed: [],

				filterFields:["userId","id","title", "completed"]
			};
			
			return new JSONModel(oModel);
		},

        createTableModel: function() {
			
			var oModel = {
				
			};
			
			return new JSONModel(oModel);
		},
        createDettaglioModel: function() {
			
			var oModel = {
 
			};
							
			return new JSONModel(oModel);
		},

        createTempoModel: function(){
            var oModel = {
                deleteEnable: false,
                enableButton: false
			};
							
			return new JSONModel(oModel);
        },

        
    };
});