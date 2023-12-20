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

        return Controller.extend("project1.controller.Home", {

            UtilFilter: UtilFilter,
            
                onInit: function () {
                    let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.getRoute("RouteHome").attachPatternMatched(this.onRouteMatched, this);

                }, 		

                onRouteMatched: function(oEvent, targetName) { 
                
                    console.log("Here's johnny!!")

                    this.showBusy()
                    var msg = 'Fetch Effettuata'
                    var oModel = this.getView().getModel('TableModel')
                    // var oFilterModel = this.getView().getModel('filterModel')
                    fetch('https://jsonplaceholder.typicode.com/todos')
                    .then(response => response.json())
                    .then(data => {
                        this.originalData = data;
                        oModel.setData(data);
                                                
                        this.hideBusy();
                    })
                },

                reset: function(){
                    var oTable = this.byId('idProductsTable'),
                    oBinding = oTable.getBinding('items')

                    oBinding.filter()
                },
            

                // onIdSearch: function (oEvent) {
                //     // add filter for search
                //     var aFilters = [];
                //     var sQuery = oEvent.getSource().getValue();
                //     if (sQuery && sQuery.length > 0) {
                //         var filter = new Filter("id", FilterOperator.EQ, parseInt(sQuery, 10));
                        
                //         aFilters.push(filter);
                //     }

                //     // update list binding
                //     var oTable = this.byId("idProductsTable");
                //     var oBinding = oTable.getBinding("items");
                //     oBinding.filter(aFilters, "Application");
                // },

                // onTitleSearch: function (oEvent) {
                //     // add filter for search
                //     var aFilters = [];
                //     var sQuery = oEvent.getSource().getValue();
                //     if (sQuery && sQuery.length > 0) {
                //         var filter = new Filter("title", FilterOperator.Contains, sQuery);
                //         aFilters.push(filter);
                //     }

                //     // update list binding
                //     var oTable = this.byId("idProductsTable");
                //     var oBinding = oTable.getBinding("items");
                //     oBinding.filter(aFilters, "Application");
                // },

                // onUserIdSearch: function (oEvent) {
                //     // add filter for search
                //     var aFilters = [];
                //     var sQuery = oEvent.getSource().getValue();
                //     if (sQuery && sQuery.length > 0) {
                //         var filter = new Filter("userId", FilterOperator.EQ, parseInt(sQuery, 10));
                //         aFilters.push(filter);
                //     }

                //     // update list binding
                //     var oTable = this.byId("idProductsTable");
                //     var oBinding = oTable.getBinding("items");
                //     oBinding.filter(aFilters, "Application");
                // },



                onFilterChange: function(oEvent) {
                    let oParams = oEvent.getParameters();
                },

                onErrorMessageBoxPress: function () {
                    MessageBox.error("Please select a value in the Filter Bar .");
                },

                // onAvvioPress: function(oEvent) {
                //     this.showBusy();

                //     var oMultiComboBox = this.getView().byId("COMPLETED");
                //     var selectedValue = oMultiComboBox.getSelectedKeys()[0];
                 
                //     if (selectedValue !== undefined && selectedValue !== null) {
                //         // Ensure this.originalData is defined before attempting to filter
                //         if (Array.isArray(this.originalData)) {
                //            // Filter the original data based on the selected value
                //            var filteredData = this.originalData.filter(item => String(item.completed) === selectedValue);
                  
                //            // Set the filtered data to the table's model
                //            var oModel = this.getView().getModel('TableModel');
                //            oModel.setData(filteredData);
                //         } else {
                //            console.error('Original data is not properly initialized.');
                //         }
                //      } else {
                //         this.onErrorMessageBoxPress();
                //         console.log("Go to bed johnny, you must be drunk again!!")

                //      }
                 
                //     this.hideBusy();
                // },

                // onAvvioPress: function(oEvent) {
                //     this.showBusy();
                 
                //     let oTable = this.getView().byId("idProductsTable"),
                //         oBinding = oTable.getBinding("items"),
                //         aAllFilter = this.UtilFilter._generateAllFilter(this, Filter);

                //         if(aAllFilter.length === 0){
                //             this.onErrorMessageBoxPress();
                //         } else {
                //             oBinding.filter(aAllFilter);
                //         }

                //     this.hideBusy();
                // },

                onSearchGeneral: function(aFilterValues){
                
                    let aFilters = [],
                        filter;
                        

                    aFilterValues.forEach(ele => {

                        if(typeof ele.value === "string"){
                            ele.value.trim()
                        }
    
                        switch (ele.filterType) {
                            case "id":
                            case "userId":
    
                            if (ele.value && ele.value.length > 0) {
                                filter = new Filter(ele.filterType, FilterOperator.EQ, parseInt(ele.value, 10));
                            }
                                break;
    
                            case "title":
                                filter = new Filter(ele.filterType, FilterOperator.Contains, ele.value);
                                break;
    
                            case "completed":
                                if (ele.value !== undefined && ele.value !== null) {
                                    filter = new Filter(ele.filterType, FilterOperator.EQ, ele.value);
                                }
                                break;
                        
                            default:
                               
                            break;
                        }

                        aFilters.push(filter);
                    });

                    return aFilters

                },

                onRowPress: function (oEvent) {
                    let oObj = oEvent.getParameters().listItem.getBindingContext("TableModel").getObject();
                    let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteDetail", oObj)
                },
       
                onAvvioPress: function(oEvent) {
                    this.showBusy();
                
                    let oTable = this.getView().byId("idProductsTable"),
                        oBinding = oTable.getBinding("items"),
                        aGroupItems = oEvent.getSource().getFilterGroupItems(),
                        aAllFilter = [];
                
                    // Execute the individual search functions and combine their results
                    
                    aGroupItems.forEach(ele => {
                        if (ele.mProperties.name !== 'completed') {
                        aAllFilter.push(new Object({filterType: ele.mProperties.name, value: ele.getControl().getValue()}))

                        } else {
                            ele.getControl().getSelectedItems().forEach(element => {
                                aAllFilter.push(new Object({filterType: "completed", value: element.mProperties.key === "true"}))
                            });
                        }
                    });
                    
                    aAllFilter = this.onSearchGeneral(aAllFilter);

                    if (aAllFilter.length === 0) {
                        this.onErrorMessageBoxPress();
                    } else {
                        oBinding.filter(aAllFilter);
                    }
                
                    this.hideBusy();
                },

                // onSelectionChange: function(oEvent) {
                //     let oSource = oEvent.getSource(),
                //         sId = oSource.data("fieldName"),
                //         aFilter = [],
                //         oChangedItems = oSource.getSelectedItems(),
                //         oFilterModel = this.getView().getModel("barFilters");
                //         oFilterModel.setProperty("/" + sId, aFilter);

                //         oChangedItems.forEach(ele => {
                //             aFilter.push(ele.mProperties.key === "true");
                //         });

                //         // Set the property in the model with the updated array
                //         oFilterModel.setProperty("/" + sId, aFilter);
                        
                // },

                showBusy: function(){
                    if (!this._busyDialog) {
                        this._busyDialog = new sap.m.BusyDialog();
                    }
                    this._busyDialog.open()
                },
                hideBusy: function(){
                    this._busyDialog.close();
                },

                restoreTable: function () {
                    if (Array.isArray(this.originalData)) {
                        // Assuming 'TableModel' is the model bound to your table
                        var oModel = this.getView().getModel('TableModel');
                        
                        // Set the original data back to the model
                        oModel.setData(this.originalData);
                    } else {
                        console.error('Original data is not properly initialized.');
                    }
                },

        });
    });
