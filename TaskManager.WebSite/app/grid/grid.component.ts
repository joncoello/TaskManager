import { Component } from '@angular/core';

import { GridOptions, ColDef, ColGroupDef } from 'ag-grid';

import { GridService } from './grid.service';
import RefData from './ref-data';

@Component({
    selector: 'grid',
    templateUrl: './app/grid/grid.component.html'
})
export class GridComponent {
    public pageTitle: string = 'Transactions';

    private rowData: any[];
    private columnDefs: (ColDef | ColGroupDef)[];
    private gridOptions: GridOptions;

    constructor(private gridService: GridService) {

        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.createRowData();
        this.createColumnDefs();

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
                headerName: 'Name', field: 'name',
                width: 150, pinned: true, editable: true
            },
            {
                headerName: 'DOB', field: 'dob', width: 120, pinned: true, cellRenderer: (params: any) => {
                    return this.pad(params.value.getDate(), 2) + '/' +
                        this.pad(params.value.getMonth() + 1, 2) + '/' +
                        params.value.getFullYear();
                }, filter: 'date', columnGroupShow: 'open'
            },
            {
                headerName: 'Country', field: 'country', width: 150, filter: 'text',
                editable: true,
                cellEditor: 'select',
                cellEditorParams: {
                    values: ['English', 'Spanish', 'French', 'Portuguese', '(other)']
                }
            },
            { headerName: 'Mobile', field: 'mobile', width: 150, filter: 'text' },
            { headerName: 'Land-line', field: 'landline', width: 150, filter: 'text' },
            { headerName: 'Address', field: 'address', width: 500, filter: 'text' }
        ];
    }

    private pad(num: any, totalStringSize: any) {
        let asString = num + '';
        while (asString.length < totalStringSize) {
            asString = '0' + asString;
        }
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