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
    'sap/ui/model/BindingMode',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, Sorter, Filter, FilterOperator, FilterType, UtilFilter, MessageBox, BindingMode, ChartFormatter, Format) {
        "use strict";
            
            return Controller.extend("project1.controller.Grafico", {

                onInit: function () {
                    let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.getRoute("RouteGrafico").attachPatternMatched(this.onRouteMatched, this);
                        
                },
                
                onRouteMatched: function() {
                    var graficoDataModel = new JSONModel({});
                    let oModel = this.getOwnerComponent().getModel("TableModel").getData();
                        // Counting occurrences of true and false
                    const counts = oModel.reduce((acc, current) => {
                        const status = current.completed ? 'true' : 'false';
                        acc[status] = (acc[status] || 0) + 1;
                        return acc;
                    }, {});
                    
                    // Converting counts object to an array of objects
                    const tableModelData = Object.entries(counts).map(([status, count]) => ({
                        status: status === 'true',
                        count
                    }));

                    graficoDataModel.setData(tableModelData)
                    this.getView().setModel(graficoDataModel, "graficoDataModel");

                },  


            });



    });