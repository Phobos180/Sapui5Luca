sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "project1/utils/UtilFilter",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, Sorter, Filter, FilterOperator, FilterType, UtilFilter, MessageBox) {
        "use strict";

        return Controller.extend("project1.controller.Detail", {

            UtilFilter: UtilFilter,
            
                onInit: function () {
                    let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.getRoute("RouteDetail").attachPatternMatched(this.onRouteMatched, this);

                },

                onRouteMatched: function(oEvent, targetName) { 

                    let oArguments = oEvent.getParameters().arguments                  
                    let oModel = this.getView().getModel('DettaglioModel')
                    oModel.setProperty('/Dettaglio', oArguments)


                    console.log("Here's johnny!!")

                },

                

        });
    });
