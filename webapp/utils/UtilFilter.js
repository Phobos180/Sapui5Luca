sap.ui.define([], function () {
    "use strict";
    return {
       
        _generateAllFilter: function(controller,Filter){
            var aFiltersName = controller.getView().getModel("barFilters").getProperty("/filterFields"),
                allFilters = [];
                for(var i = 0; i < aFiltersName.length; i++){
                	
                	var singleFilter = this._generateORSingleFilter(controller, aFiltersName[i], Filter);
                         if (singleFilter.length > 0){
                             allFilters.push(singleFilter[0]);
                         }
                	
                }
                if(allFilters.length > 0){
                    return new Filter(allFilters,true);
                }
                else{
                    return [];
                }
        },
       
        
        _generateORSingleFilter: function(controller, sFieldName, Filter)   {
            var aSingleFilters = controller.getView().getModel("barFilters").getProperty("/" + sFieldName),
                aFilters = [],
                aOrFilter = [];
                for(var i = 0; i < aSingleFilters.length; i++){
                    aFilters.push(new Filter(
                                    sFieldName,
                                    sap.ui.model.FilterOperator.EQ,
                                    aSingleFilters[i]
                                    ));
                }
                aOrFilter = aFilters.length > 0 ? [new Filter(aFilters,false)] : [];
                
            return aOrFilter;
        }
        
        
    };
});