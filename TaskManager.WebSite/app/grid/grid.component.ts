import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GridOptions } from "ag-grid";

import { GridService } from './grid.service';
import { RedComponentComponent } from './red-component.component';
import RefData from './ref-data';

@Component({
    selector: 'grid',
    templateUrl: './app/grid/grid.component.html'
})
export class GridComponent {
    pageTitle: string = 'Transactions';

    private rowData: any[];
    private columnDefs: any[];
    private gridOptions: GridOptions;

    constructor(private gridService: GridService) {
        //this.gridOptions = {};
        //this.gridOptions.columnDefs = [
        //    {
        //        headerName: "ID",
        //        field: "id",
        //        width: 100
        //    },
        //    {
        //        headerName: "Value",
        //        field: "value",
        //        //cellRendererFramework: RedComponentComponent,
        //        width: 100
        //    },

        //];
        //this.gridOptions.rowData = [
        //    { id: 5, value: 10 },
        //    { id: 10, value: 15 },
        //    { id: 15, value: 20 }
        //]

        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.createRowData();
        this.createColumnDefs();
        //this.showGrid = true;
        //this.gridOptions.dateComponentFramework = DateComponent;
        //this.gridOptions.defaultColDef = {
        //    headerComponentFramework: <{ new (): HeaderComponent }>HeaderComponent,
        //    headerComponentParams: {
        //        menuIcon: 'fa-bars'
        //    }
        //}

    }

    private createRowData() {
        var rowData: any[] = [];

        for (var i = 0; i < 200; i++) {
            var countryData = RefData.countries[i % RefData.countries.length];
            rowData.push({
                name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
                skills: {
                    android: Math.random() < 0.4,
                    html5: Math.random() < 0.4,
                    mac: Math.random() < 0.4,
                    windows: Math.random() < 0.4,
                    css: Math.random() < 0.4
                },
                dob: RefData.DOBs[i % RefData.DOBs.length],
                address: RefData.addresses[i % RefData.addresses.length],
                years: Math.round(Math.random() * 100),
                proficiency: Math.round(Math.random() * 100),
                country: countryData.country,
                continent: countryData.continent,
                language: countryData.language,
                mobile: this.createRandomPhoneNumber(),
                landline: this.createRandomPhoneNumber()
            });
        }

        this.rowData = rowData;
    }
    
    private createColumnDefs() {
        this.columnDefs = [
            {
                headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                suppressMenu: true, pinned: true
            },
            {
                headerName: 'Employee',
                //headerGroupComponentFramework: HeaderGroupComponent,
                children: [
                    {
                        headerName: "Name", field: "name",
                        width: 150, pinned: true
                    },
                    //{
                    //    headerName: "Country", field: "country", width: 150,
                    //    cellRenderer: countryCellRenderer, pinned: true,
                    //    filterParams: { cellRenderer: countryCellRenderer, cellHeight: 20 }, columnGroupShow: 'open'
                    //},
                    {
                        headerName: "DOB", field: "dob", width: 120, pinned: true, cellRenderer: (params: any) => {
                            return this.pad(params.value.getDate(), 2) + '/' +
                                this.pad(params.value.getMonth() + 1, 2) + '/' +
                                params.value.getFullYear();
                        }, filter: 'date', columnGroupShow: 'open'
                    }
                ]
            },
            //{
            //    headerName: 'IT Skills',
            //    children: [
            //        {
            //            headerName: "Skills",
            //            width: 125,
            //            suppressSorting: true,
            //            cellRenderer: skillsCellRenderer,
            //            filter: SkillFilter
            //        },
            //        {
            //            headerName: "Proficiency",
            //            field: "proficiency",
            //            width: 120,
            //            cellRenderer: percentCellRenderer,
            //            filter: ProficiencyFilter
            //        },
            //    ]
            //},
            {
                headerName: 'Contact',
                children: [
                    { headerName: "Mobile", field: "mobile", width: 150, filter: 'text' },
                    { headerName: "Land-line", field: "landline", width: 150, filter: 'text' },
                    { headerName: "Address", field: "address", width: 500, filter: 'text' }
                ]
            }
        ];
    }

    //Utility function used to pad the date formatting.
    private pad(num: any, totalStringSize: any) {
        let asString = num + "";
        while (asString.length < totalStringSize) asString = "0" + asString;
        return asString;
    }

    private createRandomPhoneNumber() {
        var result = '+';
        for (var i = 0; i < 12; i++) {
            result += Math.round(Math.random() * 10);
            if (i === 2 || i === 5 || i === 8) {
                result += ' ';
            }
        }
        return result;
    }

}