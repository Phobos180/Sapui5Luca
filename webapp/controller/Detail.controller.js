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


                    console.log("Kenny Always dies")

                },

                onButtonClick: function(){
                
                    let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteHome");
                },

                onOpenDialog: function() {
                    this.byId("modifyParametersDialog").open();
                },
                    // issue with how you're getting the model or with the model itself
                onApplyChanges: function() {


                    var oModello = this.getView().getModel("TableModel").oData;



      //          var oBindingContext = this.getView().getBindingContext("TableModel"); 
     //           var oObject = oBindingContext.getObject(); 
//                oModel.setProperty(oBindingContext.getPath(), oObject);     


                    let oModel = this.getView().getModel('DettaglioModel');
                    let oDettaglio = oModel.oData.Dettaglio;
                    let indexTarget = oModello.findIndex(element => element.id === parseInt(oDettaglio.id));



                    // Get user input
                    let newPropertyValue1 = this.byId("id").getValue();
                    let newPropertyValue2 = this.byId("userId").getValue();
                    let newPropertyValue3 = this.byId("title").getValue();
                    let newPropertyValue4 = this.byId("completed").getValue();
              

                    // Modify properties with user input
                        oDettaglio.id = newPropertyValue1;
                        oDettaglio.userId = newPropertyValue2;
                        oDettaglio.title = newPropertyValue3;
                        oDettaglio.completed = newPropertyValue4;
                    

                    // oModello[indexTarget] = oDettaglio
                    this.getView().getModel('TableModel').setProperty('/' + [indexTarget], oDettaglio)


                    // Submit changes to the backend // This gives error of no function found/is not function
                    // could create a function onSubmitChanges() that overwrite content in the object and diplay it
                    // 
                    // this function instead should run IF I had a database where data is stored and can be modified
                    // oModel.submitChanges({
                    //   success: function(oData, oResponse) {
                    //     console.log("Changes submitted successfully");
                    //   },
                    //   error: function(oError) {
                    //     console.error(oError);
                    //   }
                    // });
              
                    // Close the dialog after applying changes
                    this.byId("modifyParametersDialog").close();
                    this.onButtonClick();
                  },

                    ////////////////////////////////////////////////////////
                //Questa funzione deve permettere di modificare i parametri e rinominarli, salvando le modifiche
                onClickChange: function(){
                    //Localizzare i parametri
                    let oModel = this.getView().getModel('DettaglioModel').oData.Dettaglio
                    // let oSelect = oModel.getProperty("/Dettaglio");
                    console.log(oModel);
                    // oModifySelect = 
                },

                

        });
    });
